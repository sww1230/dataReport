
## 使用report-cli创建数据报表工程步骤：
##### 1. 安装nrm、切换gm源或者配置npm源为gm
> 参考 http://wiki.intra.gmplus.com/pages/viewpage.action?pageId=52888483

##### 2. 安装report-cli
```
npm install -g @gm/report-cli

出现版本信息说明安装成功
report -V 
1.0.0
```
##### 3. 创建一个新的数据报表项目
```
report create myProject
```

------

## 效果预览

![图1](http://code.ds.gm.com.cn/gitlab/scot/dp/report-platform-front/raw/master/src/assets/img1.png)

------

![图2](http://code.ds.gm.com.cn/gitlab/scot/dp/report-platform-front/raw/master/src/assets/img2.png)

------


## css样式参考

> 目的：不写样式 及 少写样式

```
https://tailwindcss.com/
```

------

## 使用说明步骤：

##### 1. 修改configData配置文件：

> 主要操作：增加菜单导航路由的配置

```
const stytemName     = '数据平台';   // 系统名称
const collapseVal    = true;       // 是否折叠菜单
const showRouter     = true;       // 导航菜单中是否启动路由模式
const currentIndex   = '/';        // 菜单的默认选项项;该值为index的值;如配置router时，也可以设置成path的值，为默认显示的页面

const menuData       = [{          // 菜单导航数据格式
      index: '/',
      name: '首页',
      icon: 'icon-shouye-cai text-blue-600',
      router:{
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home"*/ '@/views/Layout.vue')
      },
      children:[{                 // 子导航
        index:'/scale',
        name: '销售实绩',
        router: {
          path: '/scale',
          name: 'scale',
          component: () => import(/* webpackChunkName: "layout"*/ '@/views/Layout.vue')
        }
      },
      ......
      ]
    },
    ......
  ];

const cssStyle = {              // 样式设置
  background: "white",
  textCor: "#363f44",
  activeCor: "#409eff"
}    
```

##### 2. reportData目录下新增报表目录，格式如：

```
| - reportData
| - reportData | - scale                                 // 新增的报表 目录
| - reportData | - scale | - crumbs                      // 面包屑    目录
| - reportData | - scale | - crumbs     | index.js       // 块数据
| - reportData | - scale | - conditions                  // 筛选条件  目录
| - reportData | - scale | - conditions | index.js       // 块数据
| - reportData | - scale | - conditions | template.vue   // 筛选表单  模板
| - reportData | - scale | - summary                     // 汇总信息  目录
| - reportData | - scale | - summary    | index.js       // 块数据
| - reportData | - scale | - charts                      // 图形展示  目录
| - reportData | - scale | - charts     | index.js       // 块数据
| - reportData | - scale | - table                       // 表格展示  目录
| - reportData | - scale | - table      | index.js       // 块数据
| - reportData | - scale | - table      | template.vue   // 筛选表单  模板
| - reportData | - scale | - index.js                    // 入口引入 面包屑|筛选条件|汇总信息|图形展示|表格展示，需要在index.js中注册才能生效
```

##### 3. 报表数据配置格式说明如下：

```

// 表单数据格式 基本配置
const reportFormConfig = {
  crumbs:     {},                // 面包屑         块数据
  conditions: {},                // 筛选条件       块数据
  summary:    {},                // 汇总信息       块数据
  layout:[                       // 布局拆分
    [{块数据}, {块数据}],          // 一行展示两块内容
    [{块数据}, {块数据}, {块数据}]  // 一行展示三块内容
  ],
  charts:     {},                // 图形展示        块数据
  table:      {}                 // 表格展示        块数据
}


// 块数据格式 基本配置
{
  style:      '',                // 布局时的样式设置      layout中的块数据
  query:      {},                // 标题栏查询配置
  content:    {},                // 主内容区域配置
  fetch:      {},                // 加载时请求
  api:        {},                // 调用时请求
  listener    ()=>{}             // 数据改变时事件监听设置
}


// 标题栏查询 与 主内容区域 的数据配置
query | content: {                  // 标题栏 及 主内容区域 配置格式基本一样
  title:          '',               // 标题名称       标题栏设置
  fullScreenName: '',               // 全屏名称       标题栏设置
  subBar:         true,             // 主标题 子标题   标题栏设置
  data:           {},               // 依赖的数据      标题栏及内容区设置
  template:       () => import(),   // 模板           标题栏及内容区设置
  submit:         ()=>{}            // 模板里触发调用   标题栏及内容区设置
}
```
------
## 统一的数据请求：

#### 1. 调用方式
```
// 推荐使用
window.$ajax.module1.getDetail({id:11}).then(res=>{
  console.log(res, 444444)
})

// 不推荐
window.$ajax.get('/GET/getTest').then(function (response) {
  console.log(response,6666655);
}).catch(function (error) {
  console.log(error,555666);
});
```

#### 2. api列表管理，目录结构

```
| - api
| - api | - scale                             // 报表目录
| - api | - scale          | - index.js       // 接口
| - api | - scaleAnalysis                     // 报表目录
| - api | - scaleAnalysis  | - index.js       // 接口
| - api | - index.js                          // 新加的报表，需要在index.js中注册才能生效
```

------

## 连接test服务器配置在vue.config.js中修改

```
let testApi = ['http://localhost:8980', 'http://localhost:88', 'http://user-behavior.gm.inc']
testApi.push('http://test.test.com')

if (testApi){
  proxy['/api/reviceLog'] = {
    target: testApi[0],
    changeOrigin: true,
    ws: true,
    pathRewrite: {'/api/reviceLog': 'reviceLog'}
  }
  proxy['/api/dp'] = {
    target: testApi[1],
    changeOrigin: true,
    ws: true,
    pathRewrite: {'/api/dp': 'dp'}
  }
  proxy['/api/help-sys'] = {
    target: testApi[2],
    changeOrigin: true,
    ws: true,
    pathRewrite: {'/api/help-sys': 'help-sys'}
  }
  proxy['/api/test'] = {
    target: testApi[3],
    changeOrigin: true,
    ws: true,
    pathRewrite: {'/api/test: 'test'}
  }
}
```

---

# 例子：test报表文件创建步骤，参考如下

##### 1. 修改configData菜单导航配置文件，增加test菜单配置

```
{
  index:'/test',
  name: '一个测试报表',
  router: {
    path: '/test',
    name: 'test',
  }
}
```

##### 2. 在reportData里目录下新建test目录

```
| - reportData
| - reportData | - test
```

##### 3. 在test目录新建块目录及index.js
  块目录：crumbs面包屑 | conditions筛选条件 | summary汇总信息 | charts图形 | table表格

```
| - test
| - test | - index.js                      // 注册块数据到index.js中
| - test | - crumbs                        // 面包屑块
| - test | - crumbs     | - index.js       // 面包屑的块数据
| - test | - conditions                    // 查询条件块
| - test | - conditions | - index.js       // 查询条件的块数据
| - test | - summary                       // 汇总信息块
| - test | - summary | - index.js          // 汇总信息的块数据
......
```

##### 4. 块数据的属性一般格式：
  style布局样式 | query标题栏区 | content内容区 | fetch默认请求 | api调用请求 | listener监听数据 | layout布局拆分

|  属性   | 内容  | 类型 | 使用范围 |
|  ----  | ----  | ----  | ----  |
| style  | layout时可以设置 | String | 块数据  |
| query  | 标题栏 | Object | 块数据  |
| content  | 内容区  | Object | 块数据  |
| fetch  | 块数据黑默认请求的数据  | Object | 块数据  |
| api  | 块数据里需要调用触发  | Object | 块数据  |
| listener | 数据发生改变时监听数据 | Function | 块数据  |
| layout | 布局拆分 | Array | 块数据  |


##### 5. 三个主要方法及参数

|  方法   | 参数  | 使用范围 |
|  ----  | ----  | ----  |
|  listener  | area, newObj,oldObj, row, all, $set  | 块数据  |
|  init  | row, all, $set  | fetch属性下 |
|  submit  | data, row, all, $set  | content及query属性下 |

##### 6. 块数据的query及content的属性

| 属性 | 类型 | 描述 | 使用范围 |
|  ----  | ----  | ----  | ----  |
| title | String | 标题栏名称 | query属性下 |
| fullScreenName | String | 全屏名称唯一ID | query属性下 |
| subBar | Bolean | 是否为子标题 | query属性下 |
| data | Object | 模板的数据 | query及content |
| template | Function或String | 模板组件 | query及content |
| submit | Function | 模板中的触发的方法 | query及content |