# 布局layout

### 功能描述

> 根据数组结构生成，生成 flex box 布局

### 安装依赖

```
npm install @gm/layout
```

### main.js中引入及注册组件

```
import Layout from '@gm/layout'
Layout.install(Vue)
```

### 页面中使用方式

```
 <Layout :data="layout">
  <template slot-scope="data">
    <div>{{data.data}}</div>
  </template>
</Layout>
 ```

### 依赖数据说明

 ```
 data: [
  [{  // 第一行 里边一个块
    style:'border-bottom:1px solid purple;', // 最内侧div的样式
    content: 内容区展示的其它信息
  }],
  [{  // 第二行 里边二个块
    style:'border-right:1px solid purple; padding:20px;',// 最内侧div的样式
    content: 内容区展示的其它信息
  },{
    style:'padding:20px;', // 最内侧div的样式
    content: 内容区展示的其它信息
  }]
]
```

### 示例配置文件请参考

/node_modules/@gm/crumbs/configData.js配置文件

### slot插槽传递的数据data

```
<slot :data="row"></slot>

<template slot-scope="data">
  <div>{{data.data}}</div>
</template>
```