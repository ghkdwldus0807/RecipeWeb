<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Express with Vue",
      message: "Welcome to Vue on the server side!",
    };
  },
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
