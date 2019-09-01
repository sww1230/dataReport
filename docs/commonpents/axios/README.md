### axios封装
> 方便接口统一管理
  mock代理请求

### 使用示例文件
  api-Example目录使用示例时重全名为api并移动至工程src/api目录
  vue.config-Example代理配置示例文件使用时移动至工程/根目录下

### 入口引入及页面调用方式
1. 安装依赖
```
npm install @gm/ajax
```
2. main.js引入
```
import ajax from '@gm/ajax'
// api接口列表
import apiList from '@/api'
ajax(apiList,function(error){
  // 请求错误统一处理
  // console.log(error.response, error.response.status, 767)
  if(error.response.status == 403){
    window.location.href="http://db.test.gm.com.cn:88/#/login"
  }
},function(response){
  // 请求成功统一处理
  console.log(response)
});

```

3. 页面中调用
```
 // 调用方法示例
  this.$ajax.get('/GET/getTest').then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });

  // 推荐调用方式  this.$ajax[模块名称][接口名称](参数)； 方便接口统一管理
  this.$ajax.module1.getDetail({id:11122}).then(res => {
    console.log(res)
  })
```

### api文件目录

```
  |-index.js
  |-modules
  |-modules|-moduleA.js
  |-modules|-moduleB.js
```

1. index.js示例
```

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
```

2. moduleA.js示例
```
/**
 * m: mock
 */
export default (mock)=>{
  return {
    get: {
      getTest: mock.GET + '/getTest',
    },
    postJSON: {
      postTest: mock.POST + '/getList'
    }
  }
};
```