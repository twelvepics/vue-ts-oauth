<template>
  <div id="app" class="is-centered">
    <div id="nav" class="has-text-centered" style="margin: 1em 0 5em 0">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div class="has-text-centered">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss"></style>
