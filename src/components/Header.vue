<script>
import { RouterLink, RouterView } from 'vue-router'
import { auth } from '../firebaseResources.js';
import { mapStores } from 'pinia'
import { useLoginStore } from "../stores/loginStatus";
import { signOut } from "@firebase/auth";
export default {
  computed: {
    ...mapStores(useLoginStore),
  },
  methods: {
    currentDateTime() {
      const current = new Date();
      const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
      const dateTime = date;
      return dateTime;
    },
    signOut() {
      signOut(auth).then(() => {
        this.loginStore.$reset();
        this.$router.push('/')
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    },
  }
};
</script>


<template>
  <main>
    <div class="headerbox">
      <button>
        <RouterLink to="/"><img alt="Vue logo" class="logo" src="@/assets/human.jpg" width="90" /></RouterLink>
      </button>
      <div class="namebox">
        <h1>Hammer</h1>
        <p>{{ currentDateTime() }}</p>
      </div>
      <button style="position:absolute; right:6.25rem" v-if="this.loginStore.userID" id="compAlign"
        @click="signOut()">Sign
        Out</button>
      <button v-if="this.loginStore.userID == ''">
        <RouterLink to="/login"><img alt="Vue logo" class="logo" src="@/assets/human.svg" width="70" /></RouterLink>
      </button>
      <button v-else>
        <RouterLink to="/profile"><img alt="Vue logo" class="logo" src="@/assets/human.svg" width="70" /></RouterLink>
      </button>
      <!-- <div class="profilepic"> -->
    </div>


  </main>
</template>
<style scoped>
.headerbox {
  display: flex;
  justify-content: space-between;
}

.namebox {
  display: flex;
  flex-direction: column;
  text-align: center;
}

main {
  width: 100%;
}
</style>


