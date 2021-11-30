<template>
  <div id="app">
    <HeaderComponent />
    <div class="container">
      <router-view />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from './components/layout/Header.vue';
import FooterComponent from './components/layout/Footer.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,700);

body {
  margin: 0;
  background-color: rgb(201, 170, 230);
}

.container {
  /* max-width: 1500px; */
  margin: 0 auto;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
