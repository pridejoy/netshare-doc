# Docker

## 安装
在 CentOS 上安装 Docker 可以按照以下步骤进行：

1. 安装依赖项

   ```bash
   sudo yum install -y yum-utils device-mapper-persistent-data lvm2
   ```

2. 添加 Docker 的软件仓库

   ```bash
   sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
   ```

3. 安装 Docker

   ```bash
   sudo yum install docker-ce docker-ce-cli containerd.io
   ```

4. 启动 Docker 服务

   ```bash
   sudo systemctl start docker
   ```

5. 设置 Docker 开机自启

   ```bash
   sudo systemctl enable docker
   ```

6. 检查 Docker 是否正确安装

   ```bash
   sudo docker run hello-world
   ```

如果一切正常，你应该看到 "Hello from Docker!" 的输出信息。 


## 常用命令 

1. 镜像相关命令：

   - `docker images`：列出本地主机上的镜像。
   - `docker pull <image-name>`：从 Docker 镜像仓库中拉取指定的镜像。
   - `docker push <image-name>`：将本地的镜像推送到 Docker 镜像仓库。
   - `docker rmi <image-name>`：删除指定的镜像。

2. 容器相关命令：

   - `docker run <image-name>`：创建并启动一个新的容器。
   - `docker start <container-id>`：启动已经创建但处于停止状态的容器。
   - `docker stop <container-id>`：停止正在运行的容器。
   - `docker restart <container-id>`：重启容器。
   - `docker rm <container-id>`：删除指定的容器。
   - `docker ps`：列出当前正在运行的容器。
   - `docker ps -a`：列出所有的容器，包括停止状态的容器。
   - `docker exec -it <container-id> <command>`：在正在运行的容器中执行命令。
   - `docker logs <container-id>`：查看容器的日志信息。

3. 网络相关命令：

   - `docker network ls`：列出当前存在的网络。
   - `docker network create <network-name>`：创建一个新的网络。
   - `docker network connect <network-name> <container-id>`：将容器连接到指定的网络。
   - `docker network disconnect <network-name> <container-id>`：将容器从指定的网络中断开连接。

4. 数据卷相关命令：

   - `docker volume ls`：列出当前存在的数据卷。
   - `docker volume create <volume-name>`：创建一个新的数据卷。
   - `docker volume inspect <volume-name>`：显示指定数据卷的详细信息。
   - `docker volume rm <volume-name>`：删除指定的数据卷。

