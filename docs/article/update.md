# 前端的卸载及更新

<https://vitepress.yiov.top/update.html>

## 更新

我更推荐用 npm-check-updates，即 ncu

NCU NPM是一个Node.js包管理器，它可以帮助开发人员轻松地安装和管理JavaScript库。

```
npm i -g npm-check-updates
```

ncu可以可以检查出需更新的软件包

```
ncu
```

## 更新

```
#即运行ncu -u to upgrade package.json
ncu -u
```

## 卸载

卸载就比较简单了，在 package.json 中找到包名即可

```
pnpm uninstall <包名>
yarn uninstall <包名>
bun uninstall <包名>
```
