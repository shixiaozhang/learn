"use strict";
// 基础类型
let typeString = "123";
let typeNumber = 123;
let typeBool = false;
let typeObject = {};
let typeSymbol = Symbol("key");
let typeUndefined = undefined;
let typeNull = null;
let tyoeBigint = 9007199254740991n || BigInt("1");
// 包装类型
let typeNumer2 = 123;
let typebool2 = false;
let typeString2 = "123";
let typeObject2 = {};
let typeSymbol2 = Symbol("key");
let typeArray = ["a"];
class typeClassType {
    constructor() { }
}
let typeClass = new typeClassType();
class Person {
}
const obj = {
    name: "xiaozhang",
    age: 12,
};
const func = (name) => {
    return `hello ${name}`;
};
function createPerson(ctr) {
    return new ctr("xiaozhang", 18);
}
const aObj = {};
aObj.name = "xiaozhan";
aObj.age = 18;
var Transplier;
(function (Transplier) {
    Transplier["Bable"] = "bable";
    Transplier["Postcss"] = "postcss";
    Transplier["Terser"] = "terser";
    Transplier["Prettier"] = "prettier";
    Transplier["TypeScriptCompiler"] = "typesvriptcompiler";
})(Transplier || (Transplier = {}));
const terser = Transplier.Terser;
as `${Key & string}${Key & string}${Key & string}`;
[
    T[Key],
    T[Key],
    T[Key]
];
;
let point = {
    x: 1,
    y: 1,
};
`${Pref}${string}` ? true : false;
`${infer;
Pref;
$;
{
    From;
}
$;
{
    infer;
    End;
}
` ? `;
$;
{
    Pref;
}
$;
{
    To;
}
$;
{
    End;
}
` : Str;

type ReplaceStrStr = ReplaceStr<"zhangzhangzhang ?", "?", "X">;

// 去除左侧空格
type TrimStrLeft<str extends string> = str extends `;
$;
{
        | " "
        | "\n"
        | "\t";
}
$;
{
    infer;
    Rest;
}
`
  ? TrimStrLeft<Rest>
  : str;

//   去除右侧空格
type TrimStrRight<Str extends string> = Str extends `;
$;
{
    infer;
    Rest;
}
$;
{
        | " "
        | "\n"
        | "\t";
}
`
  ? TrimStrRight<Rest>
  : Str;

//   去除左右空格
type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>;

// 获取函数参数类型
type GetFunArg<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

type ParamsRest = GetFunArg<(name: string, age: number) => string>;

// 获取函数返回值类型
type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer ReturnStr
  ? ReturnStr
  : never;

type GetReturnTypeRest = GetReturnType<() => number>;

class Dong {
  name: string;
  constructor() {
    this.name = "zhang";
  }
  hello(this: Dong) {
    console.log(`;
name: $;
{
    this.name;
}
`);
  }
}

const dong = new Dong();

// 获取类的this
type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  ...ares: any[]
) => any
  ? ThisType
  : unknown;

type GetThisParameterTypeRest = GetThisParameterType<typeof dong.hello>;

// 获取构造器
interface PersonNew {
  name: string;
}

interface PersonConstructor {
  new (name: string): PersonNew;
}

type GetInstanceType<ConstructorType extends new (...args: any) => any> =
  ConstructorType extends new (...args: any) => infer InstanceType
    ? InstanceType
    : any;

type GetInstanceTypeRest = GetInstanceType<PersonConstructor>;

// 提取 Props 里 ref 的类型

type GetRefProps<Props> = "ref" extends keyof Props
  ? Props extends { ref?: infer value | undefined }
    ? value
    : never
  : never;

type GetRefPropsRest = GetRefProps<{ ref: "aa" }>;
type GetRefPropsRest2 = GetRefProps<{ ref: undefined }>;
type GetRefPropsRest3 = GetRefProps<{}>;

// 数组/元祖 类型的重新构造
type tupleArr = [1, 2, 3];

type PushArr<arr extends unknown[], R> = [...arr, R];

type tuple1 = [1, 2, 3];
type tuple2 = ["guang", "dong", "yuo"];

type tupleRe<
  T extends [unknown, unknown],
  R extends [unknown, unknown]
> = T extends [infer T1, infer T2]
  ? R extends [infer R1, infer R2]
    ? [[T1, R1], [T2, R2]]
    : []
  : [];

type tupleRe2<T extends unknown[], R extends unknown[]> = T extends [
  infer firstT,
  ...infer otherT
]
  ? R extends [infer firstR, ...infer otherR]
    ? [[firstT, firstR], ...tupleRe2<otherT, otherR>]
    : []
  : [];

type tupleReRest = tupleRe2<tuple1, tuple2>;

// 字符串类型的重新构造
// 首字母大写 Uppercase ts内置类型 装换字母为大写
type CapitalizeStr<T extends string> =
  T extends `;
$;
{
    infer;
    first;
}
$;
{
    infer;
    first;
}
$;
{
    infer;
    rest;
}
`
    ? `;
$;
{
    Uppercase();
}
$;
{
    rest;
}
`
    : T;

type CapitalizeStrRest = CapitalizeStr<"first">;

// dong_dong_dong 到 dongDongDong
type CamelCase<str extends string> =
  str extends `;
$;
{
    infer;
    left;
}
_$;
{
    infer;
    right;
}
$;
{
    infer;
    rest;
}
`
    ? `;
$;
{
    left;
}
$;
{
    Uppercase();
}
$;
{
    CamelCase();
}
`
    : str;

type CamelCaseRest = CamelCase<"dong_dong_dong">;

// 删除某段字符串

type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `;
$;
{
    infer;
    left;
}
$;
{
    SubStr;
}
$;
{
    infer;
    right;
}
`
  ? DropSubStr<`;
$;
{
    left;
}
$;
{
    right;
}
`, SubStr>
  : Str;

//   函数类型的重新构造

type AppendArgument<Func extends Function, arg> = Func extends (
  ...args: infer oldArgs
) => infer ReturnRest
  ? (...args: [...oldArgs, arg]) => ReturnRest
  : Func;

//   索引类型的重新构造

type objSY = {
  readonly name: string;
  age?: number;
  gender: boolean;
};

type Mapping<obj extends object> = {
  [key in keyof obj]: obj[key];
};

// UppercaseKey 重映射

type UppercaseKey<obj extends object> = {
  [Key in keyof obj as Uppercase<Key & string>]: obj[Key];
};

type UppercaseKeyRest = UppercaseKey<{ ast: "11" }>;

// Record 高级类型 Record 来创建索引类型
type RecordP<K extends string | number | symbol, T> = { [P in K]: T };

type UppercaseKeyPlus<Obj extends Record<string, any>> = {
  [key in keyof Obj as Uppercase<key & string>]: Obj[key];
};

// ToReadonly
type ToReadonly<obj extends object> = { readonly [key in keyof obj]: obj[key] };

// 添加可选修饰符
type ToPartial<obj extends object> = { [key in keyof obj]?: obj[key] };

// 去掉 readonly 修饰 ToMutable
type ToMutable<obj extends object> = { -readonly [key in keyof obj]: obj[key] };
type ToMutableRest = ToMutable<{ readonly name?: "zhang" }>;

// ToRequired 去掉可选
type ToRequired<obj extends object> = { [key in keyof obj]-?: obj[key] };

type ToRequiredRest = ToRequired<{ name?: "zhang" }>;

// 根据值的类型做下过滤 FilterByValueType

type FilterByValueType<obj extends Record<string, any>, valueType> = {
  [key in keyof obj as valueType extends obj[key] ? key : never]: obj[key];
};

type FilterByValueTypeRest = FilterByValueType<
  { name: number; age: 2 },
  number
>;

// 递归复用

// Promise 的递归复用
type ttt = Promise<Promise<Promise<Record<string, any>>>>;

type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer ValueType
>
  ? ValueType extends Promise<unknown>
    ? DeepPromiseValueType<ValueType>
    : ValueType
  : never;

type DeepPromiseValueTypeRest = DeepPromiseValueType<ttt>;

// 简化版
type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType2<ValueType>
  : T;

type DeepPromiseValueTypeRest2 = DeepPromiseValueType2<ttt>;
type DeepPromiseValueTypeRest3 = DeepPromiseValueType2<Promise<number>>;

//   数组类型的递归
type arrReverseArr = [1, 2, 3, 4, 5];
type ReverseArr<T extends unknown[]> = T extends [...infer rest, infer last]
  ? [last, ...ReverseArr<rest>]
  : T;

type ReverseArrRest = ReverseArr<arrReverseArr>;

// 数组类型 查找 Includes

// IsEqual 相等的判断就是 A 是 B 的子类型并且 B 也是 A 的子类型
type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

type Includes<T extends unknown[], FindItem> = T extends [
  infer First,
  ...infer rest
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<rest, FindItem>
  : false;

type IncludesRest = Includes<[1, 2, 3], 3>;

//   数组类型 删除 RemoveItem 构造一个新的数组返回。

type RemoveItem<
  arr extends unknown[],
  item,
  restult extends unknown[] = []
> = arr extends [infer first, ...infer rest]
  ? IsEqual<first, item> extends true
    ? RemoveItem<rest, item, restult>
    : RemoveItem<rest, item, [...restult, first]>
  : restult;

type RemoveItemRest = RemoveItem<[1, 2, 3, 3, 3, 3], 3, [33]>;

// BuildArray  数组类型的构造

type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type BuildArrayRest = BuildArray<4, 1, []>;

// 字符串类型的递归

// ReplaceStr处理单个字符串替换
// type ReplaceStr<
//   Str extends string,
//   From extends string,
//   To extends string
// > = Str extends `;
$;
{
    infer;
    Prefix;
}
$;
{
    From;
}
$;
{
    infer;
    Suffix;
}
`
//   ? `;
$;
{
    Prefix;
}
$;
{
    To;
}
$;
{
    Suffix;
}
`
//   : Str;

// ReplaceAll 所有的字符串替换

type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `;
$;
{
    infer;
    Prefix;
}
$;
{
    From;
}
$;
{
    infer;
    Suffix;
}
`
  ? `;
$;
{
    Prefix;
}
$;
{
    To;
}
$;
{
    ReplaceAll();
}
`
  : Str;
type ReplaceAllRest = ReplaceAll<"a a a a a a", "a", "b">;

// 把字符串字面量类型的每个字符都提取出来组成联合类型
// StringToUnion
type StringToUnion<str extends string> =
  str extends `;
$;
{
    infer;
    left;
}
$;
{
    infer;
    rest;
}
` ? left | StringToUnion<rest> : never;

type StringToUnionRest = StringToUnion<"abc">;

// 反转字符串ReverseStr

type ReverseStr<
  Str extends string,
  Result extends string = ""
> = Str extends `;
$;
{
    infer;
    left;
}
$;
{
    infer;
    rest;
}
`
  ? ReverseStr<rest, `;
$;
{
    left;
}
$;
{
    Result;
}
`>
  : Result;

type ReverseStrRest = ReverseStr<"abc">;

// 对象类型的递归;
type DeepReadonly<Obj extends Record<string, any>> = {
  readonly [key in keyof Obj]: Obj[key] extends object
    ? Obj[key] extends Function
      ? Obj[key]
      : DeepReadonly<Obj[key]>
    : Obj[key];
};

// 触发计算 4.6.2触发
type DeepReadonly2<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
          ? Obj[Key]
          : DeepReadonly<Obj[Key]>
        : Obj[Key];
    }
  : never;
type objDeepReadonly = {
  a: {
    b: {
      c: {
        f: () => "dong";
        d: {
          e: {
            guang: string;
          };
        };
      };
    };
  };
};

type DeepReadonlyRest = DeepReadonly<objDeepReadonly>;

type DeepReadonlyRest2 = DeepReadonly2<objDeepReadonly>;

// 数组长度实现加减乘除
// Add

// 加法
type AddNumber<A extends number, B extends number> = [
  ...BuildArray<A>,
  ...BuildArray<B>
]["length"];
type AddRestult = AddNumber<30, 40>;

// 减法
type Subtract<A extends number, B extends number> = BuildArray<A> extends [
  ...BuildArray<B>,
  ...infer Rest
]
  ? Rest["length"]
  : never;

type SubtractRest = Subtract<20, 5>;

// 乘法

type Mutiply<
  num1 extends number,
  num2 extends number,
  Result extends unknown[] = []
> = num2 extends 0
  ? Result["length"]
  : Mutiply<num1, Subtract<num2, 1>, [...BuildArray<num1>, ...Result]>;

type MutiplyRestult = Mutiply<33, 22>;

// 除法

type Divide<
  num1 extends number,
  num2 extends number,
  Result extends unknown[] = []
> = num2 extends 0
  ? Result["length"]
  : Divide<Subtract<num1, num2>, num2, [unknown, ...Result]>;

// 类型实例化过深，且可能无限
// type DivideRestult = Divide<9,3>;

// 数组长度实现计数
type StrLen<
  Str extends string,
  Result extends unknown[] = []
> = Str extends `;
$;
{
    string;
}
$;
{
    infer;
    Rest;
}
`
  ? StrLen<Rest, [unknown, ...Result]>
  : Result["length"];

type StrLenRest = StrLen<"123123">;

// 数值比较

type GreaterThan<
  num1 extends number,
  num2 extends number,
  Result extends unknown[] = []
> = num1 extends num2
  ? false
  : Result["length"] extends num2
  ? true
  : Result["length"] extends num1
  ? false
  : GreaterThan<num1, num2, [...Result, unknown]>;

type GreaterThanRest = GreaterThan<10, 19>;
type GreaterThanRest2 = GreaterThan<100, 19>;

// Fibonacci
// type FibonacciLoop<
//   PrevArr extends unknown[],
//   CurrentArr extends unknown[],
//   IndexArr extends unknown[] = [],
//   Num extends number = 1
// > = IndexArr["length"] extends Num
//   ? CurrentArr["length"]
//   : FibonacciLoop<
//       CurrentArr,
//       [...PrevArr, ...CurrentArr],
//       [...IndexArr, unknown],
//       Num
//     >;

// type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;

// type FibonacciResult = Fibonacci<10>;

type FibonacciLoop<
  prevArr extends unknown[] = [1],
  currentArr extends unknown[] = [],
  indexArr extends unknown[] = [],
  num extends number = 1
> = indexArr["length"] extends num
  ? currentArr["length"]
  : FibonacciLoop<
      currentArr,
      [...currentArr, ...prevArr],
      [...indexArr, unknown],
      num
    >;
type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;
type FibonacciLoopRest = Fibonacci<8>;

// 分布式条件类型
// 当类型参数为联合类型，并且在条件类型左边直接引用该类型参数的时候，TypeScript 会把每一个元素单独传入来做类型运算，最后再合并成联合类型，这种语法叫做分布式条件类型。

type Union = "a" | "b" | "c";
type UppercaseA<item extends string> = item extends "a"
  ? Uppercase<item>
  : item;

type UppercaseARest = UppercaseA<Union>;

type UnionRest = `;
$;
{
    Union;
}
~~~`;

// CamelcaseStr;
type Camelcase<Str extends string> =
  Str extends `;
$;
{
    infer;
    Left;
}
_$;
{
    infer;
    Right;
}
$;
{
    infer;
    Rest;
}
`
    ? `;
$;
{
    Left;
}
$;
{
    Uppercase();
}
$;
{
    Camelcase();
}
`
    : Str;

//CamelcaseArr
type CamelcaseArr<arr extends unknown[]> = arr extends [
  infer item,
  ...infer rest
]
  ? [Camelcase<item & string>, ...CamelcaseArr<rest>]
  : [];

// CamelcaseUnion

type CamelcaseUnion<item extends string> = Camelcase<item>;

type CamelcaseUnionRest = CamelcaseUnion<"aa_aa_aa" | "bb_bb_bb" | "cc_cc_cc">;

//  Union 类型的判断
// 条件类型中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会。

// 所以 A 是 'a' 的时候，B 是 'a' | 'b' | 'c'， A 是 'b' 的时候，B 是 'a' | 'b' | 'c'。。。

type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;

type TestUnionResult = TestUnion<"a" | "b" | "c">;

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

// BEM
// bem 是 css 命名规范，用 block__element--modifier 的形式来描述某个区块下面的某个元素的某个状态的样式

type CreateUnion = ["aaa", "bbb"][number];

type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `;
$;
{
    Block;
}
_$;
{
    Element[number];
}
-$;
{
    Modifiers[number];
}
`;

type bemResult = BEM<"guang", ["aaa", "bbb"], ["warning", "success"]>;

// AllCombinations

type Combination<A extends string, B extends string> =
  | A
  | B
  | `;
$;
{
    A;
}
$;
{
    B;
}
`
  | `;
$;
{
    B;
}
$;
{
    A;
}
`;

type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never;

type AllCombinationsResult = AllCombinations<"A" | "B" | "C">;

// 特殊类型的特性

// IsAny
// 如何判断一个类型是 any 类型呢
// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。

type IsAny<T> = "zhang" extends "yyy" & T ? true : false;

type IsAnyRest = IsAny<any>;
type IsAnyRest2 = IsAny<"yyy">;

// IsEqual 判断 any
// 是否相等
type IsEqual222 = true & false;
type IsEqualNew<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

// IsUnion
// 判断联合类型

type IsUnionNew<A, B = A> = A extends A
  ? [B] extends [A]
    ? false
    : true
  : never;

// IsNever
// never 在条件类型中也比较特殊，如果条件类型左边是类型参数，并且传入的是 never，那么直接返回 never：

type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverRest = IsNever<"never">;
type IsNeverRest2 = IsNever<never>;
type IsNeverRest3 = IsNever<any>;

//除此以外，any 在条件类型中也比较特殊，如果类型参数为 any，会直接返回 trueType 和 falseType 的合并
type TestAny<T> = T extends number ? 1 : 2;

type TestAnyRest = TestAny<any>;

// IsTuple
// 元组类型也是数组类型，但每个元素都是只读的，
// 并且 length 是数字字面量，而数组的 length 是 number。

type lenTuple = ["1", "2"]["length"];
type lenArr = number[]["length"];

// 不相等  NotEqual
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? false
  : true;

type NotEqualRest = NotEqual<any, number[]>;

type IsTuple<T> = T extends readonly [...params: infer Eles]
  ? NotEqual<Eles["length"], number>
  : false;

// UnionToIntersection

// 如果允许父类型赋值给子类型，就叫做逆变。

// 如果允许子类型赋值给父类型，就叫做协变。

// 联合转交叉
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToIntersectionRest = UnionToIntersection<{ zhang: 1 } | { zh: 2 }>;

// 函数参数的逆变性质一般就联合类型转交叉类型会用，记住就行。

// GetOptional

// 提取索引类型中的可选索引

// 可选索引的值为 undefined 和值类型的联合类型

type objOptional = {
  name: string;
  age?: number;
};
// {} extends Pick<Obj, key> 过滤的方式就是单独取出该索引之后，判断空对象是否是其子类型。

type isOptional<Obj, key extends keyof Obj> = {} extends Pick<Obj, key>
  ? key
  : never;

type GetOptional<Obj extends Record<string, any>> = {
  [key in keyof Obj as {} extends Pick<Obj, key> ? key : never]: Obj[key];
};

type GetOptional2<Obj extends Record<string, any>> = {
  [key in keyof Obj as isOptional<Obj, key>]: Obj[key];
};

type GetOptionalRest = GetOptional<objOptional>;

type GetOptionalRest2 = GetOptional2<objOptional>;

// GetRequired

//过滤所有非可选的索引构造成新的索引类型：

type isRequired<Obj, key extends keyof Obj> = {} extends Pick<Obj, key>
  ? never
  : key;

type GetRequired<Obj> = {
  [key in keyof Obj as isRequired<Obj, key>]: Obj[key];
};

type GetRequiredRest = GetRequired<objOptional>;

// RemoveIndexSignature

// 索引类型可能有索引，也可能有可索引签名
type objIndexType = {
  [key: string]: any;
  sleep(): void;
};

// 这里的 sleep 是具体的索引，[key: string]: any 就是可索引签名，代表可以添加任意个 string 类型的索引

//? 索引签名不能构造成字符串字面量类型，因为它没有名字，而其他索引可以。

type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [key in keyof Obj as key extends `;
$;
{
    infer;
    Str;
}
` ? Str : never]: Obj[key];
};

type RemoveIndexSignatureRest = RemoveIndexSignature<objIndexType>;

// ClassPublicProps

// 滤出 class 的 public 的属性

//? keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略

class publicProps {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = "dong";
    this.age = 20;
    this.hobbies = ["sleep", "eat"];
  }
}

type publicKeys = keyof publicProps;

type ClassPublicProps<Obj extends Record<string, any>> = {
  [key in keyof Obj]: Obj[key];
};

type ClassPublicPropsRest = ClassPublicProps<publicProps>;

//?  any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。

//?  联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。

//?  never 作为类型参数出现在条件类型左侧时，会直接返回 never。

//?  any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。

//?  元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。

//?  函数参数处会发生逆变，可以用来实现联合类型转交叉类型。

//?  可选索引的值为 undefined 和值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引。

//?  索引类型的索引为字符串字面量类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。

//?  keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。

type ParseQueryString<T extends string> = T extends `;
$;
{
    infer;
    A;
}
 & $;
{
    infer;
    B;
}
`
  ? ParseParam<A>
  : ParseParam<T>;

type ParseParam<Str extends string> = Str extends `;
$;
{
    infer;
    A;
}
$;
{
    infer;
    B;
}
`
  ? { [a in A]: B }
  : never;

type ParseParamRest = ParseParam<"a=1">;

type MergeValues<One, Other> = One extends Other
  ? One
  : Other extends unknown[]
  ? [One, ...Other]
  : [One, Other];

type MergeParams<
  T extends Record<string, any>,
  R extends Record<string, any>
> = {
  [key in keyof T | keyof R]: key extends keyof T
    ? key extends keyof R
      ? MergeValues<T[key], R[key]>
      : T[key]
    : key extends keyof R
    ? R[key]
    : never;
};
;
