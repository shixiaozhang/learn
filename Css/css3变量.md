
CSS中原生的变量定义语法是：--*，变量使用语法是：var(--*)，其中*表示我们的变量名称。关于命名这个东西，各种语言都有些显示，例如CSS选择器不能是数字开头，JS中的变量是不能直接数值的，但是，在CSS变量中，这些限制通通没有，例如：

    :root{
        --main-bg-color: #000;
    }
    .element {
        background-color: var(--main-bg-color);
    }

## css变量在js中的应用

看如下例子，html代码：

<div id="jsDom">这是一段文字</div>

css代码：

    #jsDom {
        --my-varwidth: 200px;
        background-color: #000;
        color:#fff;
        width:var(--my-varwidth);
        height:200px;
    }
    
js代码：

    var element = document.getElementById('jsDom');
    var curWidth = getComputedStyle(element).getPropertyValue("--my-varwidth");
    console.log(curWidth); //200px

//设置过后该DOM元素的宽度变为了300px
element.style.setProperty("--my-varwidth", '300px');
如果样式是写到行间呢？那么进行如下操作：

html代码：

<div id="jsDom" style="--my-varwidth:400px;width:var(--my-varwidth);">这是一段文字</div>

js代码：

    var element = document.getElementById('jsDom');
    var curWidth = element.style.getPropertyValue("--my-varwidth");
    console.log(curWidth); //400px


    


// 设置变量
document.body.style.setProperty('--primary', '#7F583F'); //局部
document.documentElement.style.setProperty('--primary', '#7F583F'); //全局

// 读取变量
document.body.style.getPropertyValue('--primary').trim(); /局部
document.documentElement.style.getPropertyValue('--primary').trim(); /全局
getComputedStyle(document.documentElement).getPropertyValue('--time'); // 全局，如果是在css表中设置的需要这种方式获取
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary'); //局部
document.documentElement.style.removeProperty('--primary'); //全局