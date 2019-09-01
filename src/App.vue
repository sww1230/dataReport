<template>
  <div class="flex fixed inset-0 flex-col">
    
    <!-- <iframe src="http://localhost:88/#/header" class="app-header navbar" frameborder="0" height="66px;" scrolling="no" ref="iframe"></iframe> -->

    <div id="app" class="flex flex-1 overflow-hidden">

      <Menu
        ref="menu"
        :collapseVal="$root.conf.collapseVal" 
        :stytemName="$root.conf.stytemName"
        :currentIndex="$root.conf.currentIndex"
        :menuData="$root.conf.menuData"
        :showRouter="$root.conf.showRouter"
        :cssStyle="$root.conf.cssStyle"
        @handleMenu="handleMenu"
      />

      <!-- <g-sider-menu :data="menuData" /> -->

      <div class="bg-gray-200 flex-1 flex overflow-hidden">
        <router-view :data="crumbsData" @flod="()=>$refs.menu.flod()"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      crumbsData: '', // 面包屑数据
      // menuData: []
    }
  },
  watch: {
    // $route(to){
    //   this.getCurmbsData(to.path)
    // }
  },
  methods:{
    // getCurmbsData(path){
    //   let arr = []
    //   this.menuData.data.some(row=>{
    //     if(row.items){
    //       let res = false
    //       row.items.some(r => {
    //         if(r.url == path){
    //           arr = [{
    //             index: row.key,
    //             name: row.title
    //           },{
    //             index: r.key,
    //             name: r.title
    //           }]
    //           res = true
    //           return true
    //         }
    //       })
    //       this.crumbsData = arr
    //       return res
    //     }
    //   })
    // }
    handleMenu(obj){
      if(obj.key == 'select'){
        let crumbsData = []
        localStorage.currentMenu = JSON.stringify(obj)
        const path = obj.val.indexPath[0]
        if(!isNaN(path)){
          let menu = this.$root.conf.menuData[path]
          menu.children.some(r=>{
            if(r.index == obj.val.index){
              crumbsData.push({
                name: menu.name,
                index: menu.index
              })
              crumbsData.push({
                name: r.name,
                index: r.index
              })
              return true
            }
          })
        }
        this.crumbsData = crumbsData.length ? crumbsData : '';
      }
    }
  },
  // created(){
  //   let menu = []
  //   let count = 1
  //   let defaultSelectedKeys = '1'
  //   this.$root.conf.menuData.map(r => {
  //     let o = {
  //       iconClass: r.icon,
  //       key: String(count++),
  //       title: r.name,
  //       url: r.router ? r.router.path : ''
  //     };
  //     if(!r.children && r.router && r.router.path == this.$router.history.current.path){
  //       defaultSelectedKeys = String(count)
  //     }
  //     if(r.children){
  //       let sub = []
  //       r.children.map( row => {
  //         sub.push({
  //           key: String(count++),
  //           title: row.name,
  //           url: row.router.path
  //         })
  //         if(row.router.path == this.$router.history.current.path){
  //           defaultSelectedKeys = String(count)
  //         }
  //       })
  //       o.items = sub
  //     }
  //     menu.push(o)
  //   })
  //   this.menuData = {
  //     defaultSelectedKeys: [defaultSelectedKeys],
  //     data:menu
  //   }
  //   this.getCurmbsData(this.$router.history.current.path)
  // },
  mounted() {

    localStorage.currentMenu && (this.handleMenu(JSON.parse(localStorage.currentMenu)))

    // this.$ajax.module1.getDetail({id:11}).then(res=>{
    //   console.log(res, 444444)
    // })
    // this.$ajax.get('/GET/getTest').then(function (response) {
    //   console.log(response,6666655);
    // }).catch(function (error) {
    //   console.log(error,555666);
    // });
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
#app /deep/ .ant-menu-inline-collapsed{width:52px;}
</style>
