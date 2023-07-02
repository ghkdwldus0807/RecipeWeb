<template>
  <header>
    <div id="nav">
      <h1><router-link to="/"><img src="./5134814.png"></router-link></h1> 
      <p><router-link to="/board/list">레시피게시판</router-link></p> 
  
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
header{width:100%; position:relative; height:25vh;}
header h1{position:absolute; top:0; left:1vw; width:13vw;}
header p{text-align:right;}
</style>