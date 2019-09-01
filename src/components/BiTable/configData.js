export default {
  query:{
    title: '汇总信息',
    fullScreenName: 'xxdfwee'
  },
  fetch:{
    aa(row){
      setTimeout(() => {
        row.content.data.query.data.radio = 9
        row.content.data.page.currentPage = 3
      }, 4000);
    }
  },
  content: {
    data: {
      query:{              // 表格的查询筛选表单配置
        data:{             // 筛选表单依赖的数据
          input: '',
          radio: 3,
          options: [{
            label: 11,
            value: 11
          },{
            label: 22,
            value: 22
          },{
            label: 33,
            value: 33
          }],
          value: 22
        },
        template: () => import(/* webpackChunkName: "layout"*/ '../scale/query'),  // 筛选表单模板
      },
      page:{              // 设置后 显示分页
        currentPage: 2,
        pageSize: 5,
        total: 100
      },
      border: false,      // 是否带有纵向边框； 默认false
      columnIndex: [0,1], // 分隔线 列的索引
      size: 'mini',       // 表格尺寸大小  medium/small/mini; 默认small
      column: [{          // 表格头的配置数据
        field: 'date',        // 对应内容数据的字段名称
        label: '',            // 表格头部显示字样
        //width: '600',         // 设置列的宽度 默认平均分布
        align: 'center',      // 对齐方式 left/center/right； 默认居左
        //fixed: true           // 列是否固定在左侧或者右侧，true 表示固定在左侧; true, left, right
        sortable: true          // 排序请求数据
      },{
        label : '嵌套',
        align: 'center',
        column: [{
          field: 'name',
          label: '姓名',
          align: 'center'     
        },{
          field: 'date',
          label: '日期',
        },{
          field: 'address',
          label: '地址',
          template: `<el-button @click='submit(scope.row)'  style="padding:0 10px;" round>{{scope.row.name}} - {{scope.row.date}}</el-button>`
        }]
      },{
        field: 'address',
        label: '地址',
        template: `<el-button @click='submit(scope.row)'  style="padding:0 10px;" round>{{scope.row.name}} - {{scope.row.date}}</el-button>`
      }],
      tableData: [{       // 表格内容数据
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }]
    },
    template: 'BiTable',
    submit(data, row, allInfo, $set){
      console.log(data, row, allInfo, $set)
    }
  }
}