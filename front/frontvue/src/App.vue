<template>
  <div id="app">
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script> 
import Board from './views/Board.vue';

export default {
  name: 'App        ',
  components: {
    Board,
  }
}
</script>

<style>

</style>
