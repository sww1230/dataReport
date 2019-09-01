import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
Vue.use(ElementUI, {size: 'mini'})
import VCharts from 'v-charts'
Vue.use(VCharts)

import './styles.scss'
import './assets/iconfont/iconfont.css'
import 'animate.css' 
import 'v-charts/lib/style.css'
import 'echarts/lib/component/dataZoom'

// 统一数据请求
import ajax from '@/components/axios'
// import ajax from '@gm/ajax'
import apiList from '@/api'
ajax(apiList,function(error){
  // 请求错误统一处理
  // console.log(error.response, error.response.status, 767)
  if(error.response.status == 403){
    alert('response.status:' + 403)
    // window.location.href="http://localhost:88/#/login"
  }
},function(){
  // 请求成功统一处理
  // console.log(response)
});

// 报表数据
import reportData from '@/reportData'

// router-view page
import Page from '@/components/Page'
// import Page from '@gm/page'
Page.install(Vue, reportData)

import route from '@/components/Router'
// import route from '@gm/router'

// 导航菜单
// import Menu from '@gm/menu'
import Menu from '@/components/Menu'
Menu.install(Vue)

// 面包屑组件
// import Crumbs from '@gm/crumbs'
import Crumbs from '@/components/Crumbs'
Crumbs.install(Vue)

// 卡片容器组件  已废弃
// import CardContainer from '@gm/card-container'
// CardContainer.install(Vue)

// layout布局组件
// import Layout from '@gm/layout'
import Layout from '@/components/Layout'
Layout.install(Vue)

// 标题栏组件
// import TitleBar from '@gm/title-bar'
import TitleBar from '@/components/TitleBar'
TitleBar.install(Vue)

// 图形组件
// import Chart from '@gm/chart'
import Chart from '@/components/Chart'
Chart.install(Vue)

// 表格组件 | 汇总信息
// import BiTable from '@gm/bi-table'
import BiTable from '@/components/BiTable'
BiTable.install(Vue)

window.moment = require('moment')

let conf = require('@/configData.js')

const router = route(Vue, conf.menuData, conf.currentIndex, Page)
router.beforeEach((to, from, next) => {
  // 路由统一处理
  localStorage.currentPath = to.path
  if(to.path=='/'){
    conf = Object.assign({}, conf,{currentIndex: '/'})
    localStorage.currentMenu = JSON.stringify({
      key: 'select',
      val:{
        index: '/',
        indexPath: ['/']
      }
    })
  }
  next()
});


Vue.config.productionTip = false
new Vue({
  data() {
    return {
      loading: false,
      // 注册全局的config配置，页面中通过this.$root.conf获取配置信息
      conf: conf
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
