// 基础类型
let typeString: string = "123";

let typeNumber: number = 123;

let typeBool: boolean = false;

let typeObject: object = {};

let typeSymbol: symbol = Symbol("key");

let typeUndefined: undefined = undefined;

let typeNull: null = null;

let tyoeBigint: bigint = 9007199254740991n || BigInt("1");

// 包装类型
let typeNumer2: Number = 123;

let typebool2: Boolean = false;

let typeString2: String = "123";

let typeObject2: Object = {};

let typeSymbol2: Symbol = Symbol("key");

let typeArray: Array<string> = ["a"];

class typeClassType {
  constructor() {}
}
let typeClass: typeClassType = new typeClassType();

type Tuple = [number, string];

interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  name!: string;
  age!: number;
}

const obj: Person = {
  name: "xiaozhang",
  age: 12,
};

interface SayHello {
  (name: string): string;
}

const func: SayHello = (name: string) => {
  return `hello ${name}`;
};

interface personContruction {
  new (name: string, age: number): IPerson;
}

function createPerson(ctr: personContruction): IPerson {
  return new ctr("xiaozhang", 18);
}

interface PersonObj {
  [prop: string]: string | number;
}
const aObj: PersonObj = {};

aObj.name = "xiaozhan";
aObj.age = 18;

enum Transplier {
  Bable = "bable",
  Postcss = "postcss",
  Terser = "terser",
  Prettier = "prettier",
  TypeScriptCompiler = "typesvriptcompiler",
}

const terser = Transplier.Terser;

type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R]
  ? T
  : never;

type res = First<[1, 2, 3]>;

type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}${Key & string}`]: [
    T[Key],
    T[Key],
    T[Key]
  ];
};

type res2 = MapType<[1, 2, 3]>;

type lianhe = number | string | symbol;
type lianhe2 = [number];

type jiaocha = lianhe2 & number[];

type PartialPointX = { x: number };
type Point = PartialPointX & { y: number };

let point: Point = {
  x: 1,
  y: 1,
};

// 获取promise 的 泛型
type proA = Promise<string | number>;

type GetV<T> = T extends Promise<infer value> ? value : never;

type GetVexmp = GetV<proA>;

// 获取元祖的第一个类型
type GetFirst<arr extends unknown[]> = arr extends [infer first, ...unknown[]]
  ? first
  : never;

type firstVal = GetFirst<[number, 2, string]>;

// 获取元祖的最后一个类型
type GetLast<arr extends unknown[]> = arr extends [...unknown[], infer last]
  ? last
  : never;

type lastVal = GetLast<[number, 2, string]>;

// 获取元祖类型的某一部分
type PopArr<arr extends unknown> = arr extends []
  ? []
  : arr extends [...infer Rest, unknown]
  ? Rest
  : never;

type propRest = PopArr<[number, string, boolean]>;
type propRest2 = PopArr<[]>;

// 获取开始的字符串类型
type StartsWith<
  Str extends string,
  Pref extends string
> = Str extends `${Pref}${string}` ? true : false;

type StartsWithStr = StartsWith<"zhang ", "z">;

// 替换某些字符串类型
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Pref}${From}${infer End}` ? `${Pref}${To}${End}` : Str;

type ReplaceStrStr = ReplaceStr<"zhangzhangzhang ?", "?", "X">;

// 去除左侧空格
type TrimStrLeft<str extends string> = str extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimStrLeft<Rest>
  : str;

//   去除右侧空格
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
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
    console.log(`name : ${this.name}`);
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
