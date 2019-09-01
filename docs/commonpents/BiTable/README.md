# 表格

### 功能描述

> 表格渲染：1筛选条件查询；2表格内容；3分页；4排序请求；

### 安装依赖

```
npm install @gm/bi-table
```

### main.js中引入及注册组件

```
import BiTable from '@gm/bi-table'
BiTable.install(Vue)
```

### 数据配置

```
{
  data: {
    query:{              // 表格的查询筛选表单配置
      data:{             // 筛选表单依赖的数据
        input: ''
      },
      template: () => import(/* webpackChunkName: "layout"*/ './query'),  // 筛选表单模板
    },
    page:{              // 设置后 显示分页
      currentPage: 2,
      pageSize: 5,
      total: 100
    },
    loading: false,     // 加载
    border: false,      // 是否带有纵向边框； 默认false
    columnIndex: [0,1], // 分隔线 列的索引
    size: 'mini',       // 表格尺寸大小  medium/small/mini; 默认small
    column: [{          // 表格头的配置数据
      field: 'date',          // 对应内容数据的字段名称
      label: '',              // 表格头部显示字样
      width: '600',           // 设置列的宽度 默认平均分布
      align: 'center',        // 对齐方式 left/center/right； 默认居左
      fixed: true             // 列是否固定在左侧或者右侧，true 表示固定在左侧; true, left, right
      sortable: true          // 排序请求数据 会触发submit方法, ******data会增加两个参数：reverse: "true"，sortName: "fieldName"
    },{
      label : '嵌套',
      align: 'center',
      column: [{              // column可以嵌套
        field: 'name',
        label: '姓名',
        align: 'center'
      },{
        field: 'address',
        label: '地址',
        template: `<el-button @click='submit(scope.row)'  style="padding:0 10px;" round>{{scope.row.name}} - {{scope.row.date}}</el-button>`
      }]
    }],
    tableData: [{             // 表格内容数据
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }]
  },
  template: 'BiTable',      // 使用BiTable组件作为模板
  submit(data, row, allInfo, $set){     // 查询、分页、排序(data增加两个参数reverse|sortName)....，触发事件
    console.log(data, row, allInfo, $set)
  }
}
 ```

### 内置 回调方法说明

```
@submit 
 ```


 ### 示例配置文件请参考

```
/node_modules/@gm/BiTable/configData.js  配置示例文件
```