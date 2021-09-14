## 背景
在项目里面使用大量的相对路径 ../../../, 看起来真的不好看，也不优雅，webpack给我们提供了~ 去解决这个问题

## 方法

    const resolvePath = (dir) => {
        return path.resolve(__dirname, '../', dir);
    };

    // 在alias中配置静态资源路径的别名
    alias: {
        'assets': resolvePath('src/assets') // 配置静态资源路径
    }

// 引用的例子
    <template>
        <img src="~assets/xxx.png" />
    </template>
    <script>
        import img from 'assets/xxx.png';
    </script>
    <style>
        .logo {
            background: url(~assets/xxx.png)
        }
    </style>

