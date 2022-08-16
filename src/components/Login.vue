<script>
// local functions can be decalred here
import { db, auth } from '../firebaseResources.js';
import { setDoc, doc } from "firebase/firestore";
import { mapStores } from 'pinia';
import { useLoginStore } from "../stores/loginStatus";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
export default {
    data() {
        return {
            createAcc: true,
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            pass: '',
            phoneNumber: '',
            political: '',
            dob: '',
            bio: '',
        };
    },
    computed: {
        ...mapStores(useLoginStore),
    },
    methods: {
        async createUser() {
            createUserWithEmailAndPassword(auth, this.email, this.pass).then(async (userCredential) => {
                const user = userCredential.user;
                this.loginStore.userID = user.uid;
                this.$router.push('/')
                try {
                    const docReference = await setDoc(
                        doc(db, 'userInfo', user.uid),
                        {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            userName: this.userName,
                            email: this.email,
                            dob: this.dob,
                            phoneNumber: this.phoneNumber,
                            political: this.political,
                            dob: this.dob,
                            bio: this.bio,
                        }
                    );
                } catch (err) {
                    console.error(err);
                }
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        },
        signIn() {
            signInWithEmailAndPassword(auth, this.email, this.pass)
                .then((userCredential) => {
                    const user = userCredential.user;
                    this.loginStore.userID = user.uid;
                    this.$router.push('/')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                })
        },
    }
}
</script>
<template>
    <div v-if="loginStore.userID == ''" id="compAlign">
        <div v-if="!createAcc">
            <p>First Name:</p>
            <input type="text" v-model="firstName" placeholder="'John'" />
            <p>Last Name:</p>
            <input type="text" v-model="lastName" placeholder="'Doe'" />
            <p>Username:</p>
            <input type="text" v-model="userName" placeholder="'johndoe'" />
            <p>Bio:</p>
            <textarea type="text" v-model="bio" placeholder="'I lean...'" />
            <p>Political:</p>
            <input type="radio" v-model="political" name="political" value="left" placeholder="Left">
            <label for="left">Left</label><br>
            <input type="radio" v-model="political" name="political" value="moderate">
            <label for="moderate">Moderate</label><br>
            <input type="radio" v-model="political" name="political" value="right">
            <label for="right">Right</label>
            <input type="radio" v-model="political" name="political" value="undecided">
            <label for="right">Undecided</label>
            <p>Profile Picture:</p>
            <input type="file" @change="" />
            <p>Date of Birth:</p>
            <input type="date" v-model="dob" />
            <p>Phone Number:</p>
            <input type="tel" v-model="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
        </div>
        <div>
            <p>Email:</p>
            <input type="text" @keypress.enter="signIn()" v-model="email" placeholder="'john@doe.com'" />
            <p>Password:</p>
            <input type="password" @keypress.enter="signIn()" v-model="pass" placeholder="'Password'" />
        </div>
        <div>
            <button v-if="createAcc" @click="signIn()">Log in</button>
            <button v-else @click="createUser()">Create Account</button>
            <div>
                <button v-if="createAcc" @click="createAcc = !createAcc">Sign up</button>
                <button v-if="!createAcc" @click="createAcc = !createAcc">Return to Login</button>
            </div>
        </div>
    </div>
</template>

    <style scoped>
    #compAlign {
        place-items: center;
        display: flex;
        flex-direction: column;
    }
    
    p {
        font-weight: bold;
    }
    
    input {
        border: 0.125rem solid grey;
        outline: none;
        width: 12rem;
        padding: 0.5rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border-radius: 0.3125rem;
    }
    
    button {
        width: 15rem;
        margin-bottom: 0.5rem;
        background-color: black;
        border: none;
        color: white;
        border-radius: 1.5625rem;
        padding: 0.9375rem 3.5rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        box-shadow: 0.125rem 0.1875rem #2B4865;
    }
    </style>