# 在 PowerShell 命令行下：（window下缺少python环境）
npm install --global --production windows-build-tools
安装完成后：
进入python安装目录：python -V 测试安装时候成功；
添加python的环境变量：
PATH：增加python安装目录：
开一个新的cmd窗口：python -V
看python 时候能全局使用
如果不能使用：
调换我们的python环境变量和WindowsApps window商店的优先级；
确保我们的python环境变量高于 window商店的优先级；


C:\Users\DaFu\.windows-build-tools\python27
%USERPROFILE%\AppData\Local\Microsoft\WindowsApps