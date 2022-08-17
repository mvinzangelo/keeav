<script>
import { mapStores } from 'pinia';
import { useLoginStore } from "../stores/loginStatus";
import { getDoc, doc } from "firebase/firestore";
import { db } from '../firebaseResources.js';
export default {
    computed: {
        ...mapStores(useLoginStore),
    },
    data() {
        return {
            readUserData: null,
        }
    },
    async created() {
        if (this.loginStore.userID != '') {
            try {
                const docReference = doc(db, 'userInfo', this.loginStore.userID);
                const response = await getDoc(docReference);

                this.readUserData = {
                    firstName: response.firstName,
                    ...response.data(),
                }
            } catch (err) {
                console.error(err);
            }
        }
    },

}
</script>
<template>
    <div v-if="readUserData">
        <!-- figure out how to get pfp -->
        <p>Username: {{ readUserData.userName || 'Missing Username' }}</p>
        <p>First Name: {{ readUserData.firstName || 'Missing First Name' }}</p>
        <p>Last Name: {{ readUserData.lastName || 'Missing First Name' }}</p>
        <p>Date of Birth: {{ readUserData.dob || 'Missing Date of Birth' }}</p>
        <p>Bio: {{ readUserData.bio || 'Missing Bio' }}</p>
        <p>Email: {{ readUserData.email || 'Missing Email' }}</p>
        <p>Phone Number: {{ readUserData.phoneNumber || 'Missing Phone Number' }}</p>
        <p>Political Stance: {{ readUserData.political || 'Missing Political Stance' }}</p>
    </div>
</template>
<style>
</style>