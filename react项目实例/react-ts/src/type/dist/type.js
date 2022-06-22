"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.App3 = exports.FancyButton = exports.userLoading = void 0;
/*
 * @Author: your name
 * @Date: 2021-01-28 10:29:27
 * @LastEditTime: 2022-06-22 09:53:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\react项目实例\react-ts\src\type\type.tsx
 */
var react_1 = require("react");
var App = function (_a) {
    var message = _a.message;
    return react_1["default"].createElement("div", null, message);
};
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
var App2 = function (_a) {
    var message = _a.message, children = _a.children;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        children,
        react_1["default"].createElement("div", null, message)));
};
//? Hooks
// ?useState
// ? 如果你的默认值已经可以说明类型，那么不用手动声明类型，交给 TS 自动推断即可：
var _a = react_1["default"].useState(false), val = _a[0], toggle = _a[1];
toggle(false);
toggle(true);
var _b = react_1["default"].useState(null), user = _b[0], setUser = _b[1];
var newUser = {
    name: 'zhansan'
};
setUser(newUser);
// ?这样也可以保证在你直接访问 user 上的属性时，提示你它有可能是 null。
//? 通过 optional-chaining 语法（TS 3.7 以上支持），可以避免这个错误。
// ? 就是如果直接访问 user。name 因为他有个null 的可能类型；所以会报错
// ? 可以通过 user？。name 来获取name，有就存在，没有就null
var name = user === null || user === void 0 ? void 0 : user.name;
// ? useReducer
// 需要用 Discriminated Unions 来标注 Action 的类型。
var intitialState = { count: 0 };
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + action.payload };
        case 'decrement':
            return { count: state.count - Number(action.payload) };
        default:
            throw new Error('');
    }
}
function Counter() {
    var _a = react_1["default"].useReducer(reducer, intitialState), state = _a[0], dispatch = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        "Count:",
        state.count,
        react_1["default"].createElement("button", { onClick: function () { return dispatch({ type: 'decrement', payload: '5' }); } }, "-"),
        react_1["default"].createElement("button", { onClick: function () { return dispatch({ type: 'increment', payload: 5 }); } }, "+")));
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
react_1["default"].useEffect(function () {
    var getUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve(null)];
                case 1:
                    user = _a.sent();
                    setUser(user);
                    return [2 /*return*/];
            }
        });
    }); };
    getUser();
}, []);
// ? 或这样
react_1["default"].useEffect(function () {
    ;
    (function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve(null)];
                case 1:
                    user = _a.sent();
                    setUser(user);
                    return [2 /*return*/];
            }
        });
    }); })();
}, []);
// ? useRef
// ?这个 Hook 在很多时候是没有初始值的，这样可以声明返回对象中 current 属性的类型：
var ref = react_1["default"].useRef(null);
// 以一个按钮场景为例：
function TextInputWithFocusButton() {
    var inputEle = react_1["default"].useRef(null);
    var onButtonClick = function () {
        var _a;
        // ?非空判断
        if (inputEle && inputEle.current) {
            inputEle.current.focus();
        }
        //?或者
        (_a = inputEle.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("input", { ref: inputEle, type: "text" }),
        react_1["default"].createElement("button", { onClick: onButtonClick }, "Focus")));
}
// ? 当 onButtonClick 事件触发时，可以肯定 inputEl 也是有值的，因为组件是同级别渲染的，但是还是依然要做冗余的非空判断。
// ?有一种办法可以绕过去。
var ref1 = react_1["default"].useRef(null);
function List(props) {
    react_1["default"].useImperativeHandle(props.innerRef, function () { return ({
        scrollToTop: function () { }
    }); });
    return null;
}
// ?结合刚刚 useRef 的知识，使用是这样的：
function User() {
    var listRef = react_1["default"].useRef(null);
    react_1["default"].useEffect(function () {
        listRef.current.scrollToTop();
    }, []);
    return react_1["default"].createElement(List, { innerRef: listRef });
}
// ? 自定义 Hook
//? 如果你想仿照 useState 的形式，返回一个数组给用户使用，
//? 一定要记得在适当的时候使用 as const，标记这个返回值是个常量，
//? 告诉 TS 数组里的值不会删除，改变顺序等等……
//?否则，你的每一项都会被推断成是「所有类型可能性的联合类型」，这会影响用户使用。
function userLoading() {
    var _a = react_1["default"].useState(false), isLoading = _a[0], setState = _a[1];
    var load = function (aPromise) {
        setState(true);
        return [isLoading, load];
        [];
    };
}
exports.userLoading = userLoading;
exports.FancyButton = react_1["default"].forwardRef(function (props, ref) { return (react_1["default"].createElement("button", { ref: ref, className: "MyClassName" }, props.children)); });
// ?由于这个例子里直接把 ref 转发给 button 了，所以直接把类型标注为 HTMLButtonElement 即可。
// ?父组件这样调用，就可以拿到正确类型：
exports.App3 = function () {
    var ref = react_1["default"].useRef(null);
    return react_1["default"].createElement(exports.FancyButton, { ref: ref });
};
var val3 = { a: 1 };
var val2 = { a: 1, b: 2, c: 3 };
function f(val) { }
function f2(val) { }
var visitAnimal = function (animal) {
    animal.age;
};
var visitDog = function (dog) {
    dog.age;
    dog.bark();
};
var visitDog2 = function (dog) {
    dog.age;
    dog.bark();
};
var animal = { age: 5 };
//   function process<T extends string | null>(
//     text: T
//   ): T extends string ? T : null {
//     return  typeof text === 'string' ? text : null
//   }
//   process('qwe')
