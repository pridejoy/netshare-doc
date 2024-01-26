# Redis

## 安装 Redis

### MacOS / Linux

如果你使用的是 MacOS 或 Linux 系统，可以通过以下命令进行安装：

```bash
# 使用 Homebrew 安装
brew install redis

# 或者使用 apt-get 安装（Debian/Ubuntu）
sudo apt-get update
sudo apt-get install redis-server
```

### Windows

windows版本readis下载（GitHub）：

https://github.com/tporadowski/redis/releases （推荐使用）

https://www.alipan.com/s/nPGuvvs3YB7 （阿里云盘-Redis-x64-5.0.14.1.mis）

https://www.alipan.com/s/amShuVEGpqf  （阿里云盘-桌面可视化-Another-Redis-Desktop-Manager.1.5.2.exes）

https://github.com/MicrosoftArchive/redis/releases

官网下载（无Windows版本）： https://redis.io/download

Redis中文网站： http://www.redis.cn

所有版本这里都有：https://download.redis.io/releases/

（下载后是个Linux的压缩文件，需要下载、解压和编译）
 
如果你使用的是 Windows 系统，可以从 Redis 官方网站 下载最新的 Windows 版本并按照提示进行安装。

## 配置 Redis

安装完成后，Redis 的默认配置文件位于 `/etc/redis/redis.conf`（MacOS / Linux）或 `C:\Program Files\Redis\redis.windows.conf`（Windows）。你可以根据需要修改该文件中的配置。

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
bind 127.0.0.0        # 监听地址，仅接全部的 IP 地址，不指定则默认为 127.0.0.1，表示只允许本机的连接
port 6379             # 监听端口，默认为 6379

# 连接设置
tcp-backlog 511       # TCP 连接队列长度
timeout 0             # 客户端闲置超时时间，0 表示禁用
tcp-keepalive 300     # TCP 连接的 keepalive 时间间隔，单位为秒

# 日志设置
logfile /log/redis/redis.log    # 日志文件路径
loglevel notice                     # 日志级别

# 数据库设置
databases 16          # 数据库数量，默认为 16

# 快照持久化设置
save 900 1            # 在 900 秒内如果有至少 1 个修改操作，则创建快照
save 300 10           # 在 300 秒内如果有至少 10 个修改操作，则创建快照
save 60 10000         # 在 60 秒内如果有至少 10000 个修改操作，则创建快照
stop-writes-on-bgsave-error yes     # 如果快照创建失败，是否停止写入操作

# AOF 持久化设置
appendonly no         # 是否开启 AOF 持久化，默认为关闭
appendfilename "appendonly.aof"    # AOF 文件名
appendfsync everysec  # 每秒钟将 AOF 缓冲区写入磁盘一次
no-appendfsync-on-rewrite no        # 是否在 AOF 重写时禁止 fsync，默认为否

# 安全设置
requirepass foobared  # 设置连接密码

# 主从复制设置
slaveof 127.0.0.1 6380    # 设置当前服务器为主服务器的从服务器

# 集群模式设置
cluster-enabled yes         # 是否开启集群模式，默认为关闭
cluster-config-file nodes.conf     # 集群配置文件路径

# 其他设置
maxclients 10000        # 最大客户端连接数限制
maxmemory 1gb           # Redis 最大使用内存容量

```