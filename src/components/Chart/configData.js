export default {
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
}