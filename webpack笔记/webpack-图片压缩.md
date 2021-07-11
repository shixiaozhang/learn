# 图片压缩

* 要求:基于 Node 库的 imagemin 或者 tinypng API 
  
* 使用:配置 image-webpack-loader
  
    rules: [{
        test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                },
            ],
    }]

    //或者
    rules: [{
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                            quality: 75
                        }
                    }
            },
        ],
    }]

## Imagemin的优点分析

* 有很多定制选项 

* 可以引入更多第三方优化插件，例如pngquant

* 可以处理多种图片格式


## Imagemin的png压缩插件的压缩原理

* pngquant: 是一款PNG压缩器，通过将图像转换为具有alpha通道(通常比24/32位PNG 文件小60-80%)的更高效的8位PNG格式，可显著减小文件大小。

* pngcrush:其主要目的是通过尝试不同的压缩级别和PNG过滤方法来降低PNG IDAT数据 流的大小。

* optipng:其设计灵感来自于pngcrush。optipng可将图像文件重新压缩为更小尺寸，而不 会丢失任何信息。

* tinypng:也是将24位png文件转化为更小有索引的8位图片，同时所有非必要的metadata 也会被剥离掉