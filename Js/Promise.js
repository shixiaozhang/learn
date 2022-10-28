class _Promise {
  constructor(fn) {
    // resolve时的回调函数列表
    this.resolveTask = [];
    // reject时的回调函数列表
    this.rejectTask = [];
    // state记录当前状态,共有pending、fulfilled、rejected 3种状态
    this.state = "pending";
    let resolve = (value) => {
      // state状态只能改变一次，resolve和reject只会触发一种
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.data = value;
      // 模拟异步，保证resolveTask事件先注册成功，要考虑在Promise里面写同步代码的情况
      setTimeout(() => {
        this.resolveTask.forEach((cb) => cb(value));
      });
    };
    let reject = (err) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.error = err;
      // 保证rejectTask事件注册成功
      setTimeout(() => {
        this.rejectTask.forEach((cb) => cb(err));
      });
    };

    // 关键代码，执行fn函数
    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(resolveCallback, rejectCallback) {
    // 解决链式调用的情况，继续返回Promise
    return new _Promise((resolve, reject) => {
      // 将then传入的回调函数，注册到resolveTask中
      this.resolveTask.push(() => {
        // 重点：判断resolveCallback事件的返回值
        // 假如用户注册的resolveCallback事件又返回一个Promise，将resolve和reject传进去，这样就实现控制了链式调用的顺序
        const res = resolveCallback(this.data);
        // 兼容原生 Promise
        if (res instanceof _Promise || res instanceof Promise) {
          res.then(resolve, reject);
        } else {
          // 假如返回值为普通值，resolve传递出去
          resolve(res);
        }
      });

      this.rejectTask.push(() => {
        // 同理：判断rejectCallback事件的返回值
        // 假如返回值为普通值，reject传递出去
        const res = rejectCallback(this.error);
        if (res instanceof _Promise) {
          res.then(resolve, reject);
        } else {
          reject(res);
        }
      });
    });
  }

  // race静态方法，返回promises列表中第一个执行完的结果
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        // Promise.resolve包一下，防止promises[i]不是Promise类型
        Promise.resolve(promises[i])
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  // all静态方法， 返回promises列表中全部执行完的结果
  static all(promises) {
    let result = [];
    let index = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i])
          .then((res) => {
            // 输出结果的顺序和promises的顺序一致
            result[i] = res;
            index++;
            if (index === promises.length) {
              resolve(result);
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}
// 测试
new _Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
})
  .then((res) => {
    console.log("1", res);
    return new _Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 1000);
    });
  })
  .then((data) => {
    console.log("2", data);
  })
  .then(() => {
    return new _Promise((resolve) => {
      setTimeout(() => {
        resolve(3);
      }, 1000);
    });
  })
  .then((data) => {
    console.log("3", data);
  });
