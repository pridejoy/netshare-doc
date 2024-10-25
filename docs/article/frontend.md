# 前端工程化

前端学习攻略

## Vue3

<https://cn.vuejs.org/guide>

```js
pnpm create vue
```

#### 组件化

组件系统是一个抽象的概念；

- 组件：小型、独立、可复用的单元
- 组合：通过组件之间的组合、包含关系构建出一个完整应用

#### SFC

Vue 的单文件组件 (即 *.vue 文件，英文 Single-File Component，简称 SFC) 是一种特殊的文件格式，使我们能够将一个 Vue 组件的模板、逻辑与样式封装在单个文件中.

```vue
<script setup>
  //编写脚本
</script>

<template>
  //编写页面模板
</template>

<style scoped>
  //编写样式
</style>
```

## Vite

官网：<https://cn.vitejs.dev>
快速创建前端项目脚手架

##### 创建项目

``` js
pnpm create vite 项目名称
```

##### 运行

``` js
npm run dev #启动项目
```

##### 打包

``` js
npm run build #构建后 生成 dist 文件夹
```

## Vue-Router

文档：<https://router.vuejs.org/zh/guide/>

#### 理解路由

前端系统根据页面路径，跳转到指定组件，展示出指定效果
<img src="/images/vue-routh.png"  alt="Netshare">

``` js
 
npm create vite

```

## Pinia

 官网：<https://pinia.vuejs.org/zh/>

## Ant Design Vue
