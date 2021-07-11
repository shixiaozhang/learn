module.exports = {
    "parser": "babel-eslint",//解析器
    "extends": "airbnb",// 继承的模板,多个可以写成数组
    "env": {//指定启用的环境；
        "browser": true,
        "node": true
    },
    "rules": {//自定义规则
        "indent": ["error", 4]
    }
};