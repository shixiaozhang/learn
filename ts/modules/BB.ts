export namespace BB{
    //和外界命名不相干
    export var ZZZZZZZZ='ZZZZZZZZZZZZZZ';
    export function cat(){
        console.log(ZZZZZZZZ)
    }
    export class Dog{
        name:string;
        constructor(name:string){
            this.name=name
        }
        setName(){
            console.log(this.name)
            console.log(ZZZZZZZZ)
        }
    }
}