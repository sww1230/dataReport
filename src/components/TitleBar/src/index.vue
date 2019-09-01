<template>
<div>

  <div v-if="!row.query && row.content">
    <component :is="row.content.template" :data="row.content.data" @submit="(params)=>row.content.submit && row.content.submit(params, row, info, $set)"></component>
  </div>

  <div v-else :ref="row.query && row.query.fullScreenName ? row.query.fullScreenName : ''" :class="!row.query.subBar && 'pt-3 mb-4 bg-white text-sm shadow rounded'">

    <div v-if="row.query" class="TitleBar flex items-center pb-2">
      <div v-if="!row.query.subBar" class="border-l-4 border-solid border-blue-500 mr-1 h-4 ml-2" style="margin-top:-1px;"></div>
      <div class="font-medium">{{row.query.title}}</div>
      <component v-if="row.query.template" :is="row.query.template" :data="queryData" @submit="(data)=>row.query.submit && row.query.submit(data, row, info, $set)"></component>
      <div v-else class="flex-1"></div>
      
      <i v-if="row.query.fullScreenName" :class="(!row.query.subBar ? 'mr-3 ' : '') + 'el-icon-full-screen cursor-pointer ml-3 hover:text-blue-400 hover:font-extrabold'" @click="fullScreen"></i>
    </div>

    <div v-if="reload && row.content && row.content.data">
        <component :is="row.content.template" :data="row.content.data" @submit="(params)=>row.content.submit && row.content.submit(params, row, info, $set)"></component>
    </div>
    
    <!-- 内容区 -->
    <slot></slot>

  </div>

  

</div>
</template>

<script>
export default {
  name: 'TitleBar',
  components: {},
  props: ['row', 'info'],
  data() {
    return {
      reload: true,
      queryData: this.row.query && this.row.query.data ? this.row.query.data : '',
      contentData: this.row.content && this.row.content.data ? this.row.content.data : ''
    }
  },
  mounted() {
    if(this.row.fetch){
      console.log(this.row.query.title)
      for(let k in this.row.fetch){ 
        this.row.fetch[k](this.row, this.info, this.$set)
      }
    }
  },
  watch: {
    $route(){
      if(this.row.fetch){
        console.log(this.row.query.title)
        for(let k in this.row.fetch){ 
          this.row.fetch[k](this.row, this.info, this.$set)
        }
      }
    },
    queryParams:{ // 筛选区数据监听
      deep: true,
      handler(newVal,oldVal){
        this.row.listener && this.row.listener('bar', JSON.parse(newVal), JSON.parse(oldVal), this.row, this.info, this.$set)
      }
    },
    contentParams:{ // 筛选区数据监听
      deep: true,
      handler(newVal,oldVal){
        this.row.listener && this.row.listener('content', JSON.parse(newVal), JSON.parse(oldVal), this.row, this.info, this.$set)
      }
    }
  },
  computed: {
    queryParams(){ // 筛选区数据监听
      return JSON.stringify(this.queryData)
    },
    contentParams(){ // 筛选区数据监听
      return JSON.stringify(this.contentData)
    }
  },
  methods:{
    fullScreen(){
      console.log(this.contentData, 99)
      this.reload = false
      this.$nextTick(()=>{
        if(this.row.query && this.row.query.fullScreenName){
          let initName = this.row.query.subBar ? '' : 'pt-3 mb-4 bg-white text-sm shadow rounded'
          let className = 'fixed inset-0 z-50 bg-white p-5 border-8 border-solid border-gray-200 animated '
          let dom = this.$refs[this.row.query.fullScreenName];
          if(dom.className == initName){
            dom.className = className+'bounceIn'
            this.reload = true
            this.contentData.chart && (this.contentData.height = '600px')
          }else if(dom.className == className+'bounceIn'){
            dom.className = className+'bounceOut'
            this.reload = true
            setTimeout(() => {
              this.contentData.chart && (this.contentData.height = '')
              this.reload = false
              dom.className = initName
              this.$nextTick(()=>{
                this.reload = true
              })
            }, 1000);
          }
        }
      })
    }
  }
}
</script>