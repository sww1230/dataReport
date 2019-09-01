# Bi报表路由

### 功能描述
> 根据config信息生成路由与@gm/menu配合使用

### 安装依赖
```
npm install @gm/router
```
### main.js中引入及注册组件
```
import route from '@gm/router'
import {menuData, currentIndex} from '@/configData.js'
const router = route(Vue, menuData, currentIndex, ViewComponent)

```
 ### 依赖数据说明
 ```
 import {menuData, currentIndex } from '@/configData.js'
 
 menuData: menuData,     // 菜单数据格式
 currentIndex: '/home',  // 默认路径的值

 ```

### 示例配置文件请参考
/node_modules/@gm/router/configData.js配置文件
