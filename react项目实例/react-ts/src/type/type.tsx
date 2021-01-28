/*
 * @Author: your name
 * @Date: 2021-01-28 10:29:27
 * @LastEditTime: 2021-01-28 11:27:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react项目实例\react-ts\src\type\type.tsx
 */
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

export type FunctionProps={
      /** 任意的函数类型 ❌ 不推荐 不能规定参数以及返回值类型 */
      onSomeThing:Function;
      /** 没有参数的函数 不需要返回值 😁 常用 */
      onClick:()=>void;
       /** 带函数的参数 😁 非常常用 */
       onChange:(id:number)=>void;
        /** 另一种函数语法 参数是 React 的按钮事件 😁 非常常用 */
        onClick2(event:React.MouseEvent<HTMLButtonElement>): void;
        onClick3(event: React.MouseEvent<HTMLButtonElement>): void;
}