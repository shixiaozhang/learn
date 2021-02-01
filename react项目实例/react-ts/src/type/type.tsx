/*
 * @Author: your name
 * @Date: 2021-01-28 10:29:27
 * @LastEditTime: 2021-02-01 17:55:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react项目实例\react-ts\src\type\type.tsx
 */
import { type } from 'os';
import React, { useRef } from 'react'
// 基础类型
export type BasicProps = {
    message: string;
    count: number;
    disabled: boolean;
    // 数组类型
    names: string[];
    // 联合类型字面量
    status: "waiting" | "success"
};

//   对象类型
export type ObjectOrArryProps = {
    /** ? 如果你不需要用到具体的属性 可以这样模糊规定是个对象 ❌ 不推荐 */
    obj: object;
    obj2: {};
    /** 拥有具体属性的对象类型 ✅ 推荐 */
    obj3: {
        id: string;
        title: string;
    }
    /** 对象数组 😁 常用 */

    objArr: {
        id: string;
        title: string;

    }[];
    objArr2: BasicProps[];

    /** key 可以为任意 string，值限制为 MyTypeHere 类型 */
    dict1: {
        [key: string]: BasicProps;
    }

    // 基本上和 dict1 相同，用了 TS 内置的 Record 类型。
    dict2: Record<string, BasicProps>
}

// 函数类型

export type FunctionProps = {
    /** 任意的函数类型 ❌ 不推荐 不能规定参数以及返回值类型 */
    onSomeThing: Function;
    /** 没有参数的函数 不需要返回值 😁 常用 */
    onClick: () => void;
    /** 带函数的参数 😁 非常常用 */
    onChange: (id: number) => void;
    /** 另一种函数语法 参数是 React 的按钮事件 😁 非常常用 */
    onClick2(event: React.MouseEvent<HTMLButtonElement>): void;

    /** 可选参数类型 😁 非常常用 */
    optional?: BasicProps;
}
// React 相关类型

export declare interface AppProps {
    children1: JSX.Element;// ❌ 不推荐 没有考虑数组
    children2: JSX.Element | JSX.Element[]; // ❌ 不推荐 没有考虑字符串 children
    children3: React.ReactChild[]; // 稍微好点 但是没考虑 null

    children4: React.ReactNode; // ? ✅ 包含所有 children 情况

    functionChildren: (name: string) => React.ReactNode;// ? ✅ 返回 React 节点的函数
    style?: React.CSSProperties; //? ✅ 推荐 在内联 style 时使用
    // ?✅ 推荐原生 button 标签自带的所有 props 类型
    // ? 也可以在泛型的位置传入组件 提取组件的 Props 类型

    props: React.ComponentProps<"button">;

    //? ✅ 推荐 利用上一步的做法 再进一步的提取出原生的 onClick 函数类型 
    //? 此时函数的第一个参数会自动推断为 React 的点击事件类型

    onClickButton: React.ComponentProps<"button">["onClick"]





}
// 函数式组件

// 最简单的：

export interface AppProps2 { message: string }


const App = ({ message }: AppProps2) => <div>{message}</div>;

// 包含 children 的：


// ? 利用 React.FC 内置类型的话，不光会包含你定义的 AppProps 还会自动加上一个 children 类型，以及其他组件上会出现的类型：

// ? 等同于
/*
AppProps & { 
    children: React.ReactNode 
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

*/

const App2: React.FC<AppProps2> = ({ message, children }) => {
    return (
        <>
            {children}
            <div>{message}</div>
        </>
    )
}


//? Hooks


// ?useState
// ? 如果你的默认值已经可以说明类型，那么不用手动声明类型，交给 TS 自动推断即可：

const [val, toggle] = React.useState(false)
toggle(false)
toggle(true)

// ? 如果初始值是 null 或 undefined，那就要通过泛型手动传入你期望的类型。
type IUser = {
    name: string
}

const [user, setUser] = React.useState<IUser | null>(null)
const newUser = {
    name: 'zhansan'
}
setUser(newUser);
// ?这样也可以保证在你直接访问 user 上的属性时，提示你它有可能是 null。


//? 通过 optional-chaining 语法（TS 3.7 以上支持），可以避免这个错误。

// ? 就是如果直接访问 user。name 因为他有个null 的可能类型；所以会报错
// ? 可以通过 user？。name 来获取name，有就存在，没有就null
const name = user?.name


// ? useReducer
// 需要用 Discriminated Unions 来标注 Action 的类型。

const intitialState = { count: 0 }
type ACTIONTYPE =
    | { type: "increment"; payload: number }
    | { type: "decrement"; payload: string };
function reducer(state: typeof intitialState, action: ACTIONTYPE) {
    switch (action.type) {
        case "increment":
            return { count: state.count + action.payload };
        case "decrement":
            return { count: state.count - Number(action.payload) };
        default:
            throw new Error("");


    }
}

function Counter() {
    const [state, dispatch] = React.useReducer(reducer, intitialState);
    return (
        <>
            Count:{state.count}
            <button onClick={() => dispatch({ type: 'decrement', payload: '5' })}>
                -
        </button>
            <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>
                +
        </button>
        </>
    )
}
// ?「Discriminated Unions」一般是一个联合类型，其中每一个类型都需要通过类似 type 这种特定的字段来区分，当你传入特定的 type 时，剩下的类型 payload 就会自动匹配推断。
// ?这样：

// ?当你写入的 type 匹配到 decrement 的时候，TS 会自动推断出相应的 payload 应该是 string 类型。
// ?当你写入的 type 匹配到 increment 的时候，则 payload 应该是 number 类型。

// ?这样在你 dispatch 的时候，输入对应的 type，就自动提示你剩余的参数类型啦。



// ?    useEffect

// ?这里主要需要注意的是，useEffect 传入的函数，它的返回值要么是一个方法（清理函数），要么就是undefined，其他情况都会报错。

// ?比较常见的一个情况是，我们的 useEffect 需要执行一个 async 函数，比如：

// ? ❌ 
// Type 'Promise<void>' provides no match 
// for the signature '(): void | undefined'
// React.useEffect(async () => {
//     const user = await Promise.resolve(null)
//     setUser(user)
// }, [])
// 报错
// 类型“() => Promise < void>”的参数不能赋给类型“EffectCallback”的参数。
// 不能将类型“Promise < void>”分配给类型“void | (() => void | undefined) ”。
// 不能将类型“Promise < void>”分配给类型“() => void | undefined”。
// 类型“Promise < void>”提供的内容与签名“(): void | undefined”不匹配。ts(2345)

//?虽然没有在 async 函数里显式的返回值，但是 async 函数默认会返回一个 Promise，这会导致 TS 的报错。

// ?推荐这样改写：

React.useEffect( () => {
    const getUser=async ()=>{
        const user = await Promise.resolve(null)
        setUser(user)
    }
    getUser()
   
}, [])
// ? 或这样
React.useEffect(() => {
    (async () => {
      const user = await Promise.resolve(null)
      setUser(user)
    })()
  }, [])

// ? useRef

// ?这个 Hook 在很多时候是没有初始值的，这样可以声明返回对象中 current 属性的类型：

const ref=React.useRef<HTMLElement>(null)

// 以一个按钮场景为例：


function TextInputWithFocusButton() {
    const inputEle=React.useRef<HTMLInputElement>(null);
    const onButtonClick=()=>{
        // ?非空判断
        if(inputEle && inputEle.current){
            inputEle.current.focus()
        }
        //?或者
        inputEle.current?.focus()
    }
    return (
        <>
        <input ref={inputEle} type="text"/>
        <button onClick={onButtonClick}>
            Focus
        </button>
        </>
    )
}
// ? 当 onButtonClick 事件触发时，可以肯定 inputEl 也是有值的，因为组件是同级别渲染的，但是还是依然要做冗余的非空判断。

// ?有一种办法可以绕过去。

const ref1=React.useRef<HTMLElement>(null!)
// null! 这种语法是非空断言，跟在一个值后面表示你断定它是有值的，所以在你使用 inputEl.current.focus() 的时候，TS 不会给出报错。
// 但是这种语法比较危险，需要尽量减少使用。
// 在绝大部分情况下，inputEl.current?.focus() 是个更安全的选择，除非这个值真的不可能为空。（比如在使用之前就赋值了）


//? useImperativeHandle

// 推荐使用一个自定义的 innerRef 来代替原生的 ref，否则要用到 forwardRef 会搞的类型很复杂。

type ListProps={
    innerRef?:React.Ref<{scrollToTop():void}>
}

function List(props:ListProps) {
    React.useImperativeHandle(props.innerRef,()=>({
        scrollToTop(){}
    }))
    return null
}

// ?结合刚刚 useRef 的知识，使用是这样的：

function User() {
    const listRef=React.useRef<{scrollToTop():void}>(null!)
    React.useEffect(()=>{
        listRef.current.scrollToTop()
    },[])
    return (
        <List innerRef={listRef} />
    )
}

// ? 自定义 Hook


//? 如果你想仿照 useState 的形式，返回一个数组给用户使用，
//? 一定要记得在适当的时候使用 as const，标记这个返回值是个常量，
//? 告诉 TS 数组里的值不会删除，改变顺序等等……
//?否则，你的每一项都会被推断成是「所有类型可能性的联合类型」，这会影响用户使用。
export function userLoading() {
    const [isLoading,setState]=React.useState(false)
    const load=(aPromise:Promise<any>)=>{
        setState(true)
        return [isLoading,load] as const;[]
    }
}
// ?对了，如果你在用 React Hook 写一个库，别忘了把类型也导出给用户使用。

// !React API

// ? forwardRef
// ? 函数式组件默认不可以加 ref，它不像类组件那样有自己的实例。这个 API 一般是函数式组件用来接收父组件传来的 ref。

// ? 所以需要标注好实例类型，也就是父组件通过 ref 可以拿到什么样类型的值。

type PropsF={};
export type RefF=HTMLButtonElement;
export const FancyButton=React.forwardRef<RefF,PropsF>((props,ref)=>(
    <button ref={ref} className='MyClassName'>
        {props.children}

    </button>
))

// ?由于这个例子里直接把 ref 转发给 button 了，所以直接把类型标注为 HTMLButtonElement 即可。

// ?父组件这样调用，就可以拿到正确类型：
export const App3=()=>{
    const ref=React.useRef<HTMLButtonElement>(null)
    return(
        <FancyButton ref={ref} />
    )
}


// type Parent = 'a' | 'b' | 'c'
// type Son = 'a' | 'b'

// let parent: Parent
// let son: Son='a'
// son = parent // ❌error! parent 有可能是 'c'
// parent = son // ✅ok

type val1 = { a: number,b: number }
type val4 = { a: number }
let val3={ a: 1}
let val2 = { a: 1, b: 2, c: 3 }

function f(val:val1){}
function f2<T extends val4>(val:T){}
// f(val3)//err
// f(val2)
// f2(val3)
// f2(val2)
type MakeFunction<T> = (arg: T) => void


interface Animal {
    age: number
  }
  
  interface Dog extends Animal {
    bark(): void
  }
let visitAnimal = (animal: Animal) => {
    animal.age
  }
  
  let visitDog = (dog: Dog) => {
    dog.age
    dog.bark()
  }
  let visitDog2:MakeFunction<Dog>= (dog:Dog) => {
    dog.age
    dog.bark()
  }
  
  let animal = { age: 5 }

  function process<T extends string | null>(
    text: T
  ): T extends string ? T : null {

    return  typeof text === 'string' ? text : null
  }
  process('qwe')