const car=require('./car')
const dog=require('./dog')

const car2=require('./car')
const dog2=require('./dog')

console.log(car);
console.log(car2);
/**
 * exports: 公开的是整个car对象；
 * { car: { brand: 'Ford', model: 'Fiesta' } }
 * 多个 exports 公开的是一个大对象；里面是exports 的一个个对象
 * {
 * car: { brand: 'Ford', model: 'Fiesta' },
 * car2: { brand: 'Ford', model: 'Fiesta' }
 * }
 * es 6：
 * export 与exports类似
 * 
 */


console.log(dog);
console.log(dog2);
/**
 * module.exports: 公开的是dog对象里面的属性；
 * { brand: 'Ford2', model: 'Fiesta2' }
 * { brand: 'Ford2', model: 'Fiesta2' }
 * module.exports 存在多个取最后一个；所以module。exports只能存在一个
 * es 6：
 * export.default 与 module.exports 类似
 */
