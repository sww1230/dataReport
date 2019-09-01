<template>
    <label>
        <el-menu-item  v-if="model && !model.children" :index="model.router ? model.router.path : model.index" :route="model.router || ''" >
          <span v-if="model.icon" :class="'iconfont mr-2 '+model.icon"></span>
          <span v-if="!hasChild"  :class="!model.icon && 'point'"  slot="title">{{model.name}}</span>
        </el-menu-item>
        <el-submenu  v-if="hasChild" :index="model.index">
        <template slot="title">
          <span v-if="model.icon" :class="'iconfont mr-2 '+model.icon"></span>
          <span v-if="!isCollapse" slot="title">{{model.name}}</span>
        </template>
        <menutree v-for="item in model.children" :model="item" :key="item.index" ></menutree>
        </el-submenu>
    </label>
</template>

<script>
export default {
    name: "menutree",
    props: ['model', 'isCollapse'],
    computed:{
      hasChild(){
        return this.model.children && this.model.children.length
      }
    }
}
</script>
<style>
.point{
  padding-left: 10px;
}
.point::before{
    width: 6px;
    height: 6px;
    border-radius: 6px;
    display: inline-block;
    content: "";
    top: 22px;
    left: 35px;
    background:#e1e1e1;
    position: absolute;
}
.el-menu-item.is-active .point::before{
  background:#4299e1 !important;
}
.el-submenu__title:hover,.el-menu-item:hover{
    outline: 0 !important;
    background-color: #f6f6f6 !important;
}
.el-menu-item.is-active {
    background: #edf2f7 !important;
    border-left: 3px solid #4299e1 !important;

}

::-webkit-scrollbar {
  width: 0px !important;
  height: 0px !important;
}
.el-menu--collapse .el-submenu__icon-arrow{
  display: none;
}
.el-menu--vertical .point::before{
  left: 18px;
  top:26px;
}
</style>

