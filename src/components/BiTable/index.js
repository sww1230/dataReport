import BiTable from './src/index.vue'

BiTable.install = function(Vue) {
  Vue.component(BiTable.name, BiTable);
};

export default BiTable;
