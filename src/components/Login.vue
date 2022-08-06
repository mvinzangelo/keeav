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
            createAcc: true,
            userNotValid: false,
            user: '',
            pass: '',
            userError: ''
            // ex: count: 0,
            //need a submit button
            //maybe one day we will have a sign in with other sites button
        }
    },
    methods: {
        emptyRes(message) {
            this.name = "emptyRes";
            this.message = message;
        },
        isLoginUserValid(user) {
            try {
                if (!user.length) {
                    throw new emptyRes("Your username must contain characters!");
                }
            } catch (e) {
                userNotValid = true;
                userError = e.message;
            }
            if (name.search(/[^A-Za-z\s]/) != -1) {
                throw new invalidPas("Invalid name");
            }
        },
        isLoginPassValid(pass) {
            if (!pass.length) {
                throw new emptyRes("Your password must contain characters!");
            }
        },
        submit(user, pass) {
            //isLoginUserValid(user);
            //isLoginPassValid(pass);
            alert(user + " " + pass);
        },
        signup() {
            createAcc = true;
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
    <div v-if="!createAcc">
        <p>Confirm Password:</p>
        <input v-model="confirmPass" placeholder="confirm here" />
        <p>Email:</p>
        <input v-model="email" placeholder="email here" />
        <p>Date of Birth:</p>
        <input v-model="dob" placeholder="date of birth here" />
    </div>
    <button @click="submit(user, pass)">Log in</button>
    <br>
    <button v-if="createAcc" @click="createAcc = !createAcc">Sign up</button>
    <button v-if="!createAcc" @click="createAcc = !createAcc">Return to Login</button>
</template >
    <style scoped>
    /* Styles for component go here */
    </style>