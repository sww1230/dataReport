<template>
  <div class="Layout">

    <div v-if="arr || !row.query && row.layout">
      <flexbox :data="row">
        <template slot-scope="data" >
          <Layout v-if="!data.data.query" :row="data.data.layout" :info="info" ></Layout>
          <Layout v-else :row="data.data" :info="info" ></Layout>
        </template>
      </flexbox>
    </div>

    <TitleBar v-if="!arr && (row.query || row.content)" :row="row" :info="info" :class="customCss()">
      <div v-if="row.layout && row.layout.length">
        <flexbox :data="row.layout">
          <template slot-scope="data">
              <Layout :row="data.data" :info="info" :hasCss="true"></Layout>
          </template>
        </flexbox>
      </div>
    </TitleBar>



  </div>
</template>

<script>
import flexbox from './flexbox'
export default {
  name: 'Layout',
  props:['row', 'info', 'hasCss'],
  components: {
    flexbox
  },
  data() {
    return {
      arr: this.row instanceof Array
    }
  },
  methods: {
    customCss(){
      if(this.row.query && this.row.query.subBar && !this.hasCss){
        return 'bg-white text-sm shadow pt-3 pl-3 pr-3 mb-4 rounded'
      }
      if(this.hasCss){
        return 'pt-0 pl-3 pr-3 '
      }
    }
  },
}
</script>