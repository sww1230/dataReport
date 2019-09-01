export default [
  [{
    query: {   
      title: '销售2231'
    },
    content: {
      data: {
        chart: 've-gauge',
        chartSettings: {
          labelMap: {
            'speed': '速度111'
          },
          dataName: {
            'speed': 'km/h'
          }
        },
        columns: ['type', 'value'],
        rows: [
          { type: 'speed', value: 60 }
        ]
      },
      template: 'Chart'
    }
  },
  {
    style: 'padding-left: 15px',
    query: {   
      title: '综合'
    },
    layout:[
      [
        {
          content:{
            data: {
              chart: 've-gauge',
              columns: ['type', 'a', 'b', 'value'],
              rows: [
                { type: '速度', value: 40, a: 1, b: 2 }
              ]
            },
            template: 'Chart'
          }
        },
        {
          content:{
            data: {
              chart: 've-gauge',
              chartSettings: {
                dataType: {
                  '占比': 'percent'
                },
                seriesMap: {
                  '占比': {
                    min: 0,
                    max: 1
                  }
                }
              },
              columns: ['type', 'value'],
              rows: [
                { type: '占比', value: 0.8 }
              ]
            },
            template: 'Chart'
          }
        }
      ]
    ]
  }],
  [
    {
      style: 'width: 30%; flex: initial;',
      query:{
        title: '商品',
      },
      layout: [
        [
          {
          style: 'border-bottom:#f1f1f1 1px solid;',
          fetch: {
            getContent333333(row, all, $set){
              console.log(row, all, $set,'table99999999999999')
            }
          },
          query: {
            title: '可售状态汇总',
            fullScreenName: 'kczzfx',
            subBar: true,
          },
          content:{
            data: {
              chart: 've-funnel',
              chartSettings: {
                sequence: ['订单', '点击', '访问', '展示']
              },
              columns: ['状态', '数值'],
              rows: [
                { '状态': '展示', '数值': 900 },
                { '状态': '访问', '数值': 600 },
                { '状态': '点击', '数值': 300 },
                { '状态': '订单', '数值': 100 }
              ]
            },
            template: 'Chart'
            // template: () => import(/* webpackChunkName: "layout"*/ './template'),  // 查询模板
          }
        }],[
          {
          fetch: {
            getContent333333(row, all, $set){
              console.log(row, all, $set,'table1010101010101010')
            }
          },
          style: 'padding-left: 10px; padding-top: 10px;',
          query: {
            title: '结构分析',
            fullScreenName: 'kczzfx',
            subBar: true,
          },
          content:{
            data: {
              chart: 've-pie',
              chartSettings: {
                roseType: 'radius'
              },
              columns: ['日期', '访问用户'],
              rows: [
                { '日期': '1/1', '访问用户': 1393 },
                { '日期': '1/2', '访问用户': 3530 },
                { '日期': '1/3', '访问用户': 2923 },
                { '日期': '1/4', '访问用户': 1723 },
                { '日期': '1/5', '访问用户': 3792 },
                { '日期': '1/6', '访问用户': 4593 }
              ]
            },
            template: 'Chart'
            // template: () => import(/* webpackChunkName: "layout"*/ './template'),  // 查询模板
          }
        }]
      ]
      
    },{
    style: 'padding-left: 15px',
    layout: [
      [{
        query: {   
          title: '库存'
        },
        layout: [
          [{
            query: {   
              title: '库存周转分析',
              subBar: true,
              fullScreenName: 'cczzfx1'
            },
            content:{
              data: {
                chart: 've-line',
                chartSettings: {
                  stack: { '用户': ['访问用户', '下单用户'] },
                  area: false
                },
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
            }
          },{
            query: {   
              title: '存销比分布',
              subBar: true,
              fullScreenName: 'cxbfb1'
            },
            content:{
              data: {
                chart: 've-pie',
                chartSettings: {
                  roseType: 'radius'
                },
                columns: ['日期', '访问用户'],
                rows: [
                  { '日期': '1/1', '访问用户': 1393 },
                  { '日期': '1/2', '访问用户': 3530 },
                  { '日期': '1/3', '访问用户': 2923 },
                  { '日期': '1/4', '访问用户': 1723 },
                  { '日期': '1/5', '访问用户': 3792 },
                  { '日期': '1/6', '访问用户': 4593 }
                ]
              },
              template: 'Chart'
            }
          }]
        ]
      }],
      [{
        query: {   
          title: '定价水平指数'
        },
        content:{
          data: {
            chart: 've-line',
            chartSettings: {
              stack: { '用户': ['访问用户', '下单用户'] },
              area: true
            },
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
        }
      }]
    ]
  }]
];