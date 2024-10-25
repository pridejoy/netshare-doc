
# Ngin命令


## 安装和使用

在 CentOS 上操作 Nginx 包括安装、启动、停止、重新加载配置等。

以下是在 CentOS 上操作 Nginx 的常用命令：


#### 1. 安装 Nginx
   
   ```
   sudo yum install nginx
   ```

#### 2. 启动 Nginx
   
   ```
   sudo systemctl start nginx
   ```
#### 3. 停止 Nginx
   
   ```
   sudo systemctl stop nginx
   ```
#### 4. 重新加载 Nginx 配置
   
   ```
   sudo systemctl reload nginx
   ```
#### 5. 重启 Nginx
   
   ```
   sudo systemctl restart nginx
   ```
#### 6. 查看 Nginx 状态
   
   ```
   sudo systemctl status nginx
   ```
#### 7. 开机自启动 Nginx
   
   ```
   sudo systemctl enable nginx
   ```
#### 8. 停止开机自启动 Nginx
   
   ```
   sudo systemctl disable nginx
   ```
#### 9. 直接重启nginx服务

```
sudo systemctl restart nginx.service
```

以上命令中，使用了 `systemctl` 来管理 Nginx 服务。在执行任何涉及到配置文件的操作（如重新加载配置、重启）之前，确保已经保存了修改的配置文件。

注意：在执行上述命令时，可能需要管理员权限。如果提示需要管理员权限，请使用 `sudo` 命令来运行相应的命令。

#### 注意

> 注意：监听的端口不要和本地的程序一个端口

```
server {
        listen 5002;
        server_name server5002;

        client_max_body_size 10m;

        location / {
            proxy_pass http://127.0.0.1:5003;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
```

### windos安装为服务
两种方法：https://www.cnblogs.com/xiangzhong/p/17945202


### 扩展

#### 申请ssl的证书
多个配置文件


#### 配置SignalR访问

```

    location /hub {
        proxy_pass http://webname ;  # 替换 http://webname 为您的实际 Web 服务地址

        # 解决 Nginx 504 问题
        # proxy_send_timeout 600; # 单位秒 默认60
        # proxy_read_timeout 600; # 单位秒 默认60
        # proxy_connect_timeout 600; # 单位秒 默认60

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host; 
    }
    
``` 