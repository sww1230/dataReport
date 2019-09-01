<template>

<div class="relative flex" >
  <div  class="overflow-hidden overflow-y-auto menu">

    <div class="pl-1 p-3 pl-4 flex items-center bg-blue-200  text-blue-900 cursor-pointer hover:text-white hover:bg-blue-300" @click="isCollapse = !isCollapse" >
      <i class="text-2xl el-icon-menu cursor-pointer"></i>
      <span v-if="!isCollapse" class="text-base pl-2 font-black">{{stytem}}</span>
    </div>

    <el-menu unique-opened 
      :router="isRouter" 
      :default-active="currentIndex" 
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose" 
      @select="select"
      :collapse="isCollapse"
      :background-color="css.background" 
      :text-color="css.textCor" 
      :active-text-color="css.activeCor"
      style="margin-right:-2px;">
        <menutree v-for="(menuItem,i) in menuData" :isCollapse="isCollapse" :key="i" :model="menuItem"></menutree>
    </el-menu>

  </div>

  <div @click="isCollapse = !isCollapse" class="absolute cursor-pointer flod">
    <i v-if="!isCollapse" class="el-icon-arrow-left"></i>
    <i v-else class="el-icon-arrow-right"></i>
  </div>

</div>
</template>

<script>
  import menutree from "./menutree";
  export default {
    name: 'Menu',
    props: {
        collapseVal:{
          type: Boolean,
          default: false
        },
        showRouter:{
          type: Boolean,
          default: false
        },
        currentIndex:{
          type: String,
          default: '1'
        },
        menuData:{
          type: Array
        },
        cssStyle:{
          type: Object,
          default: () => ({
            background: "white",
            textCor: "#363f44",
            activeCor: "#409eff"
          })
        },
        stytemName:{
          type: String,
          default: ''
        }
    },
    data() {
      return {
        isCollapse: this.collapseVal,
        isRouter: this.showRouter,
        stytem: this.stytemName,
        css: {
          background: this.cssStyle.background,
          textCor: this.cssStyle.textCor,
          activeCor: this.cssStyle.activeCor
        }
      }
    },
    watch: {
      collapseVal(collapseStatus) {
        if (this.isCollapse !== collapseStatus) {
          this.isCollapse = collapseStatus;
        }
      },
      showRouter(routerStatus) {
        if (this.isRouter !== routerStatus) {
          this.isRouter = routerStatus;
        }
      },
      cssStyle(val) {
        this.css = val;
      }
    },
    components: {
        menutree: menutree
    },
    methods: {
      flod(){
        this.isCollapse = !this.isCollapse
      },
      select(index, indexPath){
        this.$emit('handleMenu', {
          key: 'select',
          val: {index, indexPath}
        })
      },
      handleOpen(key, keyPath) {
        this.$emit('handleMenu', {
          key: 'open',
          val: {key, keyPath}
        })
      },
      handleClose(key, keyPath) {
        this.$emit('handleMenu', {
          key: 'close',
          val: {key, keyPath}
        })
      }
    }
  }
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.menu{
  background:white; 
}
.flod{
  right: -14px; top:40%; background:#449aff; color:white; border-radius: 0 5px 5px 0; width: 14px; height: 35px; line-height:35px; text-align:center;
}
</style>