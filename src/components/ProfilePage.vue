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
        <p>First Name: {{ readUserData.firstName || 'Missing First Name' }}</p>
        <p>Last Name: {{ readUserData.lastName || 'Missing First Name' }}</p>
        <p>Date of Birth: {{ readUserData.dob || 'Missing First Name' }}</p>
    </div>
</template>
<style>
</style>