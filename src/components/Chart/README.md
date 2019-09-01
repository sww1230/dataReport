# 图形

### 功能描述

> 图形展示形式

### 安装依赖

```
npm install @gome/chart
```

### main.js中引入及注册组件

```
import Chart from '@gome/chart'
Chart.install(Vue)
```

### 图形配置时加入

```
content:{
  template: 'Chart'
}
 ```

### 依赖数据说明

 ```
 content:{
   data: {
     chart: 've-line',   // v-chart的图形组件名称
     dataEmpty: true,    // true: 提示暂无数据
     loading: false,     // 加载; 默认false
     height: '300px',    // 图形高度默认300px
     chartSettings: {}   // 参考v-chart
     columns: [],        // ...
     rows: [],           // ...
     grid: {},           // ...
     dataZoom: [],       // ...
     chartExtend: {}     // ...
   }
 }
```

### 示例配置文件请参考

/node_modules/@gome/chart/configData.js配置文件
