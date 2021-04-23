<!--
 * @Author: your name
 * @Date: 2021-04-22 15:25:57
 * @LastEditTime: 2021-04-22 15:26:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learn\vue内网穿透配置.md
-->
vue-cli版本3.0的情况下修改vue.config.js的配置

module.exports = {
  devServer: {
    disableHostCheck: true
  }
}

修改host：
最后一行添加了127.0.0.1  你的域名