<template>
  <div class="flex-1 flex items-center">
    <el-tooltip class="ml-6" style="line-height:18px; width:18px; height:18px; border-radius:9px; background:#cbd5e0; cursor: pointer; text-align:center; color:white;"
      effect="dark" content="下载全部门店数据" placement="right">
      <i class="el-icon-download" @click="$emit('submit', data)"></i>
    </el-tooltip>
   
    <div class="flex-1"></div>
    <el-radio-group class="ml-3 mr-3" v-model="data.typeValue">
      <el-radio v-for="(r, i) in data.tableDimensionTypeList" :key="i" :label="r.value">{{r.name}}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    props:['data'],
    data() {
      return {
      }
    }
  }
</script>
<style lang="css">
  .el-radio{
    margin-right: 15px;
  }
</style>
