# 卡片容器

### 功能描述

> 卡片容器 包裹其它组件使用; 承上启下 上下文数据连接的功能

### 安装依赖

```
npm install @gome/cardContainer
```

### main.js中引入及注册组件

```
import CardContainer from '@gome/cardContainer'
CardContainer.install(Vue)
```

### 页面中使用方式

```
<CardContainer :row="row" :info="info"></CardContainer>
 ```

### 依赖数据说明

 ```
 row: 配置文件中当前块的数据
 info: 所有配置数据，包含多个row
 ----------------------------------
  row数据详情：
  row: {
    title: '汇总信息栏',
    api:{    // 调用时再触发 数据请求
      getInfo: function(row, params = {}){}
    },
    fetch:{  // 汇总信息的数据请求列表
      getOpt: function(row, params = {}){   // 请求接口数据
        let o = []
        setTimeout(() => {
          o = [{
            value: '选项1',
            label: '黄金糕'
          }]
          row.query.data.options = o  // 给query.data.options赋值
        }, 4000);
        return o
      }
    },
    query: {                      // 卡容器右侧内容 查询条件的扩展
      data: {                     // 查询条件所依赖数据
        radio: 3,
        options:[],
        value: ''  
      },
      template: () => import(/* webpackChunkName: "layout"'*/ './query'),  // 查询模板，vue文件
      submit: (data, row, $set, allInfo)=>{ // 模板中按钮事件触发的事件
        row.fetch.getOpt(row, {})  // 再次请求接口
        console.log(data)
      }
    },
    listener(area, newVal, oldVal, row, $set, allInfo){  // 响应式监听触发
      // area: query|content
      if(area == 'query'){     // 筛选区数据监听
        if(newVal.value != oldVal.value){ // 改变值时触发
          console.log('执行query操作', newVal.value)
        }
      }
    }
  }
```

### 内置 回调方法说明

```
@submit 
 ```

### 内置 块容器的扩展，右侧展示的内容

```
<div v-if="row.query" class="flex-1 flex items-center">
   <component :is="row.query.template" :data="queryData" @submit="(data)=>row.query.submit && row.query.submit(data, row, $set, info)"></component>
 </div>
 ```

 ### 示例配置文件请参考

```
/node_modules/@gome/cardContainer/configData.js  配置示例文件
/node_modules/@gome/cardContainer/query.vue      右侧展示内容样例文件 
```