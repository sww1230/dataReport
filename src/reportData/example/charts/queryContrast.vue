<template>
  <div class="flex-1 flex items-center">
    <div class="flex-1"></div>
    <el-radio-group v-model="data.typeValue">
      <el-radio-button v-for="(r, i) in data.tableDimensionTypeList" :key="i" :label="r.value">{{r.name}}</el-radio-button>
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
