# 标题栏

### 功能描述

> 标题栏；
> 1. 标题栏查询搜索可设置query配置；
> 2. 主内容区可设置content配置;

### 安装依赖

```
npm install @gm/title-bar
```

### main.js中引入及注册组件

```
import TitleBar from '@gm/title-bar'
TitleBar.install(Vue)
```

### 页面中使用方式

```
<TitleBar :row="data" :info="info">
  <div>其它内容</div>
</TitleBar>
 ```

### 依赖数据说明

 ```
row:{
  style    // 设置标题栏区域块的样式
  query    // 设置查询栏内容 配置
  content  // 内容区配置
  listener // query及content数据的响应式监听事件
}
info:为所有配置数据
```

### 示例配置文件请参考

/node_modules/@gm/title-bar/configData.js配置文件

### 预留slot插槽

```
<slot></slot>

<template>
  <div>其它内容</div>
</template>
```