<script>
import {db} from '../firebaseResources';
import {doc, getDoc, setDoc, addDoc, collection, query, where, getDocs, updateDoc, increment} from 'firebase/firestore';
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
        articleID: String,
        userID: String
    },
    created() {
        this.getData()     
    },
    methods: {
        async getData() {

            const docSnap = await getDoc(doc(db,'articles',this.articleID));

            try{
                this.author = docSnap.data().author;
                this.authorBias = docSnap.data().authorBias;
                this.publisher = docSnap.data().publisher;
                this.publisherBias = docSnap.data().publisherBias;
                this.totalVotesLeft = docSnap.data().totalVotesLeft
                this.totalVotesRight = docSnap.data().totalVotesRight;
                this.totalVotes = this.totalVotesLeft+this.totalVotesRight;

                const votesRef = collection(db, 'votes');
                
                const q = query(votesRef, where('articleID', '==', this.articleID), where('userID', '==', this.userID));

                    const querySnapshot = await getDocs(q);
                    this.userVote = querySnapshot.docs[0].data().vote;
                    //console.log(this.userVote)
            }
            catch(error){
                console.log(error);
            }
        },
        async newVote(vote){
            //create new vote doc
            this.userVote = vote;
            try {
                const docRef = await addDoc(collection(db, "votes"), {
                    articleID: this.articleID,
                    userID: this.userID,
                    vote: this.userVote
                });

                const updateVote = doc(db, 'articles', this.articleID);
                if(this.userVote == 'Left'){
                    console.log('made it');
                    await updateDoc(updateVote, {
                        totalVotesLeft: increment(1)
                    });
                }
                else if(this.userVote == 'Right'){
                    await updateDoc(updateVote, {
                        totalVotesRight: increment(1)
                    });
                }
            }
            catch(error){
                console.log(error);
            }
            //update totalvotecounter

        }
    }
};
</script>

<template>
<div class="container">
    <h1>Vote: {{ userVote }}</h1>
    <div class="buttonContainer" v-if="userVote == 'None'">
        <button class="left" @click="newVote('Left')">Left</button>
        <button class="right" @click="newVote('Right')">Right</button>
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

