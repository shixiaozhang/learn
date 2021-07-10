file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。

url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。


url-loader 可以设置砝值，低于砝值的图片转为base64，当超过砝值调用file-loader 生成路径；在配置loader时直接配置url-loader、就可以了，不用在添加file-loader会自动调用

file-loader不仅仅针对图片还可以这对图片以外的字体什么的其他文件



{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
}