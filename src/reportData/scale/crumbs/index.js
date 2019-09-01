export default {
  title: 'crumbs',
  icon: true,
  time: '',
  fetch: {
    init(row){ // row, all, $set
      window.$ajax.scale.findSomeOneDoc({"createTime":"","docContent":"","pageDesc":"","pageUrl":"/sales/scale","updateTime":"","sysCode":"001"}).then(res=>{
        row.content = []
        res.data.map(r => {
          row.content.push(r.doc_content)
        })
      })
    }
  },
  content: []
}