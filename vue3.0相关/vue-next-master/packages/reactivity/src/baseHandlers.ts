import {
  reactive,
  readonly,
  toRaw,
  ReactiveFlags,
  Target,
  readonlyMap,
  reactiveMap
} from './reactive'
import { TrackOpTypes, TriggerOpTypes } from './operations'
import {
  track,
  trigger,
  ITERATE_KEY,
  pauseTracking,
  resetTracking
} from './effect'
import {
  isObject,
  hasOwn,
  isSymbol,
  hasChanged,
  isArray,
  isIntegerKey,
  extend
} from '@vue/shared'
import { isRef } from './ref'


/**
 * 在 basehandlers 中包含了四种 handler:
    mutableHandlers 可变处理;
    readonlyHandlers 只读处理;
    shallowReactiveHandlers 浅观察处理（只观察目标对象的第一层属性）;
    shallowReadonlyHandlers 浅观察 && 只读处理;

    其中 readonlyHandlers shallowReactiveHandlers shallowReadonlyHandlers 
    都是 mutableHandlers 的变形版本，这里我们主要针对 mutableHandlers 展开
 * 
 */


const builtInSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map(key => (Symbol as any)[key])
    .filter(isSymbol)
)

const get = /*#__PURE__*/ createGetter()
const shallowGet = /*#__PURE__*/ createGetter(false, true)
const readonlyGet = /*#__PURE__*/ createGetter(true)
const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true)

const arrayInstrumentations: Record<string, Function> = {}
  // instrument identity-sensitive Array methods to account for possible reactive
  // values
  ; (['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
    const method = Array.prototype[key] as any
    arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      const arr = toRaw(this)
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, TrackOpTypes.GET, i + '')
      }
      // we run the method using the original args first (which may be reactive)
      const res = method.apply(arr, args)
      if (res === -1 || res === false) {
        // if that didn't work, run it again using raw values.
        return method.apply(arr, args.map(toRaw))
      } else {
        return res
      }
    }
  })
  // instrument length-altering mutation methods to avoid length being tracked
  // which leads to infinite loops in some cases (#2137)
  ; (['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach(key => {
    const method = Array.prototype[key] as any
    arrayInstrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      pauseTracking()
      const res = method.apply(this, args)
      resetTracking()
      return res
    }
  })

  /**
 * @description: 用于拦截对象的读取属性操作
 * @param {isReadonly} 是否只读 
 * @param {shallow} 是否浅观察  
 */

function createGetter(isReadonly = false, shallow = false) {

 /**
   * @description: 
   * @param {target} 目标对象
   * @param {key} 需要获取的值的键值
   * @param {receiver} 如果遇到 setter，receiver则为setter调用时的this值 
   */

  return function get(target: Target, key: string | symbol, receiver: object) {
 //  ReactiveFlags 是在reactive中声明的枚举值，如果key是枚举值则直接返回对应的布尔值
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (
      key === ReactiveFlags.RAW &&
      receiver === (isReadonly ? readonlyMap : reactiveMap).get(target)
    ) {// 如果key是raw 则直接返回目标对象
      return target
    }

    const targetIsArray = isArray(target)
 // 如果目标对象是数组并且 key 属于三个方法之一
// ['includes', 'indexOf', 'lastIndexOf']，即触发了这三个操作之一
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)

    if (
      isSymbol(key)
        ? builtInSymbols.has(key as symbol)
        : key === `__proto__` || key === `__v_isRef`
    ) {
      return res
    }
    // 只读则调用 track Get
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }
// 如果是浅观察返回结果
    if (shallow) {
      return res
    }
// 如果get的结果是ref
    if (isRef(res)) {
      //  ref unwrapping-不适用于Array +整数键 // 
      // ref unwrapping - does not apply for Array + integer key.

      //目标对象为是数组 而 key不是整数返回res。value   
      // 目标对象为 不是数组 返回res。value   
      //目标对象为 是数组 而且 key是整数,返回res
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key)
      return shouldUnwrap ? res.value : res
    }

    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      //将返回值也转换为代理。 我们进行isObject检查
       //这里是为了避免无效值警告。 还需要对懒惰进行只读访问
       //并在此处进行反应以避免循环依赖。
        // 由于 proxy 只能代理一层，所以 target[key] 的值如果是对象，就继续对其进行代理
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}

const set = /*#__PURE__*/ createSetter()
const shallowSet = /*#__PURE__*/ createSetter(true)



/**
 * @description: 拦截对象的设置属性操作 
 * @param {shallow} 是否是浅观察 
 */

function createSetter(shallow = false) {
   /**
   * @description: 
   * @param {target} 目标对象
   * @param {key} 设置的属性的名称
   * @param {value} 要改变的属性值 
   * @param {receiver} 如果遇到 setter，receiver则为setter调用时的this值 
   */
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    const oldValue = (target as any)[key]


    // 如果模式不是浅观察
    if (!shallow) {
      //获取原始数据
      value = toRaw(value)
      // 并且目标对象不是数组，旧值是ref，新值不是ref，则直接赋值，
      // 注意这里提到ref，这里不展开讲，后面详细讲
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value
        return true
      }
    } else {
      // in shallow mode, objects are set as-is regardless of reactive or not
    }
  // isIntegerKey() 是否整数
  // 检测key是否存在于target中
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    // 赋值
    const result = Reflect.set(target, key, value, receiver)
    // 如果目标是原始原型链中的某个对象，请勿触发
    // don't trigger if target is something up in the prototype chain of original
    if (target === toRaw(receiver)) {
      if (!hadKey) {
         // 如是不存在则trigger ADD
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
          // 存在则trigger SET
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}
/**
 * @description: 用于拦截对象的删除属性操作 
 * @param {target} 目标对象 
 * @param {key} 键值 
 * @return {Boolean}
 */
function deleteProperty(target: object, key: string | symbol): boolean {
  // hasOwn 的实现放下方了，检查一个对象是否包含当前key
  const hadKey = hasOwn(target, key)
  const oldValue = (target as any)[key]
  // Reflect 作用在于完成目标对象的默认，这里即指删除
  const result = Reflect.deleteProperty(target, key)
  // 如果该值被成功删除则调用 trigger, 
  // trigger 为 effect 里的方法，effect 为 reactive 的核心, 后面会讲到
  if (result && hadKey) {
    trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
  }
  return result
}


/**
 * @description: 检查一个对象是否拥有某个属性 
 * @param {target} 目标对象 
 * @param {key} 键值 
 * @return {Boolean}
 */

function has(target: object, key: string | symbol): boolean {
  const result = Reflect.has(target, key)
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
     // track 也为 effect 里的方法，effect 为 reactive 的核心, 后面会讲到
    track(target, TrackOpTypes.HAS, key)
  }
  return result
}

// 返回一个由目标对象自身的属性键组成的数组
function ownKeys(target: object): (string | number | symbol)[] {
  track(target, TrackOpTypes.ITERATE, isArray(target) ? 'length' : ITERATE_KEY)
  return Reflect.ownKeys(target)
}

export const mutableHandlers: ProxyHandler<object> = {
  get, // 用于拦截对象的读取属性操作
  set, // 用于拦截对象的设置属性操作
  deleteProperty,// 用于拦截对象的删除属性操作
  has,  // 检查一个对象是否拥有某个属性
  ownKeys  // 针对 getOwnPropertyNames,  getOwnPropertySymbols, keys 的代理方法
}

export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set(target, key) {
    if (__DEV__) {
      console.warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      )
    }
    return true
  },
  deleteProperty(target, key) {
    if (__DEV__) {
      console.warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      )
    }
    return true
  }
}

export const shallowReactiveHandlers: ProxyHandler<object> = extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
)

// Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.
export const shallowReadonlyHandlers: ProxyHandler<object> = extend(
  {},
  readonlyHandlers,
  {
    get: shallowReadonlyGet
  }
)
