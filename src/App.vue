<template>
  <div id="app">
    <HeaderComponent />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/layout/Header.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,700);

.container {
  max-width: 1500px;
  margin: 0 auto;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
