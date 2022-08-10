<script>
// local functions can be decalred here
import { db, auth } from '../firebaseResources.js';
import { addDoc, setDoc, collection, doc, getDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth";
export default {
    data() {
        return {
            createAcc: true,
            firstName: '',
            lastName: '',
            users: [],
            readUsersData: '',
            email: '',
            user: '',
            pass: '',
            dob: '',
            userFilter: '',
        }
    },
    methods: {
        async createUser() {
            createUserWithEmailAndPassword(auth, this.email, this.pass).then(async (userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
                try {
                    const docReference = await setDoc(
                        doc(db, 'userInfo', user.uid),
                        {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            dob: this.dob
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
                    console.log(JSON.stringify(userCredential.user, null, 2));
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(error.message);
                })
        },
        signOut() {
            signOut(auth).then(() => {
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        },
    }
}
</script>
<template>
    <div id="compAlign">
        <div v-if="!createAcc">
            <p>First Name:</p>
            <input type="text" v-model="firstName" placeholder="name here" />
            <p>Last Name:</p>
            <input type="text" v-model="lastName" placeholder="name here" />
            <p>Date of Birth:</p>
            <input type="text" v-model="dob" placeholder="date here" />
        </div>
        <p>Email:</p>
        <input type="text" v-model="email" placeholder="email here" />
        <p>Password:</p>
        <input type="password" v-model="pass" placeholder="password here" />
        <div>
            <button v-if="createAcc" @click="signIn()">Log in</button>
            <button v-else @click="createUser()">Create Account</button>
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