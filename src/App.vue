<script setup>
import { RouterView } from 'vue-router'
import Header from '../src/components/Header.vue'
import Footer from '../src/components/Footer.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Header></Header>
      <RouterView :key="$route.fullPath" @showLoading="showLoading" />
      <Footer></Footer>
    </div>
  </header>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-x: hidden;
  gap: 10px;
}
</style>