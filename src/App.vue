<template>
  <PageHeader/>
  <router-view/>
</template>

<script>
import PageHeader from '@/components/PageHeader'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: #d9d9d9;
}

#nav a {
  font-size: 50px;
  font-weight: bold;
  text-decoration:none; color:#333;}

h2{color:black;}
table{width:100%; border-collapse:collapse;}
.wrap{width:100%;}
.container{width:800px; margin:0 auto;}
a{text-decoration:none;}
.btn{padding:10px; background:#34445c; color:#fff;}



</style>