# linux安装node和npm cnpm yarn
## 下载安装包
**可选择自己喜欢的目录，不选就是根目录**

wget 下载链接

## 解压文件：

**解压的方式有多种**

tar xvf 下载的文件名

## 重命名node文件夹：

mv 加压的文件夹 nodejs

## 可以去 nodejs下的bin目录下 运行./node -v 查看版本号

## 建立全局的软链接：

**node**
ln -s /nodejs/bin/npm /usr/local/bin/node 
**npm**
ln -s /nodejs/bin/node /usr/local/bin/node

## 运行node -v 和npm -v测试是否成功：

## 安装cnpm 和yarn

### cnpm
全局安装cnpm：
 npm install -g cnpm --registry=https://registry.npm.taobao.org
结果：
/root/node/bin/cnpm -> /root/node/lib/node_modules/cnpm/bin/cnpm
+ cnpm@6.2.0
added 700 packages from 975 contributors in 29.497s

**要注意安装完成的提示信息，/root/node/bin/cnpm是你安装的目录，**
建立全局软链：
ln -s /root/node/bin/cnpm /usr/local/bin/cnpm 

### yarn

全局安装yarn：
npm install yarn -g

/root/node/bin/yarn -> /root/node/lib/node_modules/yarn/bin/yarn.js
/root/node/bin/yarnpkg -> /root/node/lib/node_modules/yarn/bin/yarn.js
+ yarn@1.22.10
added 1 package in 3.006s

**要注意安装完成的提示信息，/root/node/bin/yarn 是你安装的目录，**
建立全局软链：
ln -s /root/node/bin/yarn /usr/local/bin/yarn 
ln -s /root/node/bin/yarnpkg /usr/local/bin/yarnpkg 
 最后验证cnpm 和yarn