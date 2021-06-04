/*
 * @Author: your name
 * @Date: 2021-01-13 10:53:28
 * @LastEditTime: 2021-01-18 17:14:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Ts\test.ts
 */
function rev<T>(item: T[]): T[] {

    return item

}

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
}
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom: Cat = animal as Cat;


function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']





let jiantou = (val: number) => val.toString()// ==== var jiantou = function (val) { return val.toString(); };

const simple: (foo: number) => string = foo => foo.toString();//==== var simple = function (foo) { return foo.toString(); };

type sm = (foo: number) => string;

const simple2: sm = foo => foo.toString();



console.log(jiantou(10));

class Queue<T>{

    private data: T[] = [];
    push = (item: T) => this.data.push(item);
    pop = () => this.data.shift();

    public get datas(): any {
        return this.data
    }

}

const queue = new Queue();
//   const queue = new Queue<number>();

queue.push(0);
queue.push('1'); // Oops，一个错误

// 一个使用者，走入了误区
//   console.log(queue.pop().toPrecision(1));
//   console.log(queue.pop().toPrecision(1)); // RUNTIME ERROR
console.log(queue.datas);
type Adder = (a: number, b: number) => number;

function iTakeAnAdder(adder: Adder) {
    return adder(1, 2);
}

let iTakeAnAdders: Adder = (a, b) => {
    //   return adder(1, 2);
    return a + b
}

interface Point2D {
    x: number;
    y: number;
}

interface Point3D {
    x: number;
    y: number;
    z: number;
}

const point2D: Point2D = { x: 0, y: 10 };
const point3D: Point3D = { x: 0, y: 10, z: 20 };
function iTakePoint2D(point: Point2D) {
    /* do something */
}
function iTakePointD(x: number,y: number,z: number,) {
    /* do something */
}


iTakePoint2D(point2D); // ok, 完全匹配
iTakePoint2D(point3D); // 额外的信息，没关系


// iTakePointD(0, 10 ); // err 缺少信息

iTakePointD( 0,  10, 20  ); // ok, 完全匹配




enum Status {
    Ready,
    Waiting
  }
  
  let statuss = Status.Ready;
  let num = 1;
  
  statuss = num;
  console.log(statuss);
  console.log(Status.Waiting);
  console.log(Status);
  num = statuss;



//   class Point {
//     x: number = 2
//     y: number = 3
//   }
//   interface IShape {
//     area(): number
//   }
//   type Perimeter = {
//     perimeter(): number
//   }
//   type RectangleShape = (IShape | Perimeter) & Point
  
//   class Rectangle implements RectangleShape {
//     // 类只能实现具有静态已知成员的对象类型或对象类型的交集。
//     x = 2
//     y = 3
//     area() {
//       return this.x + this.y
//     }
//   }
//   interface ShapeOrPerimeter extends RectangleShape {}
//   // 接口只能扩展使用静态已知成员的对象类型或对象类型的交集
