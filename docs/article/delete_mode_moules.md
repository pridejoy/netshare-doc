


## windows系统

### 方法一
 
直接在项目中使用npm的rimraf工具实现秒删（需要安装库）
```
rm -rf ./node_modules
```
## Linux系统
方法一：使用rm命令实现快速递归删除

```
rm -rf ./node_modules
```
方法二：直接在项目中使用npm的rimraf工具实现秒删（需要安装库）
```
npm install rimraf -g
 
rimraf node_modules
```
 
#### 参考来源
https://blog.csdn.net/RingoH/article/details/117957190