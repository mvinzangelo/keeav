<script setup>
import { RouterView } from 'vue-router'
import Header from '../src/components/Header.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Header></Header>
      <RouterView />
    </div>
  </header>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>