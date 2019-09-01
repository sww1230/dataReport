<template>
  <div class="Page flex-1 flex flex-col overflow-hidden overflow-y-auto">
    <!-- 面包屑组件 -->
    <Crumbs v-if="$route.name != 'home'" :data="data" :info="info.crumbs || ''" :all="info" @flod="$emit('flod')"/>
    <div class="m-4 flex-1 overflow-hidden" ref="container">
      <div v-for="(row,key) in info"  :key="key" class="overflow-hidden"> 
        <Layout v-if="key != 'crumbs'" :row="row" :info="info"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props:['data'],
  components: {
  },
  data() {
    return {
      info: {},
      reportData: {}
    }
  },
  watch: {
    '$route' () {
      this.animatedInfo()
    }
  },
  mounted() {
    this.animatedInfo()
  },
  methods:{
    // 添加动画 并为info数据赋值
    animatedInfo(){
      this.$refs.container.className = 'm-4 animated fadeInUpBig'
      let t = ''
      t = setTimeout(() => {
        this.$refs.container && (this.$refs.container.className = 'm-4')
        clearTimeout(t)
      }, 1000);
      this.info = {}
      this.info = this.reportData[this.$route.name] || ''
    }
  }
}
</script>