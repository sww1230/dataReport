export default {
  query:{
    title: '汇总信息'
  },
  api:{
    getTotalInfo (configData,all) {
      let params = {extParam:{}}
      params.extParam.nmType = all.charts.query.data.nmType

      // 获取其它参数信息
      Object.assign(params, all.conditions.api.getParams(all))
      
      configData.loading = true
      // 从all中可以拿到筛选的所有条件，拼成接口所需参数，请求
      
      window.$ajax.scale.totalInfo(params).then(res=>{
        configData.loading = false
        // 配置数据
        configData.column = [
          {field: 'name', label: '', align: 'center'},
          {field: 'val1', label: '考核销售收', align: 'center'},
          {field: 'val2', label: '综合贡献额(元)', align: 'center'},
          {field: 'val3', label: '综合贡献率', align: 'center'},
          {field: 'val4', label: '销售数量', align: 'center'},
          {field: 'val5', label: '平均单价', align: 'center'},
        ]
        configData.tableData = [{
          name: '查询区间',
          val1: res.data.money,
          val2: res.data.zhgx,
          val3: '-',
          val4: res.data.num,
          val5: '-'
        },{
          name: '去年同期',
          val1: res.data.lmoney,
          val2: res.data.lzhgx,
          val3: '-',
          val4: res.data.lnum,
          val5: '-'
        },{
          name: '增长率',
          val1: '-',
          val2: '-',
          val3: '-',
          val4: '-',
          val5: '-'
        }]
      })
    }
  },
  fetch: {
    init(row, all){ // 参数： row, all, $set
      let configData = row.content.data;
      row.api.getTotalInfo(configData, all)
    }
  },
  content: {
    data: {
      loading: false,
      size: 'mini',
      column: [],
      tableData: []
    },
    template: 'BiTable'
  }
}