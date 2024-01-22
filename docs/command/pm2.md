# PM2命令


## 常用命令
PM2是Node.js应用程序的进程管理器，它提供了应用程序的启动、监控、重启和部署的工具。

PM2提供了一系列命令用于管理应用程序的启动、停止、重启和监控。

以下是一些常用的PM2命令操作：

"app"是你要查看详情的应用程序的名称或者ID


#### 1. 启动应用程序
```
pm2 start app
```
#### 2. 停止应用程序
```
pm2 stop app
```
#### 3. 重启应用程序
```
pm2 restart app
```
#### 4. 查看应用程序状态
#### 5. 监控应用程序日志
```
pm2 logs app
```
#### 6. 监听应用程序文件变化并自动重启
```
pm2 start app --watch
```
#### 7. 设置应用程序在系统启动时自动启动
```
pm2 startup
```
#### 8. 删除应用程序
```
pm2 delete app
```
#### 9. 查看应用详情
```
pm2 show app
```

## 资料
Pm2官网：[https://pm2.io/](https://pm2.io/)

部署dotNet应用:[https://www.jianshu.com/p/92297695546c](https://www.jianshu.com/p/92297695546c)