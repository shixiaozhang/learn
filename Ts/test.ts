/*
 * @Author: your name
 * @Date: 2021-01-13 10:53:28
 * @LastEditTime: 2021-01-15 16:23:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Ts\test.ts
 */
function rev<T>(item:T[]):T[]{

    return item

}

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source, subString) {
    return source.search(subString) !== -1;
}
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string  | void{
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
let tom:Cat = animal as Cat;


function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']





let jiantou=(val:number)=>val.toString()// ==== var jiantou = function (val) { return val.toString(); };

const simple: (foo: number) => string = foo => foo.toString();//==== var simple = function (foo) { return foo.toString(); };

    type sm=(foo: number) => string;

    const simple2:sm  = foo => foo.toString();



console.log(jiantou(10));
