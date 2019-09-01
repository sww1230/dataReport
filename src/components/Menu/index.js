import Menu from './src/index.vue'

Menu.install = function(Vue) {
  Vue.component(Menu.name, Menu);
};

export default Menu;
