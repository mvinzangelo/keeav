<script>
// local functions can be decalred here
import { db } from '../firebaseResources.js';
import { addDoc, collection, doc, getDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
export default {
    data() {
        return {
            // responsive variables go here
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
        // ex: count: 0,
        //need a submit button
        //maybe one day we will have a sign in with other sites button
    },
    methods: {
        resetLogin() {
            this.createAcc = !this.createAcc;
            this.userNotValid = false;
            this.passNotValid = false;
            this.user = '';
            this.userError = '';
            this.pass = '';
            this.passError = '';
            this.confirmPass = '';
            this.confirmPassError = '';
            this.email = '';
            this.emailError = '';
            this.dob = '';
            this.dobError = '';
        },
        isLoginUserValid(user) {
            try {
                if (!user.length) {
                    throw new Error("Your username must contain characters!");
                }
                else if (!/^[A-Za-z0-9]*$/.test(user)) {
                    throw new Error("Invalid name!");
                }
            } catch (e) {
                this.userNotValid = true;
                this.userError = e.message;
                return;
            }
            this.userNotValid = false;
            return true;
        },
        isLoginPassValid(pass) {
            try {
                if (!pass.length) {
                    throw new Error("Your password must contain characters!");
                }
                else if (pass.length < 8) {
                    throw new Error("Your password much have atleast 8 characters!");
                }
            }
            catch (e) {
                this.passNotValid = true;
                this.passError = e.message;
                return;
            }
            this.passNotValid = false;
            return true;
        },
        async createUser() {
            if (this.isLoginUserValid(this.user) && this.isLoginPassValid(this.pass) && (this.pass == this.confirmPass)) {
                try {
                    const docReference = await addDoc(
                        collection(db, 'myUsers'),
                        {
                            name: this.user,
                            password: this.pass,
                        }
                    );
                } catch (err) {
                    console.error(err);
                }
            }
        },
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
        <input type="text" v-model="user" placeholder="username here" />
        <p v-if="userNotValid">{{ userError }}</p>

        <p>Password:</p>
        <input type="password" v-model="pass" placeholder="password here" />
        <p v-if="passNotValid">{{ passError }}</p>
        <div v-if="!createAcc">
            <p>Confirm Password:</p>
            <input type="password" v-model="confirmPass" placeholder="confirm here" />
            <p v-if="pass != confirmPass">The passwords must match!</p>
            <p>Email:</p>
            <input type="email" v-model="email" placeholder="email here" />
            <p>Date of Birth:</p>
            <input type="date" v-model="dob" placeholder="date of birth here" />
        </div>
        <div>
            <button v-if="createAcc" @click="submit(user, pass)">Log in</button>
            <button v-if="!createAcc" @click="createUser()">Create Account</button>
            <br>
            <button v-if="createAcc" @click="createAcc = !createAcc">Sign up</button>
            <button v-if="!createAcc" @click="createAcc = !createAcc">Return to Login</button>
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