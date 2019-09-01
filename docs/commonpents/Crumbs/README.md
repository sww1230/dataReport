# 面包屑

### 功能描述

> 面包屑加帮助文档信息

### 安装依赖

```
npm install @gm/crumbs
```

### main.js中引入及注册组件

```
import Test from '@gm/crumbs'
Test.install(Vue)
```

### 页面中使用方式

```
 <Crumbs
   :data="data"
   :info="info.crumbs || ''"
   @flod="$emit('flod')"
/>
 ```

### 依赖数据说明

 ```
 data: [{index: 1, name: '销售业绩'},{index: 2, name: '销售分析'}, ...]
 info: {
    icon: true, //是否显示icon
    title: '组件名称',
    time: '2019-08-14',         // 可选；显示数据上次更新时间：2019-08-14
    content: function || array  // 方法或数组，返回的数据：['22323','aaabb','ccdef23323']
 }
```

### 回调方法说明

```
@flod 触发父组件的折叠菜单导航的回调方法
 ```

### 示例配置文件请参考

/node_modules/@gm/crumbs/configData.js配置文件

### 父组件控制菜单的折叠展开方法

```
this.$refs.menu.flod()
```