export default {
  query:{
    title: '筛选条件'
  },
  api:{
    // 处理参数信息
    getParams(all){
      let params = {}
      params.channelCode = all.conditions.content.data.channelValue
      params.regionCode = all.conditions.content.data.areaValue
      params.departmentCode = all.conditions.content.data.branchValue
      params.shopCode = all.conditions.content.data.storeValue
      params.divisionCode = all.conditions.content.data.firstValue
      params.categoryCode = all.conditions.content.data.secondValue
      params.categoryThreeCode = all.conditions.content.data.thirdValue
      params.brandCode = all.conditions.content.data.brandValue
      params.businessModelCode = all.conditions.content.data.businessModelValue
      params.operationModel = all.conditions.content.data.operationModelValue
      params.skuNo = all.conditions.content.data.skuNo
      params.skuName = all.conditions.content.data.skuName

      if(window.moment(all.conditions.content.data.time[0]).format('YYYY-MM-DD') == window.moment(all.conditions.content.data.time[1]).format('YYYY-MM-DD')){
        let time = [window.moment(window.moment(all.conditions.content.data.time[0]).format('YYYY-MM-DD')).format('YYYY-') + (window.moment(window.moment(all.conditions.content.data.time[0]).format('YYYY-MM-DD')).format('M') > 6 ? '07-01' : '01-01'), window.moment(all.conditions.content.data.time[0]).format('YYYY-MM-DD')]
        params.startDay = window.moment(time[0]).format('YYYY-MM-DD')
        params.endDay = window.moment(time[1]).format('YYYY-MM-DD')
        params.lastYearStartDay = window.moment(time[0]).format('YYYY')-1 +'-'+ window.moment(time[0]).format('MM-DD')
        params.lastYearEndDay = window.moment(time[1]).format('YYYY')-1 +'-'+ window.moment(time[1]).format('MM-DD')
      }else{
        params.startDay = window.moment(all.conditions.content.data.time[0]).format('YYYY-MM-DD')
        params.endDay = window.moment(all.conditions.content.data.time[1]).format('YYYY-MM-DD')
        params.lastYearStartDay = window.moment(all.conditions.content.data.time[0]).format('YYYY')-1 +'-'+ window.moment(all.conditions.content.data.time[0]).format('MM-DD')
        params.lastYearEndDay = window.moment(all.conditions.content.data.time[1]).format('YYYY')-1 +'-'+ window.moment(all.conditions.content.data.time[1]).format('MM-DD')
      }
      return params;
    },
    // 重新请求查询
    reRequest(all){
      // 汇总信息
      all.summary.api.getTotalInfo (all.summary.content.data, all)
      // 同比信息
      all.charts.layout[0][0].api.getAnalysisChart(all.charts.layout[0][0], all)
      // 对比信息
      all.charts.layout[1][0].api.getContrastChart(all.charts.layout[1][0].content.data, all)
      // 明细信息
      all.table.api.getDetailInfo(all.table, all)
    },
    // 获取时间
    getMaxDate(data, all, params){
      window.$ajax.scale.getMaxDate(params).then(res=>{
        all.crumbs.time = window.moment(res).subtract(1, 'days').format('YYYY-MM-DD')
        data.time = [window.moment(res).format('YYYY-') + (window.moment(res).format('M') > 6 ? '07-01' : '01-01'), all.crumbs.time]
        all.conditions.api.getStore(data, all, {
          startDay: data.time[0],
          endDay: data.time[1]
        })
      })
    },
    // 全选操作
    selectAll(data, newObj, valueKey, optionsKey, valueCode){
      if(newObj[valueKey][newObj[valueKey].length-1] == 'all'){
        data[valueKey] = []
        data[optionsKey].map(r => {
          data[valueKey].push(r[valueCode])
        })
      }
    },
    // 获取门店列表
    getStore(data, all, params){
      window.$ajax.scale.getStore(params).then(res=>{
        data.allStore = res.data
        let temp = []
        for(let k in data.allStore){
          temp = temp.concat(data.allStore[k])
        }
        data.storeOptions = temp
      })
    },
    // 设置二级品类
    setSecondCategory(data, params){
      window.$ajax.scale.getSecondCategory(params).then(res=>{
        data.secondOptions = res.data
        data.secondValue   = []
      })
    },
    // 设置三级品类
    setThirdCategory(data, params){
      window.$ajax.scale.getThirdCategory(params).then(res=>{
        data.thirdOptions = res.data
        data.thirdValue   = []
      })
    },
    // 设置品牌
    setBrand(data, params){
      window.$ajax.scale.getBrand(params).then(res=>{
        data.brandOptions   = res.data
        data.brandValue   = []
      })
    }
  },
  fetch: {
    init(row, all){
      let configData = row.content.data;
      // 大区
      window.$ajax.scale.refresh().then(res=>{
        configData.areaOptions = res.data.orgList
        let areaValue = []
        res.data.orgList.map(r => {
          areaValue.push(r.code)
        })
        configData.areaValue   = areaValue
        // 获取时间
        row.api.getMaxDate(configData, all, {
          "regionCode":areaValue,
          "categoryCode":[],
          "operationModel":""
        })
      })
      // 一级品类
      window.$ajax.scale.getFirstCategory().then(res=>{
        configData.firstOptions = res.data
      })

      // 渠道数据
      window.$ajax.scale.getChannelDropDown().then(res=>{
        configData.channelOptions = res.data
        configData.channelOptions.map(r => {
          configData.channelValue.push(r.code)
        })
      })
      
      // window.$ajax.scale.userBaseInfo().then(res=>{
      //   console.log(res, 1111)
      // })
      
    }
  },
  content: {
    data: {
      time: [],
      allStore: {},  

      storeOptions: [],
      storeValue: [],

      areaOptions:[],
      areaValue: [],
      branchOptions:[],
      branchValue: [],

      // 一级品类
      firstOptions: [],
      firstValue: [],
      // 二级品类
      secondOptions:[],
      secondValue: [],
      // 三级品类
      thirdOptions: [],
      thirdValue: [],

      // 品牌
      brandOptions: [],
      brandValue: [],

      // 渠道
      channelOptions: [],
      channelValue: [],

      // 业务机型
      businessModelList: [{name:"标准商品",code:"01"}, {name:"包销机",code:"02"},{name:"定制机",code:"03"}, {name:"临采机",code:"04"}, {name:"特价机",code:"05"}, {name:"工程机",code:"06"}, {name:"会员商品",code:"07"},
            {name:"赠品",code:"08"}, {name:"样机",code:"09"}, {name:"一步到位价",code:"11"}, {name:"免费赠品",code:"15"},{name:"返利机",code:"16"},
            {name:"单店协议机",code:"17"}],
      businessModelValue: [],

      // 经营方式
      operationModelList: [{name:"经营方式:不限",code:""},{name:"经销",code:"01"},{name:"代销",code:"02"}],
      operationModelValue: '',

      skuNo: '',
      skuName: ''
    },
    template: () => import(/* webpackChunkName: "layout"*/ './template'),  // 查询模板
    submit:(data, row, all)=>{ // data, row, all, $set
      row.api.reRequest(all)
    },
  },
  listener(area, newObj,oldObj, row){ // area, newObj,oldObj, row, allInfo, $set
    
    // 监听全选值
    row.api.selectAll(row.content.data, newObj, 'areaValue', 'areaOptions', 'code')
    row.api.selectAll(row.content.data, newObj, 'branchValue', 'branchOptions', 'code')
    row.api.selectAll(row.content.data, newObj, 'storeValue', 'storeOptions', 'code')
    row.api.selectAll(row.content.data, newObj, 'firstValue', 'firstOptions', 'code')
    row.api.selectAll(row.content.data, newObj, 'secondValue', 'secondOptions', 'code')
    row.api.selectAll(row.content.data, newObj, 'thirdValue', 'thirdOptions', 'code')
    row.api.selectAll(row.content.data, newObj, 'brandValue', 'brandOptions', 'code')
    row.api.selectAll(row.content.data, newObj, 'businessModelValue', 'businessModelList', 'code')
    row.api.selectAll(row.content.data, newObj, 'channelValue', 'channelOptions', 'code')
    
    if(area == 'content'){

      let contentData = row.content.data

      // 监听大区的值  改变 分部的options及value;
      if(newObj.areaValue.length != oldObj.areaValue.length){
        contentData.branchOptions = []
        let branchOptions = []
        if(!newObj.areaValue.length){
          newObj.areaOptions.map(r => {
            branchOptions = branchOptions.concat(r.subList)
          })
        } else{
          newObj.areaOptions.map(r => {
            if(newObj.areaValue.includes(r.code)){
              branchOptions = branchOptions.concat(r.subList)
            }
          })
        }
        contentData.branchOptions = branchOptions
        contentData.branchValue = []
      }

      // 监听分部的options 改变 门店的options;
      if(newObj.branchOptions.length != oldObj.branchOptions.length){
        let temp = []
        newObj.branchOptions.map(r => {
          if(contentData.allStore[r.code]){
            temp = temp.concat(contentData.allStore[r.code])
          }
        })
        contentData.storeOptions = temp
        contentData.storeValue = []
      }

      // 监听分部的值 改变 门店的options及value;
      if(newObj.branchValue.length != oldObj.branchValue.length){
        let temp = []
        if(!newObj.branchValue.length){
          // 分部值为空时 获取当前所有分部的门店 
          newObj.branchOptions.map(r => {
            if(contentData.allStore[r.code]){
              temp = temp.concat(contentData.allStore[r.code])
            }
          })
        }else{
          
          // 分部值为真时 根据当前选种的分部值 去获取对应的分部门店
          newObj.branchValue.map( code => {
            if(contentData.allStore[code]){
              temp = temp.concat(contentData.allStore[code])
            }
          })
        }
        contentData.storeOptions = temp
        contentData.storeValue = []
      }

      // 监听一级品类options及value的值 更改二级品类secondOptions的options及value
      if(newObj.firstOptions.length != oldObj.firstOptions.length){
        let params = []
        newObj.firstOptions.map(r => {
          params.push(r.code)
        })
        row.api.setSecondCategory(contentData, params)
      }
      if(newObj.firstValue.length != oldObj.firstValue.length){
        let params = []
        newObj.firstValue.length ? newObj.firstValue.map(code => {
          params.push(code)
        }) : newObj.firstOptions.map(r => {
          params.push(r.code)
        })
        row.api.setSecondCategory(contentData, params)
      }

      // 监听二级品类options及value的值 更改三级品类thirdOptions的options及value
      if(newObj.secondOptions.length != oldObj.secondOptions.length){
        let params = []
        newObj.secondOptions.map(r => {
          params.push(r.code)
        })
        row.api.setThirdCategory(contentData, params)
        row.api.setBrand(contentData, params)
      }
      if(newObj.secondValue.length != oldObj.secondValue.length){
        let params = []
        newObj.secondValue.length ? newObj.secondValue.map(code => {
          params.push(code)
        }) : newObj.secondOptions.map(r => {
          params.push(r.code)
        })
        row.api.setThirdCategory(contentData, params)
        row.api.setBrand(contentData, params)
      }

      // 监听三级品类的value值 改变 品牌的options及value
      if(newObj.thirdValue.length != oldObj.thirdValue.length){
        if(newObj.thirdValue.length){
          let params = []
          newObj.thirdValue.map(code => {
            params.push(code)
          })
          row.api.setBrand(contentData, params)
        }
      }

    }
  }
}