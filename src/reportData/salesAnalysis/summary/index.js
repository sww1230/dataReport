export default {
  query:{
    title: '筛选222条件'
  },
  content:{
    data: {
      time: [],
    },
  },
  fetch: {
    init(row, all){ // row, all, $set
      let data = row.content.data;

      // 获取时间
      window.$ajax.salesAnalysis.getMaxDate({}).then(res=>{
        all.crumbs.time = window.moment(res).subtract(1, 'days').format('YYYY-MM-DD')
        
        let time = [window.moment(res).format('YYYY-') + (window.moment(res).format('M') > 6 ? '07-01' : '01-01'), all.crumbs.time]
        data.time = [window.moment(time[0], 'YYYY-MM-DD'), window.moment(time[1], 'YYYY-MM-DD')]


      })

    }
  }
}