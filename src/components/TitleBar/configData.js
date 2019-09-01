export default {
  style:'border-bottom:1px solid #f1f1f1; padding:5px;',  // 边框样式
  query:{                   //  查询栏内容 配置
    title: '库存周转分析',    //  查询栏标题
    subBar: true,           //  是否为子标题栏
    fullScreenName: 'aabb', //  显示全屏的名称；不设置则不显示全屏按钮键
    data: {                 //  查询所需数据
      input: '',
      radio: 3,
      options: [{
        label: 11,
        value: 11
      }],
      value: 22
    },
    template: () => import(/* webpackChunkName: "layout"*/ './query'),   // 查询栏所需模板文件
    submit:(data, row, $set, allInfo)=>{                  //  模板里查询的按钮的回调事件
      data.radio = 9                 // 控制当前 查询区的其它字段
      row.content.data.radio = 9     // 按钮触发式 在查询区域 改变 内容区域的值
      console.log(data, row, $set, allInfo)
    }
  },
  listener(area, newVal,oldVal, row, $set, allInfo){  // 数据改变时 响应式监听 事件
    if(area == 'query'){     // 查询栏数据的监听
      // row.content.data.radio = 9              // 改变外围的数据
      allInfo.charts.content.data.radio = 9      // 改变外围的数据
    }
    if(area == 'content'){   // 内容区数据的监听
      allInfo.charts.query.data.radio = 9         // 改变外围的数据
      allInfo.conditions.content.data.radio = 9   // 改变外围的数据
      // row.query.data.radio = 3
    }
    console.log(area, newVal,oldVal, row, $set, allInfo)
  },
  content:{      // 内容区配置
    data: {      // 内容区所需的数据
      radio: 3,
      options: [{
        label: 11,
        value: 11
      }],
      value: 22
    },
    template: () => import(/* webpackChunkName: "layout"*/ './query'),  // 内容区模板
    submit:(data, row, $set, allInfo)=>{
      data.radio = 9        // 按钮触发式 在内容区域 改变 查询区域的值
      row.query.data.radio = 9
      console.log(data, row, $set, allInfo)
    }
  }
}