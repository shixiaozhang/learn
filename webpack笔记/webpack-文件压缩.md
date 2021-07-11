# JS ⽂件的压缩 

内置了 uglifyjs-webpack-plugin


# CSS ⽂件的压缩
安装使用 optimize-css-assets-webpack-plugin

同时安装使用 **cssnano** 由于optimize-css-assets-webpack-plugin需要依赖cssnano

   new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
    })
# html ⽂件的压缩

修改 html-webpack-plugin，设置压缩参数

 new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,//向template或者templateContent中注入所有静态资源
            title:'我是ejs语法传参测试',
            minify: {
                //传递 html-minifier 选项给 minify 输出，false就是不使用html压缩 配置地址参数： https://github.com/kangax/html-minifier#options-quick-reference
                html5: true,
                removeComments:true,//清除注释
                collapseWhitespace:true//清理空格
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),

同时处理多个html文件（通过chunks属性）：

    plugins: [
      new HtmlWebpackPlugin({
        chunks: ['app']
      })
    ]

## 在html-webpack-plugin 的模版html、中可以使用ejs模板语法

### ejs获取参数：htmlWebpackPlugin.options.title

  <title><%= htmlWebpackPlugin.options.title %></title>


## html-webpack-plugin配置项
插件提供的配置项比较多，通过源码可以看出具体的配置项如下：

this.options = _.extend({
    template: path.join(__dirname, 'default_index.ejs'),
    filename: 'index.html',
    hash: false,
    inject: true,
    compile: true,
    favicon: false,
    minify: false,
    cache: true,
    showErrors: true,
    chunks: 'all',
    excludeChunks: [],
    title: 'Webpack App',
    xhtml: false
  }, options);

title: 生成的html文档的标题。配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值，如下ejs模板语法形式：
<title>{%= htmlWebpackPlugin.options.title %}</title>
filename：输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置（例如'html/index.html'）

**关于filename补充两点：**
1、filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
2、指定生成的html文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。

template: 本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，如比如 handlebars!src/index.hbs；

**关于template补充几点：**
1、template配置项在html文件使用file-loader时，其所指定的位置找不到，导致生成的html文件内容不是期望的内容。
2、为template指定的模板文件没有指定任何loader的话，默认使用ejs-loader。如template: './index.html'，若没有为.html指定任何loader就使用ejs-loader

templateContent: string|function，可以指定模板的内容，不能与template共存。配置值为function时，可以直接返回html字符串，也可以异步调用返回html字符串。

inject：向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。

1、true或者body：所有JavaScript资源插入到body元素的底部
2、head: 所有JavaScript资源插入到head元素中
3、false： 所有静态资源css和JavaScript都不会注入到模板文件中

favicon: 添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值

hash：true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：
html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>

chunks：允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；

excludeChunks: 这个与chunks配置项正好相反，用来配置不允许注入的thunk。

chunksSortMode: none | auto| function，默认auto； 允许指定的thunk在插入到html文档前进行排序。
>function值可以指定具体排序规则；auto基于thunk的id进行排序； none就是不排序

xhtml: true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签

cache: true|fasle, 默认true； 如果为true表示在对应的thunk文件修改后就会emit文件

showErrors: true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。

minify: {....}|false；传递 html-minifier 选项给 minify 输出，false就是不使用html压缩，minify具体配置参数请点击html-minifier

