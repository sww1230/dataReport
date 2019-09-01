<template>
  <div class="flex-1 flex flex-wrap p-1 pt-0 pb-1">
    <!-- 开始结束日期 -->
    <div class="mb-2 ml-2 w200">
      <el-date-picker
        style="width:100%"
        v-model="data.time"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </div>

    <!-- 大区列表 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.areaValue" collapse-tags clearable multiple 
      placeholder="请选择大区">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.areaOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 分部列表 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.branchValue" collapse-tags clearable multiple 
      placeholder="请选择分部">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.branchOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 门店列表 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.storeValue" collapse-tags clearable multiple 
      placeholder="请选择门店">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.storeOptions"
        :key="item.code+item.department_code+item.name"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
 
    <!-- 一级品类列表 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.firstValue" collapse-tags clearable multiple 
      placeholder="十大品类:不限">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.firstOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 二级品类列表 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.secondValue" collapse-tags clearable multiple 
      placeholder="品类:不限">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.secondOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 三级品类列表 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.thirdValue" collapse-tags clearable multiple 
      placeholder="三级品类:不限">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.thirdOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 品牌列表 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.brandValue" collapse-tags clearable multiple 
      placeholder="品牌:不限">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.brandOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 业务机型 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.businessModelValue" collapse-tags clearable multiple 
      placeholder="业务机型:不限">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.businessModelList"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 渠道列表 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.channelValue" collapse-tags clearable multiple 
      placeholder="请选择">
      <el-option label="全选" value="all" />
      <el-option
        v-for="item in data.channelOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 经营方式 -->
    <el-select class="mb-2 ml-2 w200" 
      v-model="data.operationModelValue" collapse-tags clearable 
      placeholder="经营方式:不限">
      <el-option
        v-for="item in data.operationModelList"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>

    <!-- 商品编码 -->
    <el-input class="mb-2 ml-2 w200" v-model="data.skuNo" placeholder="逗号分隔，可同时搜索多个商品编码"></el-input>

    <!-- 商品名称 -->
    <el-input class="mb-2 ml-2 w200" v-model="data.skuName" placeholder="商品名称, 支持模糊查询"></el-input>

    <div  class="mb-2 ml-2 w200">
      <el-button type="primary" style="height:1.7rem" @click="$emit('submit', data)">查询</el-button>
    </div>
    

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
  .w200{width:220px;}
</style>