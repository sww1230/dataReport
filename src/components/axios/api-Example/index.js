
// 1. 所有的 ajax api 在此文件夹下配置
// 2. 根据业务模块，将 api 划分成不同的 modules，放在各自的文件内，单独维护
// 3. 这里提供两个示例模块 - moduleA 与 moduleB，项目中根据业务功能命名。
// 4. 新加的业务模块，需要在 index.js 中注册才能生效，详见：index.js。

/**
 * 
 *  调用方法示例
 *  this.$ajax.get('/GET/getTest').then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });

    推荐调用方式  this.$ajax[模块名称][接口名称](参数)； 方便接口统一管理
    this.$ajax.module1.getDetail({id:11122}).then(res=>{
      console.log(res)
    })

 */

  import module1 from './modules/moduleA'
  import module2 from './modules/moduleB'

  export default {
    module1,
    module2
  }