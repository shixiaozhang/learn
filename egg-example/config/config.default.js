exports.keys ='zpc716241';

// 添加 view 配置
exports.view={
    defaultViewEngine:'nunjuks',
    mapping:{
        '.tpl':'nunjucks'
    }
}

exports.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };