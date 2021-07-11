## PostCSS 插件 autoprefixer ⾃自动补⻬齐 CSS3 前缀

npm i postcss-loader autoprefixer -D
## 多种配置方式

 {
                test: /.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:()=>{   //这里单个可以用{}，多个就用[] ?不确定
                                require('autoprefixer')({
                                    // 浏览器兼容版本
                                    browsers:['last 2 version','>1%'，'ios 7']
                                })
                            }
                        }
                    }
                ]
            },
## 配置：options部分的不同配置方式：

'last 5 version':最近的5个版本
'>1%'：使用人数大于百分之1
'ios 7':ios 7 以上

### 1、
options:{
        plugins:()=>{ //这里单个可以用{}，多个就用[] ?不确定
            require('autoprefixer')({
                // 浏览器兼容版本
                browsers:['last 2 version','>1%']
            })
        }
}

### 2、新建postcss.config.js
module.exports = {  
    plugins: {  
      'autoprefixer': {browsers: 'last 5 version'}  
    }  
} 

### 3、package.json中配置可以和其他不同插件共享

 "browserslist": [
    "last 1 version",
    "> 1%",
    "IE 10"
  ]

#### 针对不同环境进行配置

"browserslist": {
    "production": [
        "> 1%",
        "ie 10"
    ],
    "modern": [
        "last 1 chrome version",
        "last 1 firefox version"
    ],
    "ssr": [
        "node 12"
    ]
}


### 4、.browserslistrc文件中

    # Browsers that we support

    last 1 version
    > 1%
    IE 10 # sorry

Browserslist会检查path中每个目录中的配置。你可以把配置放到根目录，app/或app/styles，如：app/styles/main.css

#### 针对不同环境进行配置 .browserslistrc：中


    [production]
    > 1%
    ie 10

    [modern]
    last 1 chrome version
    last 1 firefox version

    [ssr]
    node 12



