export default {
  fetch: {
    getContent(row, all, $set){
      console.log(all, $set)
      window.$ajax.get('/GET/getCharts').then(function (response) {
        row.layout[1][0].content.data.rows = response.data
        row.layout[1][1].content.data.rows = response.data
      }).catch(function (error) {
        console.log(error,555666);
      });
    }
  },
  query:{
    title: '图形例子展示区域',
  },
  layout: [
    [{
      fetch: {
        getContent(row, all, $set){
          console.log(row, all, $set)
          // window.$ajax.get('/GET/getCharts').then(function (response) {
          //   console.log(row, all, $set, response.data)
          //   row.content.data.rows = response.data
          // }).catch(function (error) {
          //   console.log(error,555666);
          // });
        }
      },
      style: 'padding-right:20px; border-right:1px solid #f1f1f1; border-bottom:1px solid #f1f1f1;',
      query: {
        title: '库存周转分析33332211',
        fullScreenName: 'kczzfx',
        subBar: true,
      },
      content:{
        data: {
          // grid:{
          //   right: 0,
          //   top:40,
          //   bottom: 45,
          //   left:0
          // },
          // dataEmpty: true,
          // loading: true,
          // dataZoom:[
          //   {
          //     type: 'slider',
          //     start: 0,
          //     end: 20
          //   }
          // ],
          chart: 've-sankey',
          chartExtend: {
            series: {
              barWidth: 10
            },
            tooltip: {
              trigger: 'none'
            }
          },
          chartSettings: {
            links: [
              { source: '首页', target: '列表页a', value: 0.5 },
              { source: '首页', target: '列表页b', value: 0.5 },
              { source: '列表页a', target: '内容页a-1', value: 0.1 },
              { source: '列表页a', target: '内容页a-2', value: 0.4 },
              { source: '列表页b', target: '内容页b-1', value: 0.2 },
              { source: '列表页b', target: '内容页b-2', value: 0.3 }
            ]
          },
          columns: ['页面', '访问量'],
          rows: [
            { '页面': '首页', '访问量': 100000 },
            { '页面': '列表页a', '访问量': 20000 },
            { '页面': '列表页b', '访问量': 80000 },
            { '页面': '内容页a-1', '访问量': 10000 },
            { '页面': '内容页a-2', '访问量': 10000 },
            { '页面': '内容页b-1', '访问量': 60000 },
            { '页面': '内容页b-2', '访问量': 20000 }
          ]
        },
        template: 'Chart'//() => import(/* webpackChunkName: "layout"*/ './template'),  // 查询模板
      }
    },{
      fetch: {
        getContent(row, all, $set){
          window.$ajax.get('/GET/getCharts').then(function (response) {
            console.log(row, all, $set, response.data)
            row.content.data.rows = response.data
          }).catch(function (error) {
            console.log(error,555666);
          });
        }
      },
      style: 'padding-left: 10px;  border-bottom:1px solid #f1f1f1;',
      query: {
        title: '库存周转分析',
        fullScreenName: 'kczzfx',
        subBar: true,
      },
      content:{
        data: {
          chart: 've-histogram',
          grid:{
            right: 0,
            top:40,
            bottom: 45,
            left:0
          },
          dataZoom:[
            {
              type: 'slider',
              start: 0,
              end: 20
            }
          ],
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        template: 'Chart',//() => import(/* webpackChunkName: "layout"*/ '@/components/Chart'),  // 查询模板
      }
    }],
    [{
      fetch: {
        getContent333333(row, all, $set){
          console.log(row, all, $set,'table99999999999999')
        }
      },
      style: 'padding-right:20px; padding-top: 10px; border-right:1px solid #f1f1f1;',
      query: {
        title: '库存周转分析',
        fullScreenName: 'kczzfx',
        subBar: true,
      },
      content:{
        data: {
          chart: 've-histogram',
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        template: 'Chart'
        // template: () => import(/* webpackChunkName: "layout"*/ './template'),  // 查询模板
      }
    },{
      fetch: {
        getContent333333(row, all, $set){
          console.log(row, all, $set,'table1010101010101010')
        }
      },
      style: 'padding-left: 10px; padding-top: 10px;',
      query: {
        title: '库存周转分析',
        fullScreenName: 'kczzfx',
        subBar: true,
      },
      content:{
        data: {
          chart: 've-line',
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        template: 'Chart'
        // template: () => import(/* webpackChunkName: "layout"*/ './template'),  // 查询模板
      }
    }]
  ]
  
}