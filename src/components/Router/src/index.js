import Router from 'vue-router'

const routerInit = (Vue, menuData, currentIndex, ViewComponent) => {
  
  Vue.use(Router)
  // 根据菜单配置文件，创建路由
  const createRouter = (config) => {
      let routers = []
      const eachMenuGetRouter = (data) => {
        if(data.router){
          !data.router.component && (data.router.component = ViewComponent)
          routers.push(data.router)
          if(currentIndex == data.router.path){
            routers.push(Object.assign({},data.router,{path:'/'}))
          }
        }
        if(data.children){
          data.children.map(sub=>{
            eachMenuGetRouter(sub)
          })
        }
      }
      config.map(subMenu=>{
        eachMenuGetRouter(subMenu)
      })
      console.log(routers)
      return routers
  }

  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: createRouter(menuData)
  })

}

export default routerInit;