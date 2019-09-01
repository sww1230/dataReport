# page

### 功能描述
> router-view中渲染这个组件，所有路由导航都引用Page组件

### 安装依赖
```
npm install @gome/page
```
### main.js中引入及注册组件
```
import reportData from '@/reportData'   // 报表数据
import Page from '@gome/page'
Page.install(Vue, reportData)

```