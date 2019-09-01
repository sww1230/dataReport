export default {
  title: 'crumbs',
  icon: true,
  time: '',
  fetch: {
    init(row){ // row, all, $set
      let params = {"createTime":"","docContent":"","pageDesc":"","pageUrl":"/sales/salesAnalysis","updateTime":"","sysCode":"001"}
      window.$ajax.scale.findSomeOneDoc(params).then(res=>{
        row.content = []
        res.data.map(r => {
          row.content.push(r.doc_content)
        })
      })
    }
  },
  content: []
}