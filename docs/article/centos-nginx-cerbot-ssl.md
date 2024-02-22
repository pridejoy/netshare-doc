# CentOS上配合nginx 使用 Certbot 生成SSL证书


##  python2-certbot-nginx方式
在 CentOS 上安装 Certbot 并使用它来获取 Let's Encrypt SSL 证书的步骤：

1. 安装 Certbot：
   ```
   sudo yum install certbot python2-certbot-nginx
   ```

2. 配置 Nginx，将 `oss.hunji.xyz` 的 HTTP 网站配置如下：
   ```
   server {
       listen 80;
       server_name oss.hunji.xyz;

       client_max_body_size 10m;

       location / {
           proxy_pass http://127.0.0.1:9000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
       }
   }
   ```

3. 运行 Certbot 命令以获取 SSL 证书：
   ```
   sudo certbot --nginx -d oss.hunji.xyz
   ```
   如果您有多个域名，请使用 `-d` 参数指定它们。

4. 根据提示进行证书申请过程：
   - 输入您的邮箱地址以接收关于 SSL 证书到期的通知。
   - 同意 Let's Encrypt 的服务条款。
   - 选择是否共享您的邮箱地址以获取 Let's Encrypt 的其他提醒。
   - 等待 Certbot 与 Let's Encrypt 服务器通信验证您的域名并颁发证书。此过程可能需要几分钟，根据您的网络速度和服务器性能的不同可能需要更长时间。

5. Certbot 完成 SSL 证书配置后，它将自动更新您的 Nginx 配置文件，修改为以下内容：
   ```
   server {
       listen 80;
       server_name oss.hunji.xyz;
       return 301 https://$host$request_uri;
   }
   
   server {
       listen 443 ssl;
       server_name oss.hunji.xyz;

       ssl_certificate /etc/letsencrypt/live/oss.hunji.xyz/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/oss.hunji.xyz/privkey.pem;

       client_max_body_size 10m;

       location / {
           proxy_pass http://127.0.0.1:9000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
       }
   }
   ```

6. 检查 Nginx 配置并重启 Nginx：
   ```
   sudo nginx -t
   sudo systemctl restart nginx
   ```

现在，您的网站已经启用了 HTTPS 和 Let's Encrypt SSL 证书。请确保您的域名解析正确，并且服务器 80 端口和 443 端口可访问。


## Certbot的Nginx插件方式

如果您的Certbot工具没有内置的Nginx插件，您可以尝试以下方法来申请证书并配置Nginx服务器：

1. 安装Certbot的Nginx插件：
   ```
   sudo yum install certbot-nginx
   ```

   这将安装适用于Nginx的Certbot插件。

2. 执行Certbot命令来申请证书并配置Nginx服务器：
   ```
   sudo certbot --nginx -d wxapi.hunji.xyz
   ```

   这个命令使用了Nginx插件，它会自动配置Nginx服务器以使用新颁发的证书。

3. 完成证书申请后，证书和密钥文件将存储在Certbot的默认路径中。您可以根据需要将其移动到所需位置。

   - 证书路径：`/etc/letsencrypt/live/wxapi.hunji.xyz/fullchain.pem`
   - 密钥路径：`/etc/letsencrypt/live/wxapi.hunji.xyz/privkey.pem`

4. 配置Nginx使用新申请的证书。

   打开Nginx配置文件：
   ```
   sudo nano /etc/nginx/nginx.conf
   ```

   在配置文件中找到相关的虚拟主机块，并添加以下行来指定证书和密钥的路径：
   ```
   ssl_certificate /etc/letsencrypt/live/wxapi.hunji.xyz/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/wxapi.hunji.xyz/privkey.pem;
   ```

   保存并关闭文件。

5. 测试Nginx配置文件的有效性：
   ```
   sudo nginx -t
   ```

   如果返回“syntax is ok”和“test is successful”，则表示配置文件无误。

6. 重新加载Nginx服务以应用新的配置：
   ```
   sudo systemctl reload nginx
   ```

通过上述步骤，您应该能够成功申请证书并配置Nginx服务器。如果您仍然遇到问题，请检查Certbot版本并尝试更新或重新安装Certbot工具。



如果您在执行 `sudo certbot --nginx -d wxapi.hunji.xyz` 命令时收到 "The requested nginx plugin does not appear to be installed" 的错误消息，这意味着 Certbot 没有找到已安装的 Nginx 插件。

以下是一种解决方法：

1. 确保您的 Certbot 工具是最新版本：
   ```
   sudo certbot update
   ```

2. 安装 Certbot 的 Nginx 插件：
   ```
   sudo yum install python3-certbot-nginx
   ```

   或者如果您使用的是 CentOS 7，请使用以下命令：
   ```
   sudo yum install certbot-nginx
   ```

3. 使用安装了 Nginx 插件的 Certbot 来申请证书并配置 Nginx 服务器：
   ```
   sudo certbot --nginx -d wxapi.hunji.xyz
   ```

   这个命令会自动配置 Nginx 服务器以使用新颁发的证书。

如果上述步骤仍然无法解决问题，您可以尝试使用传统的方式来为您的域名申请证书。请参考 Certbot 的文档或第三方 ACME 客户端的文档，手动配置并获取证书，并将其应用到您的 Nginx 服务器中。

请注意确保您的系统与软件包存储库同步，并确保您使用了正确的软件包管理器和命令。根据您的操作系统和软件设置，可能会有所不同。

## 其他方式

https://docs.chat.tokengo.top/docs/dotnet/others/domain-name-add-ssl-certificate/