# NVM快速切换NodeJS版本

## 一、前言
在我们的日常开发中经常会遇到手上好几个项目，每个项目运行的环境也不一样，不同项目必须依赖不同版的 NodeJS 运行环境。每一个问题的提出总得有解决的办法，于是NVM应运而生。今天小编就带着大家揭开NVM神秘的面纱，如果对大家有帮助，大家记得点赞关注，不错过每一篇干货。
## 二、认识NVM
NVM(NodeJS Version Management)是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。
## 三、安装
在安装前一定要卸载已安装的 NodeJS，否则会发生冲突。
### Windows 安装
下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 最新安装包，直接安装即可。


## 四、安装不同版本Node/Npm
记得在安装前卸载安装的NodeJS,避免安装后出错

#### 4.1、查看本地安装的所有版本；有可选参数available，显示所有可下载的版本。
```
nvm list [available]
```

#### 4.2、安装，命令中的版本号可自定义，具体参考命令1查询出来的列表
```
nvm install 14.15.4
```

#### 4.3、使用特定版本
```
nvm use 14.15.4
```

#### 4.4、卸载
```
nvm uninstall 14.15.4
```

#### 4.5、你可以通过以下命令来列出远程服务器上所有的可用版本

OS X/Linux

```
nvm ls-remote
```


Windows

```
nvm ls available
```

## 五、常用命令

#### 5.1 切换版本到14.15.4
```
nvm use 14.15.4
```

####  5.2 切换到最新版
```
nvm use node
```

#### 5.3 设置别名为current-version

```
nvm alias current-version 14.15.4
```

#### 5.4 取消别名
```
nvm unalias current-version
```

#### 5.5 设置 default 这个特殊别名
```
nvm alias default node
```

>作者：答神
>
>链接：https://juejin.cn/post/6982863994885242910
>
>来源：稀土掘金
>
>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。