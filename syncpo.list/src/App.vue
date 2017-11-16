<template>
  <div id="app">
<!--     <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
*, *:after, *:before {
  box-sizing: border-box;
}
html, body, #app {
  height: 100%;
}
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(250,250,250);
}
</style>
