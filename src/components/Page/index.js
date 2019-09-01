import Page from './src/index.vue'

Page.install = function(Vue, configData) {
  Vue.component(Page.name, Object.assign(Page,{
    data() {
      return {
        info: {},
        reportData: configData
      }
    }
  }));
};
export default Page;
