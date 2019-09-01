<template>
  <div class="flex-1 flex items-center">
    <div class="flex-1"></div>
    <div class="font-semibold text-gray-700">分析维度：</div>
    <el-radio-group class="ml-3 mr-3" v-model="data.nmType">
      <el-radio v-for="(r, i) in data.nmTypeOptions" :key="i" :label="r.value">{{r.name}}</el-radio>
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
