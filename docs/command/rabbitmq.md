# RabbitMQ


## CentOS上安装

在CentOS上安装RabbitMQ可以按照以下步骤进行操作：

#### 1. 更新系统软件包：
   ```
   sudo yum update
   ```

#### 2. 添加Erlang仓库：RabbitMQ是使用Erlang编写的，因此需要先安装Erlang。执行以下命令将Erlang仓库添加到系统中：
   ```
   sudo yum install epel-release
   ```

#### 3. 安装Erlang：
   ```
   sudo yum install erlang
   ```

#### 4. 添加RabbitMQ仓库：执行以下命令将RabbitMQ仓库添加到系统中：
   ```
   sudo tee /etc/yum.repos.d/rabbitmq.repo <<EOF
   [rabbitmq-server]
   name=rabbitmq-server
   baseurl=https://packagecloud.io/rabbitmq/rabbitmq-server/el/7/\$basearch
   enabled=1
   gpgcheck=0
   repo_gpgcheck=1
   gpgkey=https://packagecloud.io/rabbitmq/rabbitmq-server/gpgkey
   sslverify=1
   sslcacert=/etc/pki/tls/certs/ca-bundle.crt
   metadata_expire=300
   EOF
   ```

#### 5. 安装RabbitMQ：
   ```
   sudo yum install rabbitmq-server
   ```

#### 6. 启动RabbitMQ服务：
   ```
   sudo systemctl start rabbitmq-server
   ```

#### 7. 设置RabbitMQ开机自启：
   ```
   sudo systemctl enable rabbitmq-server
   ```

#### 8. 检查RabbitMQ服务状态：
   ```
   sudo systemctl status rabbitmq-server
   ```

完成上述步骤后，您就成功在CentOS上安装了RabbitMQ。您可以使用`sudo rabbitmqctl status`命令来检查RabbitMQ的状态，并使用其他RabbitMQ命令来管理和配置RabbitMQ实例。
 

## windows上安装

在 Windows 上安装 RabbitMQ 可以分为以下几个步骤：

1. 下载 Erlang：RabbitMQ 是使用 Erlang 语言编写的，因此需要先下载和安装 Erlang。可以从官方网站下载适合您的操作系统的 Erlang 安装程序并按照提示进行安装。

2. 下载 RabbitMQ：从 RabbitMQ 的官方网站下载适合您的操作系统的 RabbitMQ 安装程序。运行安装程序并按照提示进行安装。

3. 启动 RabbitMQ 服务：运行 RabbitMQ 安装目录下的 `sbin/rabbitmq-server.bat` 批处理文件启动 RabbitMQ 服务。

4. 配置 RabbitMQ：可以通过 RabbitMQ 提供的 web 界面进行配置。在浏览器中访问 `http://localhost:15672` 并使用默认的用户名和密码（guest/guest）登录。在管理界面中可以创建新的用户、虚拟主机、队列等。

5. 使用 RabbitMQ：可以使用 RabbitMQ 提供的客户端库与 RabbitMQ 进行交互。另外，也可以使用 RabbitMQ 提供的 web 界面发送和接收消息。

## 常用的 RabbitMQ 命令

- `rabbitmqctl status`：查看 RabbitMQ 服务当前状态。
- `rabbitmqctl start_app`：启动 RabbitMQ 应用程序。
- `rabbitmqctl stop_app`：停止 RabbitMQ 应用程序。
- `rabbitmqctl reset`：重置 RabbitMQ 节点。
- `rabbitmqctl list_users`：列出 RabbitMQ 中的所有用户。
- `rabbitmqctl add_user username password`：添加新用户。
- `rabbitmqctl delete_user username`：删除用户。
- `rabbitmqctl list_vhosts`：列出 RabbitMQ 中的所有虚拟主机。
- `rabbitmqctl add_vhost vhostname`：添加新虚拟主机。
- `rabbitmqctl delete_vhost vhostname`：删除虚拟主机。
- `rabbitmqctl set_permissions -p vhostname username ".*" ".*" ".*"`：为指定虚拟主机设置权限。


 