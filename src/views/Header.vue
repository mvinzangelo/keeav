<script>
import { auth } from '../firebaseResources.js';
import { mapStores } from 'pinia'
import { useLoginStore } from "../stores/loginStatus";
import { signOut } from "@firebase/auth";
export default {
    computed: {
        ...mapStores(useLoginStore),
    },
    methods: {
        signOut() {
            signOut(auth).then(() => {
                this.loginStore.$reset();
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        },
    }
}
</script>
<template>
    <button v-if="this.loginStore.userID" id="compAlign" @click="signOut()">Sign Out</button>
</template>