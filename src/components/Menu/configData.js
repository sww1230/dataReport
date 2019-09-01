// 示例配置文件

/**
 * 系统标题名称
 */
const stytemName = '数据平台'

/**
 * collapseVal
 * 导航菜单是否折叠
 */
const collapseVal = false


/**
 * showRouter
 * 导航菜单中是否启动路由模式
 */
const showRouter = true


/**
 * currentIndex
 * 当前菜单的默认选项项
 * 1. 该值为index的值
 * 2. 如配置router时，也可以设置成path的值，为默认显示的页面
 */
const currentIndex = '/'   


/**
 * menuData 的key描述
 * 中的router为可选配项，配置时router时，路由会根据这个配置来生成
 * {
      index:'1',               // 导航索引
      name: '销售业2绩',        // 导航名称
      children:[               // 子导航
        index: '2',            // 子导航索引
        name: '导航名称'        // 子导航名称
        router:{ // 路由配置    // 子导航路由配置数据     为可选配项
          path: '/',           // 子导航路由url地址名称
          name: 'home',        // 子导航路由名称
          component: Home      // 子导航路由组件
        }
      ]
    }
*/

const menuData = [
  {
    index: '/',
    name: '首页',
    icon: 'icon-shouye-cai text-blue-600',
    router:{
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    }
  },
  {
    index:'1',
    name: '销售业绩',
    icon: 'icon-zonghezhibiao text-pink-400',
    children:[
      {
        index:'/scale',
        name: '销售实绩',
        router: {
          path: '/scale',
          name: 'scale',
          component: () => import('./views/Home.vue')
        }
      },
      {
        index:'/salesAnalysis',
        name: '销售分析',
        router: {
          path: '/salesAnalysis',
          name: 'salesAnalysis',
          component: () => import('./views/Home.vue')
        }
      }
    ]
  },{
    index:'3',
    name: '商品管理',
    icon: 'icon-shangpin1 text-purple-400',
    children:[
      {
        index:'/o2obuyability',
        name: '可售状态',
        router: {
          path: '/o2obuyability',
          name: 'o2obuyability',
          component: () => import('./views/About.vue')
        }
      },{
        index:'/structureAnalysis',
        name: '结构分析',
        router: {
          path: '/structureAnalysis',
          name: 'structureAnalysis',
          component: () => import('./views/About.vue')
        }
      },{
        index:'/heroSku',
        name: '重点机型',
        router: {
          path: '/heroSku',
          name: 'heroSku',
          component: () => import('./views/About.vue')
        }
      }
    ]
  },{
    index:'4',
    name: '库存管理',
    icon: 'icon-kucunguanli text-red-400',
    children:[
      {
        index:'/oosMonitoring',
        name: '存销比(含缺断货)',
        router: {
          path: '/oosMonitoring',
          name: 'oosMonitoring',
          component: () => import('./views/Home.vue')
        }
      },
      {
        index:'/inventoryHealthy',
        name: '库龄健康(滞销) ',
        router: {
          path: '/inventoryHealthy',
          name: 'inventoryHealthy',
          component: () => import('./views/Home.vue')
        }
      },
      {
        index:'/inventoryTurnover',
        name: '库存周转',
        router: {
          path: '/inventoryTurnover',
          name: 'inventoryTurnover',
          component: () => import('./views/Home.vue')
        }
      },
      {
        index:'/oosMonitoringDropship',
        name: '带安库存监控 ',
        router: {
          path: '/oosMonitoringDropship',
          name: 'oosMonitoringDropship',
          component: () => import('./views/Home.vue')
        }
      },
      {
        index:'/undeliveryStock',
        name: '已售未提报表',
        router: {
          path: '/undeliveryStock',
          name: 'undeliveryStock',
          component: () => import('./views/Home.vue')
        }
      },
      {
        index:'/storebuyability',
        name: '门店规划有货率',
        router: {
          path: '/storebuyability',
          name: 'storebuyability',
          component: () => import('./views/Home.vue')
        }
      }
    ]
  },{
    index:'5',
    name: '财务管理',
    icon: 'icon-caiwu text-yellow-500',
    children:[
      {
        index:'/vendorCOOP',
        name: '市调蓝欠收',
        router: {
          path: '/vendorCOOP',
          name: 'vendorCOOP',
          component: () => import('./views/Home.vue')
        }
      },{
        index:'/belowCostSalesMonitoring',
        name: '低价销售',
        router: {
          path: '/belowCostSalesMonitoring',
          name: 'belowCostSalesMonitoring',
          component: () => import('./views/Home.vue')
        }
      },
    ]
  },{
    index:'6',
    name: '采购管理',
    icon: 'icon-caigou1 text-teal-400',
    children:[
      {
        index:'/vendorPerformance',
        name: '供应商绩效',
        router: {
          path: '/vendorPerformance',
          name: 'vendorPerformance',
          component: () => import('./views/Home.vue')
        }
      },{
        index:'/overrideTurnover',
        name: '承诺周转',
        router: {
          path: '/overrideTurnover',
          name: 'overrideTurnover',
          component: () => import('./views/Home.vue')
        }
      },
    ]
  },{
    index:'7',
    name: '调拨管理',
    icon: 'icon-pingtai_mokuai text-pink-600',
    children:[
      {
        index:'/allocationMonitoring',
        name: '调拨监控',
        router: {
          path: '/allocationMonitoring',
          name: 'allocationMonitoring',
          component: () => import('./views/Home.vue')
        }
      },
    ]
  },{
    index:'8',
    name: '订单时效',
    icon: 'icon-chengjiaodingdan text-teal-300',
    children:[
      {
        index:'/c2dDropship',
        name: '带安订单妥投时效',
        router: {
          path: '/c2dDropship',
          name: 'c2dDropship',
          component: () => import('./views/Home.vue')
        }
      },{
        index:'/instantFulfillmentDropship',
        name: '带安订单及时履约',
        router: {
          path: '/instantFulfillmentDropship',
          name: 'instantFulfillmentDropship',
          component: () => import('./views/Home.vue')
        }
      },
    ]
  },{
    index:'9',
    name: '非电器业务',
    icon: 'icon-zonghetiyanguan text-blue-400',
    children:[
      {
        index:'/kpiCommercialComplex',
        name: '综合指标',
        router: {
          path: '/kpiCommercialComplex',
          name: 'kpiCommercialComplex',
          component: () => import('./views/Home.vue')
        }
      },{
        index:'/salesCommercialComplex',
        name: '非电器销售',
        router: {
          path: '/salesCommercialComplex',
          name: 'salesCommercialComplex',
          component: () => import('./views/Home.vue')
        }
      },{
        index:'/customerCounting',
        name: '流量分析',
        router: {
          path: '/customerCounting',
          name: 'customerCounting',
          component: () => import('./views/Home.vue')
        }
      },{
        index:'/commodityMovableSale',
        name: '商品动销',
        router: {
          path: '/commodityMovableSale',
          name: 'commodityMovableSale',
          component: () => import('./views/Home.vue')
        }
      },
    ]
  }
]

/**
 * 选择菜单导航时触发
 * obj.key的值  open打开折叠 | close关闭折叠 | select选中的值
 * obj.val为操作当前的值
 */
const handleMenu = (obj) => {
  console.log(obj, 3333)
}

/**
 * 菜单样式设置
 */
const cssStyle = {
  background: "white",
  textCor: "#363f44",
  activeCor: "#409eff"
}

export {menuData, collapseVal, currentIndex, showRouter, handleMenu, cssStyle, stytemName}