<template>
  <div class="Crumbs bg-white p-4 shadow-md flex">
    <div class="mr-1" style="font-size:14px; color:#606266; line-height:1;"><span class="iconfont icon-dizhi"></span> 当前位置：</div>
    <div style="margin-top:2px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" >
        <el-breadcrumb-item v-for="(row,index) in data" :key="index">{{row.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <i v-if="info && info.icon" class="el-icon-info ml-2 cursor-pointer" @click="setSlide" style="color:#606266;"></i>
    <div v-if="info && info.icon" 
        class="fixed top-0 bottom-0 w-1/5 bg-white shadow-lg tabBox z-10" 
        style="right: -20%;"
        ref="tabBox">
      <div class="shadow-md flex items-center justify-center p-3" >
        <div class="w-11/12 bg-gray-200 rounded-full flex text-center text-xs">
          <div :class="'rounded-full flex-1 cursor-pointer leading-loose'+ (tabType == 0 ? ' bg-blue-500 text-white shadow-md': '')" @click="tabType = 0">定义</div>
          <div :class="'rounded-full flex-1 cursor-pointer leading-loose'+ (tabType == 1 ? ' bg-blue-500 text-white shadow-md': '')" @click="tabType = 1">公式</div>
          <div :class="'rounded-full flex-1 cursor-pointer leading-loose'+ (tabType == 2 ? ' bg-blue-500 text-white shadow-md': '')" @click="tabType = 2">口径</div>
        </div>
      </div>
      <div class="p-3 text-sm">
        <div v-if="info.content && info.content[tabType]" v-html="info.content[tabType]"></div>
      </div>
    </div>
    <div class="flex-1"></div>
    <div v-if="info.time" class="text-xs text-gray-600">数据上次更新时间：{{info.time}}</div>
  </div>
</template>

<script>
export default {
  name: 'Crumbs',
  components: {},
  props: ['data', 'info', 'all'],
  data() {
    return {
      tabType: 0
    }
  },
  watch: {
    info(val){
      if(val.fetch){
        console.log('面包屑2')
        for(let k in val.fetch){ 
          val.fetch[k](val, this.all, this.$set)
        }
      }
    }
  },
  computed: {
  },
  mounted() {
    if(this.info.fetch){
        console.log('面包屑1')
        for(let k in this.info.fetch){ 
          this.info.fetch[k](this.info, this.all, this.$set)
        }
      }
  },
  methods: {
    setSlide(){
      // this.$emit('flod');
      (this.$refs.tabBox.style.right == '-20%' || !this.$refs.tabBox.style.right)
        ? (this.$refs.tabBox.style.right = '0px')
        : (this.$refs.tabBox.style.right = '-20%');
    }
  }
}
</script>

<style>
  .tabBox {
    transition: right 300ms ease-in;
  }
</style>
