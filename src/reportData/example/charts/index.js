export default {
  query: {   
    title: '销售分析',
    data: {
      nmType: 'money',
      nmTypeOptions: [{
        value: 'money',
        name: '考核销售收入'
      },{
        value: 'zhgx',
        name: '综合贡献'
      },{
        value: 'num',
        name: '销售数量'
      }]
    },
    template: () => import(/* webpackChunkName: "layout"*/ './querySalesAnalysis')
  },
  listener(area, newVal,oldVal,row, all){ // area, newVal,oldVal, row, all, $set
    // 监控 分析维度的值
    if(area == 'bar'){
      if(newVal.nmType != oldVal.nmType){

        // 同比分析
        row.layout[0][0].api.getAnalysisChart(row.layout[0][0], all)

        // 对比分析
        let contrastInfo = row.layout[1][0]
        contrastInfo.api.getContrastChart(contrastInfo.content.data, all)

         // 明细信息
        let tableInfo = all.table
        if(tableInfo.content.data.page.currentPage != 1){
          tableInfo.content.data.page.currentPage = 1
        }else{
          tableInfo.api.getDetailInfo(tableInfo, all)
        }
      }
    }
  },
  layout: [

    // 同比图形配置
    [{
      listener(area, newVal,oldVal, row){ // area, newVal,oldVal, row, allInfo, $set
        // 监控 对比分析栏的筛选条件：大区 分部 品类 品牌 型号
        if(area == 'bar'){
          if(newVal.moveNum != oldVal.moveNum){
            row.api.concatData(row, newVal.moveNum)
          }
        }
      },
      query: {
        title: '同比分析',
        fullScreenName: 'tbfx',
        subBar: true,
        data: {
          moveNum: 0
        },
        template: () => import(/* webpackChunkName: "layout"*/ './queryAnalysis'),  // 查询模板
      },
      api: {
        // 根据移动值来合并去年|今年的数据
        concatData(row, moveNum){
          let configData = row.content.data
            let temp = []
            configData.year.map((r,i)=>{
                if(i+moveNum > -1){
                  temp.push(Object.assign({},r, configData.lastYear[i+moveNum]))
                }else{
                  temp.push(Object.assign({},r,{lastDt:'',lastMoney:''}))
                }
            })
            configData.rows = temp
            configData.loading =  false
        },
        // 获取销售同比图形数据； year|lastYear分开存放，方便移动合并使用
        getAnalysisChart(row, all){
          let params = {"extParam":{"groupByWeek":false}}
          params.extParam.nmType = all.charts.query.data.nmType

          // 获取其它参数信息
          Object.assign(params, all.conditions.api.getParams(all))

          let configData = row.content.data
          configData.year = []
          configData.lastYear = []
          configData.loading =  true
          window.$ajax.scale.analysisChart(params).then(res=>{
            res.data.map(r=>{
              if(r.y == '今年'){
                configData.year.push({
                  dt: r.dt,
                  money: r.money
                })
              }else{
                configData.lastYear.push({
                  lastDt: r.dt,
                  lastMoney: r.money
                })
              }
            })
            row.api.concatData(row, 0)
          })
        }
      },
      fetch: {
        init(row, all){ // row, all, $set
          // 请求同比分析数据
          row.api.getAnalysisChart(row, all)
        }
      },
      style: 'padding-left: 10px;  border-bottom:1px solid #f1f1f1;',
      content:{
        data: {
          year:[],
          lastYear:[],
          chart: 've-line',
          grid:{
            right: 0,
            top:35,
            bottom: 20,
            left:0
          },
          chartSettings: {
            // dataType: { // 基本的数据格式有 'normal' （千分位）、'KMB' （kmb 格式）、percent （百分比格式）
            //   '今年': 'percent',
            //   '去年': 'percent',
            //   '增长率': 'normal',
            //   '今年占比': 'normal'
            // },
            // axisSite: { // 设置双y轴
            //   right: ['今年占比', '增长率','当期占比']
            // },
            // yAxisType: ['normal', 'percent'],
            // yAxisName: ['金额(元)'], // Y轴名称
            // showLine: ['今年占比', '增长率','当期占比'],  // 折线展示
            dimension:['dt','lastDt'], // 设置双x轴
            labelMap: {                // 图形显示的指标
              money: '今年',
              lastMoney: '去年'
            },
            // tooltipTrigger:'item',
            tooltipTrigger: 'axis'
            // axisVisible: false
          },
          columns: ['dt', 'money', 'lastMoney'],
          rows: [],
          loading: true
        },
        template: 'Chart',//() => import(/* webpackChunkName: "layout"*/ '@/components/Chart'),  // 查询模板
      }
    }],

    // 对比图形配置
    [{
      style: 'padding-left: 10px; padding-top:15px;',
      query: {
        title: '对比分析',
        fullScreenName: 'dbfx',
        subBar: true,
        data: {
          typeValue: 'region_name',
          tableDimensionTypeList: [{name:"大区",value:"region_name"},{name:"分部",value:"department_name"},{name:"品类",value:"category_name"},    {name:"品牌",value:"brand_name"},    {name:"型号",value:"sku_name"}]
        },
        template: () => import(/* webpackChunkName: "layout"*/ './queryContrast'),  // 查询模板
      },
      api: {
        // 获取销售对比图形数据
        getContrastChart(configData, all, eachArr){

          if (!eachArr){
            eachArr = [{name:'大区'}, {  money1:'今年'}, {  money2:'去年'}, {  money_growth_rate:'增长率'}, {  money_accounted:'今年占比'}]
          }

          configData.loading =  true

          let params = {"extParam":{}}
          params.extParam.dimensionType = all.charts.layout[1][0].query.data.typeValue
          params.extParam.nmType = all.charts.query.data.nmType

          // 获取其它参数信息
          Object.assign(params, all.conditions.api.getParams(all))

          window.$ajax.scale.contrastChart(params).then(res=>{

            // 配置图形columns数据
            let columns = []
            eachArr.map(r => {
              let k = Object.keys(r)[0]
              columns.push(r[k])
            })
            configData.columns = columns

            // 配置图形rows数据
            let tempArr = []
            res.data.map(r => {
              let obj = {}
              eachArr.map(row => {
                let k = Object.keys(row)[0]
                // if(k == 'money_growth_rate' || k == 'money_accounted'){
                //   obj[row[k]] = (r[k] * 100).toFixed(2)
                // }else{
                  obj[row[k]] = r[k]
                // }
              })
              tempArr.push(obj)
            })
            configData.rows = tempArr
            configData.loading = false

          })
        }
      },
      fetch: {
        init(row, all){ // row, all ,$set
          // 请求对比分析数据
          row.api.getContrastChart(row.content.data, all)
        }
      },
      content:{
        data: {
          chart: 've-histogram',
          grid:{
            right: 40,
            top:40,
            bottom: 45,
            left:0
          },
          chartSettings: {
            // dataType: { // 基本的数据格式有 'normal' （千分位）、'KMB' （kmb 格式）、percent （百分比格式）
            //   '今年': 'percent',
            //   '去年': 'percent',
            //   '增长率': 'normal',
            //   '今年占比': 'normal'
            // },
            axisSite: { // 设置双y轴
              right: ['今年占比', '增长率','当期占比']
            },
            yAxisType: ['normal', 'percent'],
            yAxisName: ['金额(元)', '占比%'], // Y轴名称
            showLine: ['今年占比', '增长率','当期占比'],  // 折线展示
          },
          chartExtend: {
            legend: {
              selected: {
                '今年' : true,
                '去年' : true,
                '增长率': true,
                '今年占比': false,
                '当期占比': true
              },
              // data: ['增长率','今年占比'],
              // selectedMode: 'multiple' //single
            }
          },
          columns: [],
          rows: [],
          loading: true
        },
        template: 'Chart'//() => import(/* webpackChunkName: "layout"*/ './template'),  // 查询模板
      },
      listener(area, newVal,oldVal, row, all){ // area, newVal,oldVal, row, all, $set
        let configData = row.content.data;
        // 监控 对比分析栏的筛选条件：大区 分部 品类 品牌 型号
        if(area == 'bar'){ 
          if(newVal.typeValue != oldVal.typeValue){

            
            
            
            // 图形的查询条件为型号时 改变显示的指标信息
            let columns = newVal.typeValue == 'sku_name' ? 
                [{name:'大区'},{ money1:'今年'}, { money_accounted:'当期占比'}] : 
                [{name:'大区'}, {  money1:'今年'}, {  money2:'去年'}, {  money_growth_rate:'增长率'}, {  money_accounted:'今年占比'}];
            
            // 图形为分部|品牌|型号时  图形增加缩放功能 
            if(['department_name', 'brand_name', 'sku_name'].includes(newVal.typeValue)){
              configData.dataZoom = [{
                  type: 'slider',
                  start: 0,
                  end: 10
                }]
            }else{
              configData.dataZoom = []
            }

            // 请求对比分析数据
            row.api.getContrastChart(configData, all, columns)

          }
        }
      }
    }]
  ]
}