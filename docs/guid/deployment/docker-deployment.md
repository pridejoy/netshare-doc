
# Docker部署一个DotNet项目

在docker环境下部署dotnet web api 应用

## 第一步

在你的.NET 6项目根目录中创建一个名为"Dockerfile"的文件，内容如下：

```
# 设置运行环境为.NET 6 SDK
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env

# 设置工作目录
WORKDIR /app

# 将项目文件复制到工作目录
COPY *.csproj ./

# 安装项目依赖项
RUN dotnet restore

# 将所有文件复制到工作目录
COPY . ./

# 构建项目
RUN dotnet publish -c Release -o out

# 设置运行环境为.NET 6 Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# 设置工作目录
WORKDIR /app

# 复制发布的项目文件到工作目录
COPY --from=build-env /app/out .

# 设置容器运行时的入口点
ENTRYPOINT ["dotnet", "your-image-name.dll"]

```

注意替换"your-image-name"为你的项目名称。

## 第二步

在命令行中进入你的项目根目录，然后执行以下命令构建Docker镜像：

```
docker build -t your-image-name .
```

## 第三部

执行以下命令来运行Docker容器：

```
docker run -p 8000:80 your-image-name
```

这个命令会启动Docker容器，并将容器的80端口映射到主机的8000端口。

## 最后

打开你的浏览器，访问`http://localhost:8000`即可查看部署的.NET 项目
