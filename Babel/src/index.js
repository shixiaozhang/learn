const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const template = require("@babel/template").default;
const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const targetCalleeName = ["log", "info", "error", "debug"].map(
  (item) => `console.${item}`
);
/**
 * @description: log 同一行 插入 line column
 */
const ast = parser.parse(sourceCode, {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});

traverse(ast, {
  CallExpression(path, state) {
    // 方案一
    // if (
    //   types.isMemberExpression(path.node.callee) &&
    //   path.node.callee.object.name === "console" &&
    //   ["log", "info", "error", "debug"].includes(path.node.callee.property.name)
    // ) {
    //   const { line, column } = path.node.loc.start;
    //   path.node.arguments.unshift(
    //     types.stringLiteral(`filename: (${line}, ${column})`)
    //   );
    // }
    // 方案二
    const calleeName = generate(path.node.callee).code;
    // 其实这里不用自己调用 generate，path 有一个 toString 的 api，就是把 AST 打印成代码输出的。
    const calleeName2 = path.get("callee").toString();
    console.log(calleeName2);
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.unshift(
        types.stringLiteral(`filename: (${line}, ${column})`)
      );
    }
  },
});
const { code, map } = generate(ast);

/**
 * @description: log 上一行 插入 line column
 */
const ast2 = parser.parse(sourceCode, {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});

traverse(ast2, {
  CallExpression(path, state) {
    if (path.node.isNew) {
      return;
    }
    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;

      const newNode = template.expression(
        `console.log("filename: (${line}, ${column})")`
      )();
      newNode.isNew = true;

      if (path.findParent((path) => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]));
        path.skip();
      } else {
        path.insertBefore(newNode);
      }
    }
  },
});

const { code: code2, map: map2 } = generate(ast2);
console.log(code2);
