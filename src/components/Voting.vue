<script>
import {db} from '../firebaseResources';
import {doc, getDoc} from 'firebase/firestore';
export default {
    data() {
        return {
            author: '',
            authorBias: '',
            publisher: '',
            publisherBias: '',
            totalVotesLeft: '',
            totalVotesRight: '',
            totalVotes: '',
            userVote: 'None'
        }
    },
    props: {
        articleID: String
    },
    created() {
        this.getData()     
    },
    methods: {
        async getData() {

            const docSnap = await getDoc(doc(db,'articles',this.articleID));

            if(docSnap.exists()){
                this.author = docSnap.data().author;
                this.authorBias = docSnap.data().authorBias;
                this.publisher = docSnap.data().publisher;
                this.publisherBias = docSnap.data().publisherBias;
                this.totalVotesLeft = docSnap.data().totalVotesLeft
                this.totalVotesRight = docSnap.data().totalVotesRight;
                this.totalVotes = this.totalVotesLeft+this.totalVotesRight;
            }
            else {
                console.log('doc does not exist');
            }
        }
    }
};
</script>

<template>
<div class="container">
    <h1>Vote: {{ userVote }}</h1>
    <div class="buttonContainer" v-if="userVote == 'None'">
        <button class="right" @click="userVote = 'Left'">Left</button>
        <button class="left" @click="userVote = 'Right'">Right</button>
    </div>
    <div class="resultContainer" v-else>
        <h2 class="title">Bias Meter</h2>
        <h3 class="news">News Organization: {{publisher}}</h3>
        <progress class="bias" id="newsBias" max='100' :value="publisherBias"></progress>
        <h3 class>Author: {{author}}</h3>
        <progress class="bias" max="100" value="50"></progress>
        <h3>Users</h3>
        <progress class="bias" :max="totalVotes" :value="totalVotesRight"></progress>
    </div>
</div>
</template>

