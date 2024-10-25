# Linux的 常用操作命令

### 文件操作命令

1. **ls** - 列出目录内容

   ```bash
   ls -l /home/user # 以长列表格式列出/home/user目录下的内容
   ```

2. **cd** - 改变目录

   ```bash
   cd /etc # 切换到/etc目录
   ```

3. **cp** - 复制文件或目录

   ```bash
   cp /path/to/source.txt /path/to/destination.txt # 复制文件
   ```

4. **mv** - 移动或重命名文件

   ```bash
   mv oldfile.txt newfile.txt # 重命名文件
   ```

5. **rm** - 删除文件或目录

   ```bash
   rm -f file.txt # 强制删除file.txt
   ```

6. **touch** - 创建新文件或更新现有文件的时间戳

   ```bash
   touch newfile.txt # 创建一个新文件
   ```

7. **cat** - 查看文件内容

   ```bash
   cat file.txt # 显示file.txt的内容
   ```

### 包管理命令

8. **yum** - 包管理器

   ```bash
   yum install nano # 安装nano文本编辑器
   yum update # 更新所有已安装的包
   ```

9. **rpm** - 包管理器
RPM（Red Hat Package Manager）是一种广泛使用的包管理系统，最初由Red Hat公司开发

   ```bash
   rpm -ivh package.rpm # 安装rpm包
   rpm -qa | grep httpd # 查询所有已安装的包并过滤httpd
   ```

apt-get（Debian/Ubuntu）：安装、更新和删除软件包。
yum 或 dnf（Red Hat/CentOS/Fedora）：管理RPM软件包。
pacman（Arch Linux）：Arch Linux的软件包管理器。

> [!TIP]
>CentOS和Ubuntu是两种流行的Linux发行版，它们在包管理方式上有一些显著的不同。Ubuntu使用的是Debian系的包管理工具，而CentOS则使用的是Red Hat系的包管理工具。
>
>Ubuntu（以及Debian和其他一些基于Debian的发行版）使用的是.deb格式的软件包，主要的包管理工具是APT（Advanced Packaging Tool），其中包括apt-get、apt-cache和dpkg等命令行工具
。APT能够自动解决依赖关系，并且可以从命令行界面或者通过图形界面（如软件中心）进行软件的安装、更新和卸载。例如，使用apt-get install package_name来安装软件包，使用apt-get update来更新本地包数据库列表。
>
>CentOS使用的是RPM（Red Hat Package Manager）格式的软件包。在较新版本的CentOS中，yum已经被dnf所取代，作为主要的包管理工具
。dnf提供了更快的包管理操作和改进的依赖解析。在CentOS 7及以下版本中，通常使用的命令是yum install package_name来安装软件包，而CentOS 8及更高版本则使用dnf install package_name。同样，yum或dnf命令可以用来更新软件包，例如使用yum update或dnf upgrade。

### 网络配置命令

10. **ifconfig** - 配置或显示系统网络接口参数

    ```bash
    ifconfig eth0 # 显示eth0网络接口的配置
    ```

11. **ping** - 发送ICMP ECHO请求以测试网络连接

    ```bash
    ping www.google.com # 测试到www.google.com的连接
    ```

### 系统监控和管理命令

12. **top** - 实时显示系统进程信息

    ```bash
    top # 显示当前系统的进程信息
    ```

13. **free** - 显示内存使用情况

    ```bash
    free -h # 以易读的格式显示内存使用情况
    ```

14. **df** - 显示磁盘空间使用情况

    ```bash
    df -h # 以易读的格式显示磁盘空间使用情况
    ```

### 文件权限和所有权命令

15. **chmod** - 改变文件或目录的权限

    ```bash
    chmod 755 file.txt # 设置file.txt的权限为755
    ```

16. **chown** - 改变文件或目录的所有者

    ```bash
    chown user:group file.txt # 将file.txt的所有者改为user，组改为group
    ```

### 压缩和解压命令

17. **tar** - 打包、压缩或解压文件

    ```bash
    tar -cvzf archive.tar.gz /path/to/directory # 压缩目录
    tar -xvzf archive.tar.gz -C /path/to/extract # 解压到指定目录
    ```

### 磁盘管理命令

18. **fdisk** - 磁盘分区表操作

    ```bash
    fdisk /dev/sda # 管理/dev/sda磁盘的分区
    ```

### 系统信息命令

19. **uname** - 显示系统信息

    ```bash
    uname -a # 显示所有系统信息
    ```

### 权限提升命令

20. **su** - 切换到超级用户（root）

    ```bash
    su # 切换到root用户
    ```

21. **sudo** - 以超级用户权限执行命令

    ```bash
    sudo yum update # 以root权限更新软件包
    ```

### 日志管理命令

22. **tail** - 显示文件的最后几行

    ```bash
    tail -f /var/log/messages # 实时显示/var/log/messages文件的最后几行
    ```

23. **grep** - 搜索文本并打印匹配行

    ```bash
    grep 'error' /var/log/messages # 在/var/log/messages中搜索包含'error'的行
    ```
