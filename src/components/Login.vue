<script>
// local functions can be decalred here
import { app } from "../firestoreResources.js"
import { addDoc, collection, doc, getDoc, getDocs, query, where, deleteDoc } from "firebase/firestore"
export default {
    props: {
        // properties go here
        // ex: title: String,
    },
    data() {
        return {
            // responsive variables go here
            acc: {
                createAcc: true,
                userNotValid: false,
                passNotValid: false,
                user: '',
                userError: '',
                pass: '',
                passError: '',
                confirmPass: '',
                confirmPassError: '',
                email: '',
                emailError: '',
                dob: '',
                dobError: '',
            }
        }
        // ex: count: 0,
        //need a submit button
        //maybe one day we will have a sign in with other sites button
    },
    methods: {
        resetLogin() {
            this.$data.acc.createAcc = !this.$data.acc.createAcc;
            this.$data.acc.userNotValid = false;
            this.$data.acc.passNotValid = false;
            this.$data.acc.user = '';
            this.$data.acc.userError = '';
            this.$data.acc.pass = '';
            this.$data.acc.passError = '';
            this.$data.acc.confirmPass = '';
            this.$data.acc.confirmPassError = '';
            this.$data.acc.email = '';
            this.$data.acc.emailError = '';
            this.$data.acc.dob = '';
            this.$data.acc.dobError = '';
        },
        isLoginUserValid(user) {
            try {
                if (!user.length) {
                    throw new Error("Your username must contain characters!");
                }
            } catch (e) {
                this.$data.acc.userNotValid = true;
                this.$data.acc.userError = e.message;
                return;
            }
            try {
                if (!/^[A-Za-z0-9]*$/.test(user)) {
                    throw new Error("Invalid name!");
                }
            } catch (e) {
                this.$data.acc.userNotValid = true;
                this.$data.acc.userError = e.message;
                return;
            }
            this.$data.acc.userNotValid = false;
            this.$data.acc.passNotValid = false;
        },
        isLoginPassValid(pass) {
            try {
                if (!pass.length) {
                    throw new Error("Your password must contain characters!");
                }
                else if (pass.length < 8) {
                    throw new Error("Your password much have atleast 8 characters!")
                }
            }
            catch (e) {
                this.$data.acc.passNotValid = true;
                this.$data.acc.passError = e.message;
                return;
            }
            this.$data.acc.passNotValid = false;
        },
        submit(user, pass) {
            this.isLoginUserValid(user);
            this.isLoginPassValid(pass);
        },
        signup() {
            this.$data.acc.createAcc = true;
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
    <div id="compAlign">
        <!-- HTML for components goes here -->
        <p>Username:</p>
        <input type="text" v-model="acc.user" placeholder="username here" required />
        <p v-if="acc.userNotValid">{{ acc.userError }}</p>

        <p>Password:</p>
        <input type="password" v-model="acc.pass" placeholder="password here" required />
        <p v-if="acc.passNotValid">{{ acc.passError }}</p>
        <div v-if="!acc.createAcc">
            <p>Confirm Password:</p>
            <input type="password" v-model="acc.confirmPass" placeholder="confirm here" required />
            <p v-if="acc.pass != acc.confirmPass">The passwords must match!</p>
            <p>Email:</p>
            <input type="email" v-model="acc.email" placeholder="email here" required />
            <p>Date of Birth:</p>
            <input type="date" v-model="acc.dob" placeholder="date of birth here" required />
        </div>
        <div>
            <button @click="submit(acc.user, acc.pass)">Log in</button>
            <br>
            <button v-if="acc.createAcc" @click="resetLogin()">Sign up</button>
            <button v-if="!acc.createAcc" @click="resetLogin()">Return to Login</button>
        </div>
    </div>
</template>
    <style scoped>
    #compAlign {
        text-align: center;
        position: relative;
        top: 50%;
    }
    </style>