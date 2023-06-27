<template>
  <header>
    <div id="nav">
      <h1><router-link to="/home"><img src="../assets/5134814.png" width="130"></router-link></h1> 
      <p><router-link to="/board">레시피게시판</router-link></p> 
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
header{width:100%; text-align:center; position:relative; height:200px; }
header h1{position:absolute; top:0; left:30px;}
header p{text-align:right;}
#nav {
  padding: 30px;
  background-color: #d9d9d9;
}

#nav a {
  font-size: 50px;
  font-weight: bold;
  text-decoration:none; color:#333;}
</style>