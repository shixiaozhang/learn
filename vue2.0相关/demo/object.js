let car = {

}
Object.defineProperty(car, 'price', {
    enumerable: true,//当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
    configurable: true,//当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
    get() {
        console.log('duqu!');
        return ' car.price'
    },
    set(newVal) {
        console.log('修改！');
        return newVal
    }
})
console.log(car.price);
car.price = 9000