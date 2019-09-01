export default {
  title: '汇总信息栏',
  api:{    // 调用时再触发 数据请求
    getInfo: function(row, params = {}){}
  },
  fetch:{  // 汇总信息的数据请求列表;  fetch立即执行 数据请求
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