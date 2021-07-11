const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const projectRoot = process.cwd();//获取cmd 命令行此时的目录

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  //   console.log(entryFiles);
  entryFiles.forEach((entryFile) => {
    // 获取文件夹name
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match && match[1];
    // console.log(pageName);
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        // chunks: [pageName,'vendors'],
        chunks: [pageName, 'vendors'], // 添加 vendors，用来引入 我们分离出来的 公共包
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    )
  });
  //   console.log(entry);
  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  // ?资源解析部分
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          'babel-loader',
          // 'eslint-loader'
        ],
      },
      {
        test: /.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // ? 1rem = 75px
              remPrecesion: 8, // ? 转换的时候rem 小数点位数
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [

    // ? 目录清理
    new CleanWebpackPlugin(),
    // ? 分包css
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),

    // ? 优化日志输出
    new FriendlyErrorsWebpackPlugin(),
    // ? 自动引入多个入口的模版html
    ...htmlWebpackPlugins,
  ],
  stats: 'errors-only', // 日志输出的类型
};
