<script setup lang="ts">
</script>

<template>
  <div class="pl-20 pt-20">
    <div class="mb-20">
      <router-link class="blue-span" to="home">Home</router-link>
      <router-link class="blue-span" to="test">Test</router-link>
      <router-link class="blue-span" to="login">Login</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
  .blue-span {
    margin-right: 15px;
    &.router-link-active {
      font-weight: 700;
    }
  }
</style>
