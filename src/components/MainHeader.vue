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
