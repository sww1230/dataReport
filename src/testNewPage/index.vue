<template>
  <div class="flex fixed inset-0 flex-col bg-white">
     <div class="flex flex-1 overflow-y-auto">
      <Menu
        ref="menu"
        :collapseVal="conf.collapseVal" 
        :stytemName="conf.stytemName"
        :currentIndex="conf.currentIndex"
        :menuData="conf.menuData"
        :showRouter="conf.showRouter"
        :cssStyle="conf.cssStyle"
        @handleMenu="handleMenu"
      />
      <div class="bg-gray-200 flex-1 flex overflow-hidden">
        <component v-if="currentMenu" :is="currentMenu"/>
      </div>
    </div>
  </div>

</template>
<script>

export default {
  components: {
  },
  data() {
    return {
      currentMenu: '',
      conf: {
        stytemName: '数据平台',
        collapseVal: false,
        showRouter: false,
        currentIndex: 'menu',
        menuData: [
          {
            index: 'nav',
            name: '导航',
            icon: 'icon-shouye-cai text-blue-600'
          },
          {
            index:'test',
            name: '菜单',
            icon: 'icon-zonghezhibiao text-pink-400',
            children:[
              {
                index:'menu',
                name: '实绩'
              }
            ]
          },
          {
            index: 'back',
            name: '返回',
            icon: 'icon-shouye-cai text-blue-600'
          }
        ]
      }
    }
  },
  methods:{
    handleMenu(menu){
      if(menu.key == "select"){
        if(menu.val.index == 'back'){
          localStorage.currentPath = '/'
          this.$router.push({path: '/'})
          return
        }
        this.currentMenu =  () => import(/* webpackChunkName: "home"*/ '@/testNewPage/test/'+menu.val.index)
      }
    }
  },
  mounted() {
    this.currentMenu =  () => import(/* webpackChunkName: "home"*/ '@/testNewPage/test/'+this.conf.currentIndex)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-button:hover, .el-button:focus{
  outline: none;
}
</style>
