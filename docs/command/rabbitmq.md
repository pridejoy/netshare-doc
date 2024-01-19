# RabbitMQ


## CentOS上安装

在CentOS上安装RabbitMQ可以按照以下步骤进行操作：

1. 更新系统软件包：
   ```
   sudo yum update
   ```

2. 添加Erlang仓库：RabbitMQ是使用Erlang编写的，因此需要先安装Erlang。执行以下命令将Erlang仓库添加到系统中：
   ```
   sudo yum install epel-release
   ```

3. 安装Erlang：
   ```
   sudo yum install erlang
   ```

4. 添加RabbitMQ仓库：执行以下命令将RabbitMQ仓库添加到系统中：
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

5. 安装RabbitMQ：
   ```
   sudo yum install rabbitmq-server
   ```

6. 启动RabbitMQ服务：
   ```
   sudo systemctl start rabbitmq-server
   ```

7. 设置RabbitMQ开机自启：
   ```
   sudo systemctl enable rabbitmq-server
   ```

8. 检查RabbitMQ服务状态：
   ```
   sudo systemctl status rabbitmq-server
   ```

完成上述步骤后，您就成功在CentOS上安装了RabbitMQ。您可以使用`sudo rabbitmqctl status`命令来检查RabbitMQ的状态，并使用其他RabbitMQ命令来管理和配置RabbitMQ实例。
 

 ## Docker上安装