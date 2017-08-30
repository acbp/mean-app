<template>
  <div id="app">
    <nav class="nav nav-pills nav-fill">
      <router-link class="nav-item nav-link" to="/">Home</router-link>
      <router-link class="nav-item nav-link" to="/products">Produtos</router-link>
      <router-link class="nav-item nav-link " to="/categories">Categorias</router-link>
    </nav>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
