# 在Linux上使用PM2守护Dotnet应用


## pm2简介

PM2是一个Node.js的进程管理工具，可以帮助开发者简化Node.js应用的部署和运维。它提供了进程守护、负载均衡、日志管理等功能，可以监控应用程序的运行状态，并在发生意外情况时自动重启应用。PM2还支持多种部署方式，包括单机部署、集群模式和Docker容器部署，适用于各种规模的项目。通过PM2，可以更轻松地管理Node.js应用，提高应用的稳定性和可靠性。

## 安装

如果Node.js和npm 按安装过了直接执行下面命令就进行安装。 

> sudo npm install pm2 -g

验证pm2是否安装成功。在终端中执行以下命令`pm2 -v`

如果输出了PM2的版本号，则表示已经成功安装。

#### 安装Node.js和npm
安装Node.js和npm可以通过以下命令在Ubuntu系统中完成：
```
//1. 更新apt-get：
sudo apt-get update
//2. 安装Node.js和npm：
sudo apt-get install nodejs npm
//3. 验证Node.js和npm是否安装成功：
node -v
npm -v
```

如果分别输出了Node.js和npm的版本号，则表示安装成功。


## 部署

需要先cd到文件的目录下面，可以执行 dotnet  xxx.dll ，先查看程序的运行情况，然后根据情况执行

建议使用安装Net7版本，Net8的有一部分坑


### 依赖部署

```
pm2 start --name xxx dotnet -- xxx.dll
/// xxx 为pm2里面的名字
```

传递参数  加载命令后面即可  例如：

```
pm2 start --name wallpapernet dotnet -- Wallpaper.Net.WebApi.dll --urls=https://localhost:5003
```



### 配置文件部署【推荐】

新建js或者Json文件。推荐放到项目下面，把属性更改为复制。
```
{
  "apps": {
    "name": "miniapi",
    "script": "dotnet",
    "exec_mode": "fork",
    "error_file": "logs/err.log",
    "out_file": "logs/out.log",
    "merge_logs": true,
    "log_date_format": "YYYY-MM-DD HH:mm:ss",
    "min_uptime": "60s",
    "max_restarts": 30,
    "autorestart": true,
    "restart_delay": "60",
    "args": [
      "NetBlog.Web.Entry.dll",
      "--urls=http://*:5003"
    ],
    "env": {
      "ASPNETCORE_ENVIRONMENT": "Production"
    }
  }
}
```
更改name，和传递的参数，cd的项目目录下执行`pm2 start 文件名` 

示例：
>pm2 start pm2.json



<!-- ![](https://img2023.cnblogs.com/blog/1920368/202312/1920368-20231227172553123-797243249.png) -->




## 操作命令

 PM2提供了一系列命令用于管理应用程序的启动、停止、重启和监控。以下是一些常用的PM2命令操作：

"app"是你要查看详情的应用程序的名称或者ID


```
启动应用程序：pm2 start app
停止应用程序 pm2 stop app
重启应用程序 pm2 restart app
查看应用程序状态  pm2 status
监控应用程序日志  pm2 logs app
监听应用程序文件变化并自动重启  pm2 start app --watch
设置应用程序在系统启动时自动启动 pm2 startup
删除应用程序 pm2 delete app 
查看应用详情 pm2 show app 
列出应用程序 pm2 list
查看监控面板 pm2 monit
查看程序数据 pm2 show app
```

### 文档

pm2官方：https://pm2.keymetrics.io/docs/usage/quick-start/

中文文档：https://pm2.fenxianglu.cn/docs/start
