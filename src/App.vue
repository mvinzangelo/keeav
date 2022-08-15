<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { mapStores } from 'pinia'
import { useLoginStore } from "@/stores/loginStatus";
import Header from '../src/components/Header.vue'
</script>

<script>
export default {
  computed: {
    ...mapStores(useLoginStore),
  },
}
import Voting from './components/Voting.vue'
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

.links {
  display: flex;
  gap: 10px;
}
</style>