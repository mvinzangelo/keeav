<script>
// local functions can be decalred here
export default {
    props: {
        // properties go here
        // ex: title: String,
    },
    data() {
        return {
            // responsive variables go here
            user: '',
            pass: '',
            // ex: count: 0,
            //need a submit button
            //maybe one day we will have a sign in with other sites button
        }
    },
    methods: {
        submit(user, pass) {
            alert(user + " " + pass);
        },
        signup() {

        }
        // callable functions for HTML go here
        // ex: incCount()
        // {
        //     this.count++;
        // }
    }
}
</script>
<template>
    <!-- HTML for components goes here -->
    <p>Username:</p>
    <input v-model="user" placeholder="username here" />
    <p>Password:</p>
    <input v-model="pass" placeholder="password here" />

    <br>
    <button @click="submit(user, pass)">Log in</button>
    <br>
    <button @click="signup()">Sign up</button>
</template >
    <style scoped>
    /* Styles for component go here */
    </style>