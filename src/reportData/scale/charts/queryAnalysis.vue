<template>
  <div class="flex-1 flex items-center">

    <div class="circularIcon bg-gray-400 hover:bg-gray-600 ml-8"  @click="data.moveNum--">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="circularIcon bg-gray-400 hover:bg-gray-600 ml-1"  @click="data.moveNum++">
      <i class="el-icon-arrow-right"></i>
    </div>

    <div class="flex-1"></div>
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
  .circularIcon{
    color:#fff;
    width:20px;
    height:20px;
    border-radius: 10px;
    line-height: 20px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
  }
</style>
