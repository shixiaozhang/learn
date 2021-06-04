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


 git 安装配置：

  yum install git 

## 设置全局用户名和邮箱
git config --global user.email "813155893@qq.com"
git config --global user.name "zhangdafu12"

git config --global --list  //验证邮箱与GitHub注册时输入的是否一致

## 配置ssh 的公钥

ssh-keygen -t rsa -C "你的邮箱"

**一路回车，在出现选择时输入Y，再一路回车直到生成密钥 **


root@iZ2zefren2i6nrbon91yw0Z .ssh]#  ssh-keygen -t rsa -C "813155893@qq.com"

Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:Bmvwt9Op7yrS9qGcOLZ540Qz0LQgBTu4QMP1nAXteLw 813155893@qq.com
The key's randomart image is:
+---[RSA 3072]----+
|.o++o.+.         |
|.o.oo+oo         |
|o o o+B          |
|.. . = *         |
|.     O S        |
|     o E o .     |
|     .. + o      |
|    +=*o +       |
|   .+B=+++o      |
+----[SHA256]-----+

### 公钥的位置/root/.ssh/id_rsa.pub

打开id_rsa.pub文件：复制
[root@iZ2zefren2i6nrbon91yw0Z .ssh]# cat ./id_rsa.pub 

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQD9lji320qeLoW9kjHgSql+ONmFGPW2ANPcTcAbaTIjJL16HUQZlw2A4PVcdH79z+c5QHrKqF8m1Mp5a+OymbyulRBZJ4S0g5ddIwUwB0lNHe0yq3sLdEYfbRZPFaWlANyLvoCfSnIiEMo8dq2QasAvjlFMcjScqBxvJmxmzsdPMp6za0z+++XPVqrEaY3kz4TsGNX/wFSnC9y2qvHBXgRIah/zAU6FP7QieJhZy/y/hpoUq+BL4f0Cp0Lsxbv9lF9ugMsSbBCvw5PRRj9PMMQbdQv9TXe357ws30glfqwOV7FNmNgnNp4/vJK5odzCNrSfIXoswKFEK6L8xaaPZ7T8qTuNm2MiY8H9WKFSrEaab4XI7d4D2oKD2yCNhRDnHSF7W/odHNA1Bw9X9vl9L8zGmHiLbIN7JljINTN8bBrT53/pmIvo/rlNjJlaZ88TczKHf6Gy3+oxbR4WTUmhDnOkv+lSOTk4jNo+Vf7Rowv2dzkVvVzD+HCZkDztYdrExX0= 813155893@qq.com

**放到github上的SSH keys中**