<script>
export default {
  methods: {
    currentDateTime() {
      const current = new Date();
      const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
      // const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
      const dateTime = date; //+' '+ time;

      return dateTime;
    }
  }
};
</script>


<template>
  <main>
    <div class="headerbox">
      <img alt="Vue logo" class="logo" src="@/assets/hammer.svg" width="90" />
      <div class="namebox">
        <h1>Hammer</h1>
        <p>{{ currentDateTime() }}</p>
      </div>
      <button v-on:click="redirect_to_login"><img alt="Vue logo" class="logo" src="@/assets/human.svg"
          width="70" /></button>
      <!-- <div class="profilepic"> -->
    </div>


  </main>
</template>
<style scoped>
.headerbox {
  width: 100vw;
  display: flex;
  justify-content: space-around;
}

.namebox {
  display: flex;
  flex-direction: column;
}

/*.profilepic{
  height: 50px; 
  width: 50px;
  border-radius: 50%;
  background-color: black; 
} */

h1 {
  text-align: center;
}

h2 {
  text-align: center;
}

main {
  /* background-color: purple; */
  width: 100%;
}
</style>
