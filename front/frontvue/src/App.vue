<template>
  <div id="app">
    <div id="header">
      <pageHeader/>
    </div>
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader';
import Board from './views/Board.vue';

export default {
  name: 'App',
  components: {
    PageHeader,
    Board
}
}
</script>

<style>


</style>