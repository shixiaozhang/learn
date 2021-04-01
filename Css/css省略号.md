<!--
 * @Author: your name
 * @Date: 2021-03-30 14:15:28
 * @LastEditTime: 2021-03-30 14:19:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \data-admin-spa\css省略号.md
-->
# 首先标签结构：

   <div class="body">
        <div class="box">
            <div class="p">213132131413132</div>
        </div>
    </div>
    
    
# css样式：

    .body {
            width: 300px;
            height: 500px;
            display: flex; //关键外盒子要是flex才能随着内容显示省略号；
        }
        .box {
            min-width: 0; //必写的关键；
            height: 50px;
            background: pink;
            position: relative;
        }
        .p {
            max-width: 100%;

            <!-- 省略号的实现 -->

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }