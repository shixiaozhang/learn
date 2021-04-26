创建 tsconfig.json
首先，在项目的根目录中创建一个空的 tsconfig.json 文件:

touch tsconfig.json
现在，试试启动/重新启动开发服务器 (npm run dev 或 yarn dev)。它会给你一个类似下面这样的警告:

看起来你正在尝试使用 TypeScript，但是没有安装所需的包。

按照说明安装 TypeScript:

# If you’re using npm
npm install --save-dev typescript @types/react @types/node

# If you’re using Yarn
yarn add --dev typescript @types/react @types/node
现在，再次尝试启动开发服务器。启动服务器后，Next.js 将：

为你填充 tsconfig.json 文件。你可以自定义该文件。
创建 next-env.d.ts 文件，该文件确保 TypeScript 编译器正确检测 Next.js 类型。你不应该编辑这个文件。
现在，你可以对 Next.js 应用程序使用 TypeScript。让我们来谈谈如何将你的 Next.js 应用程序转换为 TypeScript。