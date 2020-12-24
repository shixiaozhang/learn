/*
 * @Author: your name
 * @Date: 2020-12-24 17:56:37
 * @LastEditTime: 2020-12-24 18:04:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\Other\解构es6.js
 */
计算对象属性名称和解构

let key = 'z';
let { [key]: foo } = { z: 'bar' };

console.log(foo); // "bar"


组合数组和对象解构

const props = [
    { id: 1, name: 'Fizz' },
    { id: 2, name: 'Buzz' },
    { id: 3, name: 'FizzBuzz' }
];

const [, , { name }] = props;

console.log(name); // "FizzBuzz"


基本变量分配

const foo = ['one', 'two', 'three'];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"

转让与声明分开


let a, b;

[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2


默认值


let a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7


交换变量


let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

const arr = [1,2,3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(arr); // [1,3,2]



解析从函数返回的数组


function f() {
    return [1, 2];
  }
  
  let a, b;
  [a, b] = f();
  console.log(a); // 1
  console.log(b); // 2


  忽略一些返回值


  function f() {
    return [1, 2, 3];
  }
  
  const [a, , b] = f();
  console.log(a); // 1
  console.log(b); // 3
  
  const [c] = f();
  console.log(c); // 1


将数组的其余部分分配给变量

const [a, ...b] = [1, 2, 3];

console.log(a); // 1
console.log(b); // [2, 3]


从正则表达式匹配中解包值

function parseProtocol(url) {
    const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
    if (!parsedURL) {
      return false;
    }
    console.log(parsedURL);
//   ["https://developer.mozilla.org/en-US/Web/JavaScript",
//         "https", "developer.mozilla.org", "en-US/Web/JavaScript"]
  
    const [, protocol, fullhost, fullpath] = parsedURL;
    return protocol;
  }
  
  console.log(parseProtocol('https://developer.mozilla.org/en-US/Web/JavaScript'));
  // "https"

//   对象解构


  没有声明的转让

  let a, b;

  ({a, b} = {a: 1, b: 2});

  分配给新的变量名

const o = {p: 42, q: true};
const {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true

默认值

const {a = 10, b = 5} = {a: 3};

console.log(a); // 3
console.log(b); // 5

分配新的变量名称并提供默认值


const {a: aa = 10, b: bb = 5} = {a: 3};

console.log(aa); // 3
console.log(bb); // 5


从作为函数参数传递的对象中解压缩字段

const user = {
    id: 42,
    displayName: 'jdoe',
    fullName: {
      firstName: 'John',
      lastName: 'Doe'
    }
  };
  
  function userId({id}) {
    return id;
  }
  
  function whois({displayName, fullName: {firstName: name}}) {
    return `${displayName} is ${name}`;
  }
  
  console.log(userId(user)); // 42
  console.log(whois(user));  // "jdoe is John"


  设置功能参数的默认值

  function drawChart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
    console.log(size, coords, radius);
    // do some chart drawing
  }
  
  drawChart({
    coords: {x: 18, y: 30},
    radius: 30
  });


  嵌套对象和数组解构


  const metadata = {
    title: 'Scratchpad',
    translations: [
      {
        locale: 'de',
        localization_tags: [],
        last_edit: '2014-04-14T08:43:37',
        url: '/de/docs/Tools/Scratchpad',
        title: 'JavaScript-Umgebung'
      }
    ],
    url: '/en-US/docs/Tools/Scratchpad'
  };
  
  let {
    title: englishTitle, // 重命名
    translations: [
      {
         title: localeTitle, // 重命名
      },
    ],
  } = metadata;
  
  console.log(englishTitle); // "Scratchpad"
  console.log(localeTitle);  // "JavaScript-Umgebun


  对于迭代和解构
  const people = [
    {
      name: 'Mike Smith',
      family: {
        mother: 'Jane Smith',
        father: 'Harry Smith',
        sister: 'Samantha Smith'
      },
      age: 35
    },
    {
      name: 'Tom Jones',
      family: {
        mother: 'Norah Jones',
        father: 'Richard Jones',
        brother: 'Howard Jones'
      },
      age: 25
    }
  ];
  
  for (const {name: n, family: {father: f}} of people) {
    console.log('Name: ' + n + ', Father: ' + f);
  }
  
  // "Name: Mike Smith, Father: Harry Smith"
  // "Name: Tom Jones, Father: Richard Jones"


