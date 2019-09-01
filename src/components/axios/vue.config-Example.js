const port = 8686; 

// mock接口数据
let mockApi = 'http://10.115.105.14:8989/app/mock/22/'
// 测试环境接口数据
let testApi = 'http://www.test.com'

let proxy = {}
let methods = ['GET','POST','PUT','DELETE']
methods.map(r=>{
  let pathRewrite = {}
  pathRewrite['/api/'+r] = r
  proxy['/api/'+r] = {
    target: mockApi,
    changeOrigin: true,
    ws: true,
    pathRewrite: pathRewrite
  }
})

if (testApi){
  proxy['/api'] = {
    target: testApi,
    changeOrigin: true,
    ws: true,
    pathRewrite: {'/api': ''}
  }
}

module.exports = {
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: proxy
  }
};