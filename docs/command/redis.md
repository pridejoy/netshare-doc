# Redis

## 安装 Redis

###   Linux-Centos

在 CentOS 系统上安装 Redis 可以通过多种方式，以下是两种常见的安装方法：

####  使用包管理器（例如 yum） [推荐]

1. **更新包管理器**：
   ```sh
   sudo yum update
   ```

2. **安装 Redis**：
   ```sh
   sudo yum install redis
   ```

3. **启动 Redis 服务**：
   ```sh
   sudo systemctl start redis
   ```

4. **设置 Redis 开机自启**：
   ```sh
   sudo systemctl enable redis
   ```

5. **检查 Redis 服务状态**：
   ```sh
   sudo systemctl status redis
   ```

#### 编译安装[未测试]

1. **安装依赖**：
   Redis 需要一些依赖包，如 gcc、tcl 等。可以使用以下命令安装：
   ```sh
   sudo yum groupinstall "Development Tools"
   sudo yum install -y tcl
   ```

2. **下载 Redis**：
   访问 Redis 官网下载最新版本，或者使用 wget 命令：
   ```sh
   wget http://download.redis.io/redis-stable.tar.gz
   ```

3. **解压 Redis**：
   ```sh
   tar xzf redis-stable.tar.gz
   ```

4. **编译 Redis**：
   ```sh
   cd redis-stable
   make
   ```

5. **安装 Redis**（可选，将编译后的可执行文件安装到系统路径）：
   ```sh
   make install
   ```

6. **配置 Redis**：
   根据需要编辑 `redis.conf` 文件，通常位于 `/usr/local/etc/redis/redis.conf`。

7. **启动 Redis**：
   使用以下命令启动 Redis 服务：
   ```sh
   redis-server /usr/local/etc/redis/redis.conf
   ```

8. **设置 Redis 开机自启**：
   创建一个 systemd 服务文件，例如 `/etc/systemd/system/redis.service`，并添加以下内容：
   ```ini
   [Unit]
   Description=Redis In-Memory Data Store
   After=network.target

   [Service]
   User=redis
   Group=redis
   ExecStart=/usr/local/bin/redis-server /usr/local/etc/redis/redis.conf
   ExecStop=/usr/local/bin/redis-cli shutdown
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
   然后启用并启动服务：
   ```sh
   sudo systemctl enable redis.service
   sudo systemctl start redis.service
   ```

9. **检查 Redis 服务状态**：
   ```sh
   sudo systemctl status redis.service
   ```
 

### Windows

windows版本readis下载（GitHub）：

https://github.com/tporadowski/redis/releases （推荐使用）

https://www.alipan.com/s/nPGuvvs3YB7 （Redis-x64-5.0.14.1.mis）

https://www.alipan.com/s/amShuVEGpqf  （桌面可视化-Another-Redis-Desktop-Manager.1.5.2.exe）

官网下载（无Windows版本）： https://redis.io/download

Redis中文网站： http://www.redis.cn

所有版本这里都有：https://download.redis.io/releases/

 
 ### Docker

 https://www.runoob.com/docker/docker-install-redis.html


##  Redis 配置的文件
 
 
- 默认配置文件通常位于 `/etc/redis/` 目录下。
- 主配置文件可能是 `redis.conf`。
 
 
**查找配置文件**：
   如果不确定配置文件的位置，可以使用 `find` 命令搜索整个系统：
   ```sh
   find / -name redis.conf 2>/dev/null
   ```
 
 

安装完成后，Redis 的默认配置文件位于 `/etc/redis.conf`（ Linux）或 `C:\Program Files\Redis\redis.windows.conf`（Windows）。
可以根据需要修改该文件中的配置。

以下是一些常见的配置选项：

* `bind`: 设置 Redis 监听的 IP 地址，默认为 `127.0.0.1`（即本地回环地址）。
* `port`: 设置 Redis 监听的端口号，默认为 `6379`。
* `requirepass`: 设置 Redis 访问密码。如果启用了访问密码，客户端必须在连接 Redis 时提供正确的密码才能成功连接。
* `protected-mode` ：设置 Redis 保护模式。保护模式默认只允许本地连接，禁止外部访问。



## 配置外网访问

```
1.修改bind 选项，并修改为 bind 0.0.0.0。这样 Redis 就会监听所有网络接口上的连接。
2.修改protected-mode 选项，并修改为 no。这样，Redis 就会接受来自任何 IP 地址的连接。
3.修改防火墙,开启ip白名单
4.重启redis服务
service redis restart
service redis status
```
在修改完配置文件后，你需要重启 Redis 以使更改生效。

## 常用命令

以下是一些常用的 Redis 命令及其说明：

### 字符串命令

* `SET key value`: 设置指定键的值。
* `GET key`: 获取指定键的值。
* `DEL key`: 删除指定的键。
* `EXISTS key`: 检查指定的键是否存在。

示例：

```bash
# 设置键为 "mykey" 的值为 "Hello, Redis!"
SET mykey "Hello, Redis!"

# 获取键为 "mykey" 的值
GET mykey
# 输出：Hello, Redis!

# 检查键为 "mykey" 是否存在，返回 1 表示存在，0 表示不存在
EXISTS mykey
# 输出：1

# 删除键为 "mykey"
DEL mykey
```

### 哈希命令

* `HSET key field value`: 在哈希中设置字段的值。
* `HGET key field`: 获取哈希中指定字段的值。
* `HMSET key field value [field value ...]`: 在哈希中设置多个字段的值。
* `HMGET key field [field ...]`: 获取哈希中多个字段的值。

示例：

```bash
# 将哈希 "myhash" 中字段 "name" 的值设置为 "Alice"
HSET myhash name "Alice"

# 获取哈希 "myhash" 中字段 "name" 的值
HGET myhash name
# 输出：Alice

# 批量设置哈希 "myhash" 中多个字段的值
HMSET myhash age 20 gender female

# 批量获取哈希 "myhash" 中多个字段的值
HMGET myhash name age gender
# 输出：["Alice", "20", "female"]
```

### 列表命令

* `LPUSH key value [value ...]`: 将一个或多个值推入列表的左侧。
* `RPUSH key value [value ...]`: 将一个或多个值推入列表的右侧。
* `LPOP key`: 从列表的左侧弹出一个值。
* `RPOP key`: 从列表的右侧弹出一个值。

示例：

```bash
# 在列表 "mylist" 的左侧添加两个元素
LPUSH mylist "world" "hello"

# 在列表 "mylist" 的右侧添加一个元素
RPUSH mylist "Redis"

# 从列表 "mylist" 的左侧弹出一个元素
LPOP mylist
# 输出：hello

# 从列表 "mylist" 的右侧弹出一个元素
RPOP mylist
# 输出：Redis
```

### 集合命令

* `SADD key member [member ...]`: 将一个或多个成员添加到集合中。
* `SMEMBERS key`: 获取集合中的所有成员。

示例：

```bash
# 向集合 "myset" 中添加两个成员
SADD myset "apple" "banana"

# 获取集合 "myset" 中的所有成员
SMEMBERS myset
# 输出：["apple", "banana"]
```

### 有序集命令

* `ZADD key score member [score member ...]`: 将一个或多个成员添加到有序集中。

示例：

```bash
# 向有序集 "mysortedset" 中添加两个成员，分别为 "Alice"（分数为 90）和 "Bob"（分数为 80）
ZADD mysortedset 90 "Alice" 80 "Bob"
```

## 配置文件示例
```
# Redis 配置文件示例
 
# 监听地址和端口
bind 0.0.0.0  # 监听地址，仅接全部的 IP 地址，不指定则默认为 127.0.0.1，表示只允许本机的连接
port 6379

# 连接设置
tcp-backlog 511
timeout 0
tcp-keepalive 300

# 日志设置
logfile "C:/Program Files/Redis/redis.log"
loglevel notice

# 数据库设置
databases 16

# 快照持久化设置
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes

# AOF 持久化设置
appendonly no
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no

# 安全设置
requirepass "yourpassword"

# 其他设置
maxclients 10000
maxmemory 1gb

```