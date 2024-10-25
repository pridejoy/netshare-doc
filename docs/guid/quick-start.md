# 快速开始

## 环境准备

确保你的环境满足以下要求：

- git: 你需要git来克隆和管理项目版本。安装教程
- NodeJS: >=18.0.0，推荐 18.19.0 或更高。[切换版本教程](/article/nvm)
- pnpm: >= 8.0.0，推荐最新版本。
- dotnet-sdk: >= 7.0.100，推荐最新版本。[下载地址](https://dotnet.microsoft.com/zh-cn/download)

## 代码获取

##### 从 Gitee 获取代码

```
git clone https://gitee.com/Pridejoy/MalusAdmin.git
```

##### 数据库文件

<https://gitee.com/Pridejoy/MalusAdmin/blob/master/doc/dbsql/20240611.sql>

## 运行

```
//依赖安装
pnpm i
//运行前端
pnpm run dev
```

## 注意事项

> [!CAUTION]
> 二级路由的名字应该:当前路由的父级路由的名字 + 当前路由的名字

|MenuName| RouteName | Component | Path|
| ------ | :-------: | ----|----|
|客户列表 | business_customer |view.business_calen |/business/calen
|三级路由 | business_customer_tree |view.business_calen_tree |/business/calen/tree
