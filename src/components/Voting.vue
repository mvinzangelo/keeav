<script>
export default {
    data() {
        return {
            userVote: 'None'
        }
    },
    props: {
        newsOrg: String,
        author: String,
        userVote: String
    }
}
</script>

<template>
<div class="container">
    <h1>Vote: {{ userVote }}</h1>
    <div class="buttonContainer" v-if="userVote == 'None'">
        <button class="right" @click="userVote = 'Left'">Left</button>
        <button class="left" @click="userVote = 'Right'">Right</button>
    </div>
    <div class="resultContainer" v-else>
        <h2 class="title">Bias Meter</h2>
        <h3 class="news">News Organization: {{newsOrg}}</h3>
        <meter id="newsBias" min="0" max="100" value="50"></meter>
        <h3 class>Author: {{author}}</h3>
        <meter id="newsBias" min="0" max="100" value="50"></meter>
        <h3>Users</h3>
        <meter id="newsBias" min="0" max="100" value="50"></meter>
    </div>
</div>
</template>

