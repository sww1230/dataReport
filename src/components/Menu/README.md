# 折叠菜单组件

### 功能描述
> 折叠菜单，根据数据动态生成菜单导航

### 安装依赖
```
npm install @gome/menu
```
### main.js中引入及注册组件
```
import Test from '@gome/menu'
Test.install(Vue)
```
### 页面中使用方式
 ```
 <Menu 
    ref="menu"
    :collapseVal="menuConf.collapseVal" 
    :currentIndex="menuConf.currentIndex"
    :menuData="menuConf.menuData"
    :router="menuConf.showRouter"
    :cssStyle="cssStyle"
    @handleMenu="handleMenu"
  />
 ```
 ### 依赖数据说明
 ```
 import {menuData, collapseVal, currentIndex, showRouter, handleMenu, cssStyle} from '@/configData.js'

 menuConf:{
    collapseVal: true,    // 是否折叠菜单
    currentIndex: '1-1',  // 默认选定的状态；如配置router时，也可以设置成path的值，为默认显示的页面
    menuData: menuData,   // 菜单数据格式
    router: showRouter,   // 是启动路由模式
    cssStyle: cssStyle    // 样式设置
 }
 ```
 ### 回调方法说明
 ```
 methods:{
  handleMenu
}
 ```

### 示例配置文件请参考
/node_modules/@gome/menu/configData.js配置文件

### 父组件控制菜单的折叠展开方法
```
this.$refs.menu.flod()
```
 