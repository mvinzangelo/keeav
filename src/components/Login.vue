<script>
// local functions can be decalred here
import { db, auth, storage } from '../firebaseResources.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc, getDoc } from "firebase/firestore";
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
            pfp: null,
        };
    },
    computed: {
        ...mapStores(useLoginStore),
    },
    methods: {
        selectImage() {
            this.$refs.fileInput.click()
        },
        pickFile() {
            let input = this.$refs.fileInput;
            let file = input.files;
            if (file && file[0]) {
                let reader = new FileReader;
                reader.onload = e => {
                    this.pfp = e.target.result;
                }
                reader.readAsDataURL(file[0]);
            }
        },
        getDate() {
            var today = new Date();
            let eighteen;
            if (today.getMonth() < 10) {
                eighteen = today.getFullYear() - 18 + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
            }
            else {
                eighteen = today.getFullYear() - 18 + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            }
            return eighteen;
        },
        async createUser() {
            createUserWithEmailAndPassword(auth, this.email, this.pass).then(async (userCredential) => {
                const user = userCredential.user;
                this.loginStore.userID = user.uid;
                this.loginStore.image = this.pfp;
                const storageRef = ref(storage, 'pfp/' + user.uid);
                uploadBytes(storageRef, this.$refs.fileInput.files[0]).then((snapshot) => {
                });

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
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    this.loginStore.userID = user.uid;
                    getDownloadURL(ref(storage, 'pfp/' + user.uid))
                        .then((url) => {
                            this.loginStore.image = url;
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                        });
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
            <div class="vote">
                <input type="radio" v-model="political" name="political" value="left" placeholder="Left">
                <label for="left">Left</label><br>
                <input type="radio" v-model="political" name="political" value="moderate">
                <label for="moderate">Moderate</label><br>
                <input type="radio" v-model="political" name="political" value="right">
                <label for="right">Right</label><br>
                <input type="radio" v-model="political" name="political" value="undecided">
                <label for="right">Undecided</label><br>
            </div>
            <p>Profile Picture:</p>

            <div>
                <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${pfp})` }" @click="selectImage">
                </div>

                <input ref="fileInput" type="file" @input="pickFile">
            </div>

            <p>Date of Birth:</p>
            <input type="date" v-model="dob" min="1900-01-01" :max="getDate()" />
            <p>Phone Number:</p>
            <input type="tel" v-model="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="'1234567890'" />
        </div>
        <div>
            <p>Email:</p>
            <input type="text" v-model="email" placeholder="'john@doe.com'" />
            <p>Password:</p>
            <input type="password" @keypress.enter="createAcc ? signIn() : createUser()" v-model="pass"
                placeholder="'Password'" />
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
    .imagePreviewWrapper {
        width: 12rem;
        border-radius: 50%;
        height: 12rem;
        display: block;
        cursor: pointer;
        background-size: cover;
        background-position: center center;
    }
    
    .vote {
        display: flex;
        flex-direction: column;
        place-items: center;
    }
    
    #compAlign {
        place-items: center;
        display: flex;
        flex-direction: column;
    }
    
    p {
        font-weight: bold;
    }
    
    input,
    textarea {
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