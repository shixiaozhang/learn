/*
 * @Author: your name
 * @Date: 2021-04-25 18:08:03
 * @LastEditTime: 2021-04-25 18:11:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nextjs-blog\next.config.js
 */

module.exports = {
    //
    // http://jartto.wang/
    webpack: (config) => {
        // Perform customizations to webpack config
        config.node = {
            fs: 'empty'
        }

        return config
    }
}