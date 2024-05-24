## docker 学习教程

在线学习网站：https://docker-practice.github.io/

### 基本知识点

- 1. 容器化概念：Docker使用容器来隔离和运行应用程序及其依赖项。容器是一个独立、可移植且自包含的运行环境。

- 2. Docker镜像：镜像是构建容器的基础，它是一个只读模板，包含了运行应用程序所需的文件系统、软件环境和依赖项。

- 3. Docker容器：容器是基于镜像创建的运行实例，可以被启动、停止、删除等。容器提供了一个隔离的运行环境，使应用程序能够在不同的平台上以相同的方式运行。

- 4. Dockerfile：Dockerfile是一个文本文件，用于定义如何构建Docker镜像。通过编写Dockerfile，可以指定基础镜像、添加软件包、复制文件、设置环境变量等。

- 5. Docker仓库：Docker仓库是存储和分享Docker镜像的地方。公共仓库Docker Hub是最常用的，还可以搭建私有仓库来管理自己的镜像。

- 6. Docker网络：Docker提供了多种网络模式，用于连接和通信容器。这些网络模式包括桥接网络、主机网络、覆盖网络等，可以根据应用程序的需求选择适当的网络配置。

- 7. Docker卷：Docker卷是持久化存储数据的一种机制。通过挂载卷到容器中，可以实现数据在容器之间的共享和持久化。

- 8. Docker Compose：Docker Compose是一个工具，用于定义和管理多个容器组成的应用程序。它使用YAML文件来描述应用程序的配置、服务之间的依赖关系等。

## 常用命令

### 镜像操作

1. 搜索镜像：`docker search <image_name>`，用于在Docker Hub上搜索可用的镜像。

2. 下载镜像：`docker pull <image_name>`，用于从Docker Hub下载指定名称的镜像。

3. 列出本地镜像：`docker images`，显示所有已经下载到本地的镜像列表。

4. 创建镜像：可以通过编写Dockerfile文件并使用`docker build`命令来创建自定义的镜像。

5. 运行容器：`docker run <image_name>`，根据镜像创建并启动一个新容器。

6. 删除镜像：`docker rmi <image_name>`，删除本地的指定镜像。

7. 标记镜像：`docker tag <source_image> <target_image>`，为镜像添加标签，用于指定不同的版本或者特定的标识。

8. 导出和导入镜像：`docker save <image_name> -o <output_file.tar>`，用于将镜像保存为Tar文件；`docker load -i <input_file.tar>`，用于从Tar文件导入镜像。

### 容器的操作


1. 创建容器：使用`docker run`命令创建一个容器，指定要运行的镜像名称或ID。
 
2. 列出容器：使用`docker ps`命令列出所有正在运行的容器。

3. 启动和停止容器：使用`docker start`命令启动已创建但停止的容器，使用`docker stop`命令停止正在运行的容器。

4. 进入容器：使用`docker exec`命令在正在运行的容器中执行命令。

5. 删除容器：使用`docker rm`命令删除一个或多个容器。

6. 查看容器日志：使用`docker logs`命令查看容器的日志输出。

7. 导入和导出容器：使用`docker export`命令将容器保存为tar文件，使用`docker import`命令从tar文件导入容器。
