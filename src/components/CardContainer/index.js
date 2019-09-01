import CardContainer from './src/index.vue'

CardContainer.install = function(Vue) {
  Vue.component(CardContainer.name, CardContainer);
};

export default CardContainer;
