# Docker|速通教程

尚硅谷3小时速通Docker教程<https://www.bilibili.com/video/BV1Zn4y1X7AZ>

## 1.安装

- [使用 CentOS 7.9安装教程](/command/docker)

- **Windows 和 Mac：**
  访问 [Docker Desktop](https://www.docker.com/products/docker-desktop) 下载并安装。

## 2.基本概念

- **镜像（Image）：** 包含应用程序及其所有依赖项的只读模板。
- **容器（Container）：** 镜像的一个运行实例。
- **Dockerfile：** 定义镜像内容的文本文件。

## 3.常用命名

```
#查看运行中的容器
docker ps
#查看所有容器
docker ps -a
#搜索镜像
docker search nginx
#下载镜像
docker pull nginx
#下载指定版本镜像
docker pull nginx:1.26.0
#查看所有镜像
docker images
#删除指定id的镜像
docker rmi e784f4560448


#运行一个新容器
docker run nginx
#停止容器
docker stop keen_blackwell
#启动容器
docker start 592
#重启容器
docker restart 592
#查看容器资源占用情况
docker stats 592
#查看容器日志
docker logs 592
#删除指定容器
docker rm 592
#强制删除指定容器
docker rm -f 592
# 后台启动容器
docker run -d --name mynginx nginx
# 后台启动并暴露端口
docker run -d --name mynginx -p 80:80 nginx
# 进入容器内部
docker exec -it mynginx /bin/bash

# 提交容器变化打成一个新的镜像
docker commit -m "update index.html" mynginx mynginx:v1.0
# 保存镜像为指定文件
docker save -o mynginx.tar mynginx:v1.0
# 删除多个镜像
docker rmi bde7d154a67f 94543a6c1aef e784f4560448
# 加载镜像
docker load -i mynginx.tar 


# 登录 docker hub
docker login
# 重新给镜像打标签
docker tag mynginx:v1.0 leifengyang/mynginx:v1.0
# 推送镜像
docker push leifengyang/mynginx:v1.0
```

## 4.存储

在Docker中，数据持久化和共享可以通过两种不同的方式实现：目录挂载（Bind Mounts）和卷映射（Volumes）。下面我将解释这两种方式的区别：

1. **目录挂载（Bind Mounts）**:
   - 使用`-v`或`--mount`标志后跟宿主机上的路径和容器内的路径来实现。
   - 例如：`-v /app/nghtml:/usr/share/nginx/html`表示将宿主机上的`/app/nghtml`目录挂载到容器的`/usr/share/nginx/html`目录。
   - 这种方式允许容器直接访问宿主机上的文件系统，因此可以实现容器与宿主机之间的数据共享。
   - 目录挂载的文件和目录由宿主机上的完整路径引用，如果宿主机上的路径不存在，Docker不会自动创建它。

2. **卷映射（Volumes）**:
   - 使用`-v`标志后跟卷名和容器内的路径，但不指定宿主机上的路径。
   - 例如：`-v ngconf:/etc/nginx`表示创建一个名为`ngconf`的卷，并将其挂载到容器的`/etc/nginx`目录。
   - 这种方式由Docker管理卷的内容，卷的数据存储在`/var/lib/docker/volumes/`目录下，与宿主机的文件系统分离。
   - 卷映射提供了一种抽象层，使得容器数据的生命周期独立于容器本身，即使容器被删除，卷中的数据也不会丢失，除非显式地删除卷。
   - 卷可以被多个容器共享和重用，非常适合需要在多个容器之间共享数据的场景。

两种方式的选择取决于你的具体需求：

- 如果你需要容器能够访问宿主机上的特定目录，并且可能需要手动管理这些数据，那么目录挂载可能更适合。
- 如果你需要数据持久化，希望数据独立于容器生命周期，或者需要在多个容器之间共享数据，那么卷映射是更好的选择。

## 5.网络

容器可以运行在非标准端口上，但需要将容器端口映射到宿主机端口，以便外部访问。

例如，-p 8080:80将容器内的80端口映射到宿主机的8080端口。

用户可以创建自定义网络，这些网络可以是可路由的，允许容器在不同宿主机上通信。

自定义网络使用`docker network create`命令创建。

## 6.Dockerfile

创建一个名为 `Dockerfile` 的文件，内容如下：

```Dockerfile
# 使用官方的 Node.js 镜像
FROM node:14

# 创建和设置工作目录
WORKDIR /app

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制应用程序代码
COPY . .

# 暴露应用程序端口
EXPOSE 8080

# 启动应用程序
CMD ["node", "app.js"]
```

- **构建镜像：**

  ```sh
  docker build -t my-node-app .
  ```

- **运行容器：**

  ```sh
  docker run -d -p 8080:8080 my-node-app
  ```

## 7.Docker Compose

### 命令式安装

```
#创建网络
docker network create blog

#启动mysql
docker run -d -p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=123456 \
-e MYSQL_DATABASE=wordpress \
-v mysql-data:/var/lib/mysql \
-v /app/myconf:/etc/mysql/conf.d \
--restart always --name mysql \
--network blog \
mysql:8.0

#启动wordpress
docker run -d -p 8080:80 \
-e WORDPRESS_DB_HOST=mysql \
-e WORDPRESS_DB_USER=root \
-e WORDPRESS_DB_PASSWORD=123456 \
-e WORDPRESS_DB_NAME=wordpress \
-v wordpress:/var/www/html \
--restart always --name wordpress-app \
--network blog \
wordpress:latest
```

### compose.yaml

```
name: myblog
services:
  mysql:
    container_name: mysql
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_DATABASE=wordpress
    volumes:
      - mysql-data:/var/lib/mysql
      - /app/myconf:/etc/mysql/conf.d
    restart: always
    networks:
      - blog

  wordpress:
    image: wordpress
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_USER: root
      WORDPRESS_DB_PASSWORD: 123456
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress:/var/www/html
    restart: always
    networks:
      - blog
    depends_on:
      - mysql

volumes:
  mysql-data:
  wordpress:

networks:
  blog:
```

### Redis主从同步集群

```
#自定义网络
docker network create mynet
#主节点
docker run -d -p 6379:6379 \
-v /app/rd1:/bitnami/redis/data \
-e REDIS_REPLICATION_MODE=master \
-e REDIS_PASSWORD=123456 \
--network mynet --name redis01 \
bitnami/redis

#从节点
docker run -d -p 6380:6379 \
-v /app/rd2:/bitnami/redis/data \
-e REDIS_REPLICATION_MODE=slave \
-e REDIS_MASTER_HOST=redis01 \
-e REDIS_MASTER_PORT_NUMBER=6379 \
-e REDIS_MASTER_PASSWORD=123456 \
-e REDIS_PASSWORD=123456 \
--network mynet --name redis02 \
bitnami/redis
```

### 启动MySQL

```
docker run -d -p 3306:3306 \
-v /app/myconf:/etc/mysql/conf.d \
-v /app/mydata:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:8.0.37-debian
```
