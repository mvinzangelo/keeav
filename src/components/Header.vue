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
    /*currentDateTime() {
      const current = new Date();
      const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
      const dateTime = date;
      return dateTime; 
    },*/
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
      <button id="logo-button" @click="$router.push('/')">
        <div id="namebox">
          <h1>H<span id="ammer">ammer</span></h1>
        </div>
      </button>

      <!-- <button style="position:absolute; right:6.25rem" v-if="this.loginStore.userID" id="compAlign"
        @click="signOut()">Sign
        Out</button> -->
      <div class="right-cluster">
        <ol class="nav-links">
          <li>topics</li>
          <li>
          <RouterLink to="/publisher">publisher</RouterLink></li>

        </ol>
        <button v-if="this.loginStore.userID == ''" class="profile">
          <RouterLink to="/login"><img alt="Vue logo" src="@/assets/userPlaceholder.jpg" />
          </RouterLink>
        </button>
        <button v-else class="profile">
          <RouterLink to="/profile"><img alt="Vue logo" :src=this.loginStore.image />
          </RouterLink>
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Coda:wght@800&family=Lobster&display=swap');

.headerbox {
  /* padding: 20px; */
  padding: 10px 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
}

#namebox {
  display: flex;
  /* background-color: cadetblue; */
  flex-direction: column;
  text-align: center;
  text-decoration: none;
}

#ammer {
  /* font-family: 'Lobster', cursive; */
  font-size: 40px;
  position: relative;
  top: -15px;
  left: -3px;
}

h1 {
  /* vertical-align: baseline; */
  vertical-align: center;
  /* margin-top: 30px; */
  position: relative;
  margin-top: 5px;
  font-size: 70px;
}

main {
  width: 100%;
}

.nav-links, a {
  font-size: 1.5rem;
  display: flex;
  gap: 40px;
  font-family: 'Lobster', cursive;
  align-items: center;
  color: rgb(87, 87, 87);
  /* text-shadow: 2px 1px rgb(80, 80, 80); */
}

#logo-button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  font-family: 'Lobster', cursive;
  text-shadow: 2px 1px var(--dark-byzantium);
  color: var(--bright-lilac);
}

#logo-button:hover {
  text-shadow: 2px 1px var(--bright-lilac);
  color: var(--dark-byzantium);
}

.profile {
  border-radius: 50%;
  overflow: hidden;
  border: 0;
  box-shadow: 2px 1px var(--dark-byzantium);
  /* background-color: var(--bright-lilac); */
  padding: 0;
}

.right-cluster {
  display: flex;
  gap: 50px;
}

img {
  height: 80px;
  float: left;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

li:hover, a:hover {
  color: var(--bright-lilac);

}
</style>


