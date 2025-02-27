<template>
  <div>
    <router-view></router-view> <!-- Aqui serão renderizadas as views das rotas -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Background fixo para todo o sistema */
body {
  background: url(/images/StarWarsBackground.png);
  height: 100vh;
}
</style>