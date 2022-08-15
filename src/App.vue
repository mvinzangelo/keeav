<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { mapStores } from 'pinia'
import { useLoginStore } from "@/stores/loginStatus";
import MainHeader from '../src/components/MainHeader.vue'
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
      <MainHeader></MainHeader>
      <Voting articleID ="H4A0nwjJKTsZanMHVZIx"/>
      <nav class="links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/comment">Comment</RouterLink>
      </nav>
    </div>
  </header>
</template >

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