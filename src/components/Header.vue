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
      <!-- <button> -->
        <RouterLink to="/"><img alt="Vue logo" class="logo" src="@/assets/hammer.svg" width="90" /></RouterLink>
      <!-- </button> -->
      <div class="namebox">
        <h1>H<span id="ammer">ammer</span></h1>
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

@import url('https://fonts.googleapis.com/css2?family=Coda:wght@800&family=Lobster&display=swap');
.headerbox {
  
  /* padding: 10px; */
  background-color: rgb(191, 191, 191);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 5px solid black;
}

.namebox {
  display: flex;
  /* background-color: cadetblue; */
  flex-direction: column;
  text-align: center;
}
#ammer {
  font-family: 'Lobster', cursive;
  font-size: 40px;
  position: relative;
  top: -15px;
  color: burlywood;
  text-shadow: 2px 1px rgb(165, 93, 42);
  left: -3px;
}
h1
{
  /* vertical-align: baseline; */
  
  font-family: 'coda', cursive;
  vertical-align: center;
  color: rgb(56, 56, 56);
  /* margin-top: 30px; */
  position: relative;
  margin-top: 5px;
  font-size: 70px;
  /* background-color: aquamarine; */
}
main {
  width: 100%;
}
</style>


