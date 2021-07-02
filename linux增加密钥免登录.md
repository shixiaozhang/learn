## 现在本地生成密钥，如果本地存在则 --直接复制到服务器

    ls -l ~/.ssh //查看本地是否存在密钥
    -rw-r--r--  1 Z  staff    45  7  2 21:18 config
    -rw-------  1 Z  staff  2602  7  2 00:34 id_rsa
    -rw-r--r--  1 Z  staff   570  7  2 00:34 id_rsa.pub
    -rw-r--r--  1 Z  staff   579  7  2 21:10 known_hosts
 ## 生成密钥
    ssh-keygen -t rsa -C  'your email@domain.com'

    -t 指定密钥类型，默认即 rsa ，可以省略
    -C 设置注释文字，比如你的邮箱，可以省略

生成过程中会提示输入密码两次，如果不想在使用公钥的时候输入密码，可以回车跳过；
密钥默认保存位置在 ~/.ssh 目录下，打开后会看到私钥文件 id_rsa 和公钥文件 id_rsa.pub；


## 复制公钥至服务器

使用 scp 命令将本地的公钥文件 id_rsa.pub 复制到需要连接的Linux服务器：

scp ~/.ssh/id_rsa.pub <用户名>@<ip地址>:/home/id_rsa.pub
1
如果修改了ssh默认连接端口的话，需要加上端口信息：

scp -P <端口号> ~/.ssh/id_rsa.pub <用户名>@<ip地址>:/home/id_rsa.pub
1
把公钥追加到服务器ssh认证文件中：

cat /home/id_rsa.pub >> ~/.ssh/authorized_keys

## 在vscode 中添加密钥位置的配置

Host Linux
  HostName 47.93.35.17
  User root
  IdentityFile ~/.ssh/id_rsa