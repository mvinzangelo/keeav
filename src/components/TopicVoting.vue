<script>
import { mapStores } from 'pinia';
import { db } from '../firebaseResources';
import { useLoginStore } from '../stores/loginStatus';
import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
export default {
    computed: {
        ...mapStores(useLoginStore),
    },
    data() {
        return {
            topicVote: 'None'
        }
    },
    props: {
        topicId: String,
    },
    created(){
        //this.getData();
    },
    methods: {
        async getData(){
            try{
                const votesRef = collection(db, 'topicVotes');

                const q = query(votesRef, where('topicID', '==', this.topicId), where('userID', '==', this.loginStore.userID));

                const querySnapshot = await getDocs(q);
                this.topicVote = querySnapshot.docs[0].data().vote;
                console.log(this.topicVote);
            }
            catch(error){
                console.log(error);
            }
        },
        async newVote(vote) {
            this.topicVote = vote;
            try {
                const docRef = await addDoc(collection(db, "topicVotes"), {
                    topicID: this.topicId,
                    userID: this.loginStore.userID,
                    vote: this.topicVote
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<template>
    <div class="topicContainer" v-if="topicVote == 'None' && this.loginStore.userID !== ''">
        <h1 class="prompt">Which view did you agree with?</h1>
        <button class="presser" id="left" @click="newVote('Left')">Left</button>
        <button class="presser" id="neutral" @click="newVote('Neutral')">Neutral</button>
        <button class="presser" id="right" @click="newVote('Right')">Right</button>
    </div>
    <div class="topicContainer" v-else-if="topicVote !== 'None'">
        <h1 class="prompt" id="success">Thanks for voting!</h1>
    </div>
</template>

<style>


.topicContainer {
    position: relative;
    /* max-width: 500px; */
    width: 48%;
    margin: 5px auto;
    /* min-height: 600px; */
    color: black;
    display: flex;
    flex-direction: row;
    box-shadow: 2px 1px var(--dark-byzantium);
    background-color: var(--lavender-blush);
    border-radius: 15px;
    overflow: hidden;
}

h1.prompt {
    margin: 10px;
}

#success {
    text-align: center;
}

.presser {
    margin: 10px;
}

@media screen and (max-width: 1125px){
    .topicContainer {
        width: 96%;
    }
    
}
</style>

