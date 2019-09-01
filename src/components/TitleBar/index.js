import TitleBar from './src/index.vue'

TitleBar.install = function(Vue) {
  Vue.component(TitleBar.name, TitleBar);
};

export default TitleBar;
