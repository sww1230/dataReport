<template>
  <div class="flex-1 flex items-center">
    <div class="flex-1"></div>
    <el-radio-group v-model="data.radio">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
    <el-select v-model="data.value" placeholder="请选择" size="mini">
      <el-option
        v-for="item in data.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <button @click="$emit('submit', data)">as</button>
  </div>
</template>

<script>
  export default {
    props:['data']
  }
</script>