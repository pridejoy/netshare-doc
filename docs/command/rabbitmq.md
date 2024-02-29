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

Erlang下载地址:https://www.erlang.org/downloads

RabbitMQ下载地址:https://www.rabbitmq.com/download.html



## 开启可视化Web管理界面

 确保您已经安装并启动了 RabbitMQ 服务器 ，打开命令提示符（CMD）或 PowerShell。

使用 cd 命令切换到 RabbitMQ Server 的安装目录下的 sbin 子目录。通常情况下，RabbitMQ 默认安装在 C:\Program Files\RabbitMQ\sbin 目录下。

在 sbin 目录下，运行以下命令来启动 RabbitMQ 的管理插件：

```
rabbitmq-plugins enable rabbitmq_management
```

启动 RabbitMQ 服务：
```
rabbitmq-server start
```
在浏览器地址栏中输入 `http://localhost:15672/`，然后按 Enter 键。

 输入您的 RabbitMQ 用户名和密码来登录到管理界面。默认情况下，用户名为 `guest`，密码也为 `guest`。如果您已更改过用户名和密码，请相应地输入新的用户名和密码。

登录成功后，您将看到 RabbitMQ 的管理界面，您可以在这里监控和管理 RabbitMQ 服务器、交换机、队列等。



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


 
 ## RabbitMQ 基本概念 

1. **生产者（Producer）**：负责发送消息到RabbitMQ的应用程序。

2. **消费者（Consumer）**：从RabbitMQ中接收消息的应用程序。

3. **队列（Queue）**：消息的缓冲区，存储生产者发送的消息，消费者从中获取消息。

4. **交换机（Exchange）**：接收生产者发送的消息，并根据规则将消息路由到一个或多个队列。

5. **路由键（Routing Key）**：用于交换机将消息路由到特定队列的关键字。

6. **绑定（Binding）**：交换机和队列之间的关联关系，定义了消息的路由规则。

7. **消费者确认（Consumer Acknowledgements）**：消费者接收消息后向RabbitMQ发送确认，告知RabbitMQ该消息已被正确处理。

8. **持久化（Durability）**：队列和消息可以被设置为持久化，以确保在RabbitMQ服务器重启时不会丢失消息。

9. **虚拟主机（Virtual Host）**：逻辑隔离的消息代理环境，每个虚拟主机都有自己的用户、权限和资源。

10. **连接（Connection）**：应用程序与RabbitMQ服务器之间的TCP连接。 


## 资料

- [资料](/article/rabbitmq.html)