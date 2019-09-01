<template>
  <div class="CardContainer pt-3 mb-4 bg-white text-sm shadow">
    <div class="ml-2 mb-2  flex items-center">
      <div class="border-l-4 border-solid border-blue-500 mr-1 h-4" style="margin-top:-1px;"></div>
      <div class="font-medium">{{row.title}}</div>
      <div class="flex-1 flex items-center pl-2 pr-2">
        <!-- 扩展内容 -->
        <div v-if="row.query" class="flex-1 flex items-center">
          <component :is="row.query.template" :data="queryData" @submit="(data)=>row.query.submit && row.query.submit(data, row, $set, info)"></component>
        </div>
      </div>
    </div>
    
    <!-- 对应的主要组件内容 -->
    <template v-if="row.content && row.content.data">
      <component :is="row.content.template" :data="row.content.data" @submit="(data)=>row.content.submit && row.content.submit(data, row, $set, info)"></component>
    </template>
    
    <!-- 主要内容展示区域 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CardContainer',
  components: {},
  props: ['row', 'info'],
  data() {
    return {
      queryData: (this.row.query && this.row.query.data) ? this.row.query.data : '',
      contentData: (this.row.content && this.row.content.data) ? this.row.content.data : ''
    }
  },
  watch: {
    queryParams:{ // 筛选区数据监听
      deep: true,
      handler(newVal,oldVal){
        this.row.listener && this.row.listener('query', JSON.parse(newVal), JSON.parse(oldVal), this.row, this.$set, this.info)
      }
    },
    contentParams:{ // 内容区数据监听
      deep: true,
      handler(newVal,oldVal){
        this.row.listener && this.row.listener('content', JSON.parse(newVal), JSON.parse(oldVal), this.row, this.$set, this.info)
      }
    }
  },
  computed: {
    queryParams(){ // 筛选区数据监听
      return JSON.stringify(this.queryData)
    },
    contentParams(){ // 内容区数据监听
      return JSON.stringify(this.contentData)
    }
  }
}
</script>