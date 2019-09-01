export default {
  query:{
    title: '数据明细信息',
    data: {
      typeValue: 'region_name',
      tableDimensionTypeList: [{name:"大区",value:"region_name"},{name:"分部",value:"department_name"},{name:"门店",value:"outlet_name"},{name:"品类",value:"category_name"},{name:"品牌",value:"brand_name"},    {name:"型号",value:"sku_name"}]
    },
    template: () => import(/* webpackChunkName: "layout"*/ './query'),
    submit(data, row, allInfo, $set){
      // 下载操作
      console.log(data, row, allInfo, $set)
    }
  },
  api: {
    // 获取明细信息
    getDetailInfo(row, all){

      let params = {
        "offset":(row.content.data.page.currentPage-1)*row.content.data.page.pageSize,
        "pageSize":row.content.data.page.pageSize,
        searchParam: {}
      }
      row.content.data.sortName && (params.sortName = row.content.data.sortName)
      row.content.data.reverse && (params.reverse = row.content.data.reverse)
      params.searchParam.extParam = {
        dimensionType: row.query.data.typeValue
      }
      params.searchParam.extParam.nmType = all.charts.query.data.nmType

      // 获取其它参数信息
      Object.assign(params.searchParam, all.conditions.api.getParams(all))

      let configData = row.content.data
      configData.loading =  true
      window.$ajax.scale.detailInfo(params).then(res=>{
        configData.loading =  false
        configData.page.total = res.data.total
        configData.tableData = res.data.list
        configData.column = [{
          field: 'name',
          label: '大区',
          sortable: true,
          fixed: true,
          width: 150
        },{
          field: 'money1',
          label: '销售收入(万元)',
          sortable: true,
          width: 150
        },{
          field: 'money2',
          label: '去年销售收入(万元)',
          width: 150,
          sortable: true,
        },{
          field: 'name',
          label: '增长率',
          width: 150
        },{
          field: 'opermoney1',
          label: '经销',
          sortable: true,
          width: 150
        },{
          field: 'name',
          label: '经销占比',
          width: 150
        },{
          field: 'opermoney2',
          label: '代销',
          sortable: true,
          width: 150
        },{
          field: 'name',
          label: '代销占比',
          width: 150
        },{
          field: 'purmoney1',
          label: '集采',
          sortable: true,
          width: 150
        },{
          field: 'name',
          label: '集采占比',
          width: 150
        },{
          field: 'purmoney2',
          label: '地采',
          sortable: true,
          width: 150
        },{
          field: 'name',
          label: '地采占比',
          width: 150
        }]
      })
    }
  },
  fetch: {
    init(row, all){ // 第一次请求
      // 需要处理请求参数数据
      row.api.getDetailInfo(row, all)
    }
  },
  content: {
    data: {
      loading: false,
      page:{              // 设置后 显示分页
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      // border: false,      // 是否带有纵向边框； 默认false
      // columnIndex: [0,1], // 分隔线 列的索引
      size: 'mini',       // 表格尺寸大小  medium/small/mini; 默认small
      column: [],
      tableData: []
    },
    template: 'BiTable',
    submit(data, row, all){  // data, row, all, $set
      // 需要处理请求参数数据
      row.api.getDetailInfo(row, all)
    }
  },
  listener(area, newObj, oldObj, row, all){  // 参数：area, newObj,oldObj, row, all, $set
    if(area == 'bar'){
      if(newObj.typeValue != oldObj.typeValue){
        if(row.content.data.page.currentPage != 1){
          // 改变当前页码 或 每页显示条数时 触发sumbit的请求
          row.content.data.page.currentPage = 1
        }else{
          // 需要处理请求参数数据
          row.api.getDetailInfo(row, all)
        }
      }
    }
  }
}