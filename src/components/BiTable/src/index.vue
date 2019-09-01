<template>
  <div class="BiTable" v-loading="data.loading">
    <component class="mb-2" v-if="data.query" :is="data.query.template" :data="data.query.data" @submit="(params)=>$emit('submit',params)"></component>
    <el-table
      class="w-full"
      :data="data.tableData"
      :border="data.border || false"
      :size="data.size || 'small'"
      :cell-style="(data.allBorder || data.columnIndex) && cellStyle"
      :header-cell-style="(data.allBorder || data.columnIndex) && cellStyle"
      @sort-change="tableSortChange"
      >
      <el-table-column
        v-for="(row, index) in data.column"
        :key="index"
        :sortable="row.sortable ? 'custom' : false"
        :fixed="row.fixed || false"
        :align="row.align || 'left'"
        :prop="row.field || ''"
        :label="row.label"
        :width="row.width || ''">
        <template v-if="row.column">
          <el-table-column v-for="(r,i) in row.column" 
            :key="i"
            :sortable="r.sortable ? 'custom' : false"
            :prop="r.field || ''"
            :label="r.label"
            :align="r.align || 'left'"
            :width="r.width || ''">
            <template slot-scope="scope">
              <!-- <div v-if="r.template" v-html="r.template(scope.row)"></div> -->
              <generate v-if="r.template" :template="r.template" :scopeData="scope"></generate>
              <div v-else>{{scope.row[r.field]}}</div>
            </template>
          </el-table-column>
        </template>
        <template slot-scope="scope">
          <!-- <div  v-if="row.template" v-html="row.template(scope.row)"></div> -->
          <generate v-if="row.template" :template="row.template" :scopeData="scope"></generate>
          <div v-else>{{scope.row[row.field]}}</div>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex pt-3 pb-3" v-if="data.page">
      <div class="flex-1"></div>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="data.page.currentPage"
        :page-size="data.page.pageSize"
        :page-sizes="[5, 10, 20, 30, 50, 100, 200]"
        layout="total, prev, pager, next, sizes"
        :total="data.page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BiTable',
    props:['data'],
    provide() {
      return {
        tableComponent: this
      };
    },
    data () {
      return {
      }
    },
    components: {
       generate: {
        props: {
          template: String, // 自定义模板
          scopeData: Object // 当前作用域中 slot-scope 中的scope
        },
        inject: ['tableComponent'], // 对应 BiTable的provide
        render(h) {
          const tableComponent = this.tableComponent;
          const parentScope = this.scopeData;
          const currentData = Object.assign({}, tableComponent.$data || {}, { scope: parentScope });
          const currentMethods = Object.assign({}, tableComponent.$options.methods || {}, this.$listeners, {submit: (row)=>{tableComponent.$emit('submit',row)}})
          const currentComponents = Object.assign({}, tableComponent.$options.components || {});
          const temp = {
            template: this.template || '<div>111</div>',
            data() {
              return currentData
            },
            methods: currentMethods,
            components: currentComponents
          };
          return h(temp)
        }
      }
    },
    watch: {
      'data.page.currentPage'(){
        this.$emit('submit',this.data)
      },
      'data.page.pageSize'(){
        if(this.data.page.currentPage != 1){
          this.data.page.currentPage = 1
        } else {
          this.$emit('submit',this.data)
        }
      }
    },
    mouted(){},
    methods: {
      tableSortChange(column) {
        if (column.order === 'descending') {
          this.$set(this.data, 'reverse', 'true')
          this.$set(this.data, 'sortName', column.prop)
        } else if(column.order === 'ascending'){
          this.$set(this.data, 'reverse', 'false')
          this.$set(this.data, 'sortName', column.prop)
        }else{
          if(this.data.sortName){
            delete this.data.sortName
            delete this.data.reverse
          }
        }
        if(this.data.page.currentPage != 1){
          this.data.page.currentPage = 1
        }else{
          this.$emit('submit',this.data)
        }
      },
      cellStyle(row){
        let s = ''
        if(this.data.allBorder == 'none'){
          s = 'border:none;'
        }
        this.data.columnIndex.some(i => {
          if(row.columnIndex == i){
            s += 'border-right: 1px solid #edf2f7;'
            return true
          }
        })
        return s
      },
      handleSizeChange(val) {
        this.data.page.pageSize = val
      },
      handleCurrentChange(val) {
        this.data.page.currentPage = val
      }
    },
  }
</script>

<style scope>
  /* 设置table header的背景颜色 */
    .el-table__header th, .el-table__header tr {
        background-color: #f5f6f7;
        color: #4a5568;
    }
    .BiTable /deep/ a{
      color: #4299e1;
    }
    .BiTable /deep/ a:hover{
      color: #045699;
    }
    .BiTable /deep/ button{
      padding: 1px 8px;
      line-height: 25px;
      height: 25px;
      border: 1px solid #c0e2ff;
      background: #f5faff;
      border-radius: 5px;
      outline: none;
    }
    .BiTable /deep/ button:hover{
      background: #e1edf8;
    }
    .BiTable /deep/ .el-loading-spinner .circular{
      margin:auto;
    }
</style>