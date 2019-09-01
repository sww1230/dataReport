import Layout from './src/index.vue'

Layout.install = function(Vue) {
  Vue.component(Layout.name, Layout);
};

export default Layout;
