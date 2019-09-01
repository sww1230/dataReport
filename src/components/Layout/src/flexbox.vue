<template>
  <div>
    <div v-for="(rows,index) in data" :key="index" class="flex flex-1">
      <div v-for="(row,i) in rows" :key="i" class="flex-1" :style="row.style || ''">
        <!-- 内容区 -->
        <slot :data="row"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flexbox',
  components: {},
  props: ['data']
}
</script>