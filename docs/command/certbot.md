# Certbot

Certbot 是一个用于自动化获取和安装 Let's Encrypt SSL 证书的工具。


它提供了一系列的命令来处理证书的整个生命周期，包括申请、安装、更新和撤销。

[CentOS上配合nginx 使用 Certbot 生成SSL证书](/article/centos-nginx-cerbot-ssl.md)

以下是一些常用的 Certbot 命令：

1. **申请证书**：
   ```bash
   certbot certonly
   ```
   这个命令用于申请一个新的证书。

2. **使用特定插件申请证书**：
   ```bash
   certbot certonly --standalone
   ```
   或者对于 Nginx：
   ```bash
   certbot --nginx
   ```
   使用 `--standalone` 或特定应用的插件（如 `--nginx`）来申请证书。

3. **安装证书**：
   通常申请证书后，Certbot 会自动安装证书文件。

4. **更新证书**：
   ```bash
   certbot renew
   ```
   这个命令用于更新即将到期的证书。

5. **设置证书自动更新**：
   ```bash
   certbot renew --quiet --no-self-upgrade
   ```
   这个命令可以设置为定时任务，如使用 crontab，以实现自动更新。

6. **查看证书状态**：
   ```bash
   certbot certificates
   ```
   列出所有由 Certbot 管理的证书及其状态。

7. **查看证书详细信息**：
   ```bash
   certbot show --cert-name CERT_NAME
   ```
   查看指定证书的详细信息。

8. **删除证书**：
   ```bash
   certbot delete --cert-name CERT_NAME
   ```
   删除一个由 Certbot 管理的证书。

9. **撤销证书**：
   ```bash
   certbot revoke --cert-path CERT_PATH
   ```
   撤销一个已颁发的证书。

10. **查看帮助信息**：
    ```bash
    certbot --help
    ```
    或者查看特定命令的帮助：
    ```bash
    certbot certonly --help
    ```

11. **使用非默认电子邮件地址**：
    ```bash
    certbot certonly --email YOUR_EMAIL --agree-tos --no-eff-email
    ```
    在申请证书时指定一个电子邮件地址。

12. **指定验证方式**：
    ```bash
    certbot certonly --preferred-challenges http-01
    ```
    指定首选的验证方式。

13. **使用 DNS 插件**：
    ```bash
    certbot certonly --dns-cloudflare --dns-cloudflare-credentials ~/.secrets/cloudflare.ini
    ```
    使用 DNS 插件进行证书申请，需要提供相应的认证文件。

14. **调试模式运行**：
    ```bash
    certbot certonly --standalone --debug
    ```
    在调试模式下运行 Certbot。

这些命令提供了 Certbot 的基本功能，但 Certbot 还支持许多其他选项和插件，可以根据具体需求进行配置。在使用之前，请确保阅读 Certbot 的官方文档，了解所有选项和插件的详细信息。