## 首先用如下命令（如未特别说明，所有命令均默认在Git Bash工具下执行）检查一下用户名和邮箱是否配置（github支持我们用用户名或邮箱登录）：

git config --global  --list

## 如未配置，则执行以下命令进行配置：

git config --global  user.name "这里换上你的用户名"
git config --global user.email "这里换上你的邮箱"

然后执行以下命令生成秘钥：---生成的密钥可以多方使用；在linux登陆中也是同一个密钥

ssh-keygen -t rsa -C "这里换上你的邮箱"

 cat ~/.ssh/id_rsa.pub 复制其中的密钥

 ## 最后填入github 的配置中；