import Chart from './src/index.vue'

Chart.install = function(Vue) {
  Vue.component(Chart.name, Chart);
};

export default Chart;
