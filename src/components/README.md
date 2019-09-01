# 报表平台涉及的公共组件
------
1. Menu: 菜单导航 http://npm.gome.inc/package/@gome/menu
2. BiTable：表格 http://npm.gome.inc/package/@gome/bi-table
3. axios: 统一数据请求 http://npm.gome.inc/package/@gome/ajax
4. cardContainer: 卡片容器 废弃 http://npm.gome.inc/package/@gome/card-container
5. Crumbs: 面包屑及帮助文档 http://npm.gome.inc/package/@gome/crumbs
6. Layout: flex布局 http://npm.gome.inc/package/@gome/layout
7. Page: router-vie中默认嵌套 http://npm.gome.inc/package/@gome/page
8. Chart: 图形展示 http://npm.gome.inc/package/@gome/chart
9. Router: 路由组件 http://npm.gome.inc/package/@gome/router
10. TitleBar: 标题栏 http://npm.gome.inc/package/@gome/title-bar


----

### 使用report-cli创建数据报表工程步骤：

> http://npm.gome.inc/package/@gome/report-cli

##### 1. 安装nrm、切换gome源或者配置npm源为gome

> 参考 http://wiki.intra.gomeplus.com/pages/viewpage.action?pageId=52888483

##### 2. 安装report-cli
```
npm install -g @gome/report-cli

出现版本信息说明安装成功
report -V 
1.0.0
```
##### 3. 创建一个新的数据报表项目
```
report create myProject
```
