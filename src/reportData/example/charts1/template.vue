<template>
    <!-- <ve-line :data="data" class="flex-1"></ve-line> -->

    <component v-if="data.chart" 
      class="flex-1 flex items-center p-3 pt-0 echarts"
      width="100%" 
      style="width:100%"
      :is="data.chart" 
      :data-empty="data.dataEmpty || false" 
      :loading="data.loading || false" 
      :settings="data.chartSettings || {}" 
      :data="config" 
      :grid="data.grid || grid" 
      :height="data.height || '300px'" 
      :data-zoom="data.dataZoom || []"
      :extend="data.chartExtend || {}"
    >
    </component>


</template>

<script>
  export default {
    props:['data'],
    data () {
      this.grid = {
        bottom:20,
        top:40
      }
      this.config = {
        columns:this.data.columns, rows:this.data.rows
      }
      return {
      }
    },
    watch: {
    },
    mouted(){
    }
  }
</script>