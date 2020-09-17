<template>
  <div id="app">
    <nav-bar></nav-bar>
    <main class="route-container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import NavBar from "./components/Navbar";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Roboto Mono", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #e0e5ec;
}
.route-container {
  width: 50%;
  margin: 0 auto;
}
.full-width {
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .route-container {
    width: 70%;
  }
}

@media only screen and (max-width: 600px) {
  .route-container {
    width: 90%;
  }
}
</style>
