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
</script>

<template>
  <header>
    <div class="wrapper">
      <MainHeader></MainHeader>
      <RouterView />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/comment">Comment</RouterLink>
      </nav>
    </div>
  </header>
</template >

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;

  width: 100vw;
}

.logo {
  display: block;
}

nav {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
