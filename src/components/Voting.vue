<script>
import { db } from '../firebaseResources';
import { mapStores } from 'pinia';
import { useLoginStore } from "../stores/loginStatus";
import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs, updateDoc, increment } from 'firebase/firestore';
export default {
    computed: {
        ...mapStores(useLoginStore),
    },
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
    },
    created() {
        // this.getData()
    },
    methods: {
        async getData() {
            try {
                const docSnap = await getDoc(doc(db, 'articles', this.articleID));
                this.author = docSnap.data().author;
                this.authorBias = docSnap.data().authorBias;
                this.publisher = docSnap.data().publisher;
                this.totalVotesLeft = docSnap.data().totalVotesLeft
                this.totalVotesRight = docSnap.data().totalVotesRight;
                this.totalVotes = this.totalVotesLeft + this.totalVotesRight;

                const pbSnap = await getDoc(doc(db, 'publishers', this.publisher));
                this.publisherBias = pbSnap.data().publisherBias;

                const votesRef = collection(db, 'articleVotes');

                const q = query(votesRef, where('articleID', '==', this.articleID), where('userID', '==', this.loginStore.userID));

                const querySnapshot = await getDocs(q);
                this.userVote = querySnapshot.docs[0].data().vote;
                //console.log(this.userVote)
            }
            catch (error) {
                console.log(error);
            }
        },
        async newVote(vote) {
            //create new vote doc
            this.userVote = vote;
            try {
                const docRef = await addDoc(collection(db, "articleVotes"), {
                    articleID: this.articleID,
                    userID: this.loginStore.userID,
                    vote: this.userVote
                });

                const updateVote = doc(db, 'articles', this.articleID);
                if (this.userVote == 'Left') {
                    console.log('made it');
                    await updateDoc(updateVote, {
                        totalVotesLeft: increment(1)
                    });
                }
                else if (this.userVote == 'Right') {
                    await updateDoc(updateVote, {
                        totalVotesRight: increment(1)
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
            //update totalvotecounter

        }
    }
};
</script>

<template>
    <div class="container">
        <h1 v-if="this.loginStore.userID !== ''">Your vote: {{ userVote }}</h1>
        <RouterLink to='/login' v-else><h1 class='loginWarning'>&#x26A0 Login to vote.</h1></RouterLink>
        <div class="buttonContainer" v-if="userVote == 'None' && this.loginStore.userID !== ''">
            <div class="votePrompt">How do you feel this article leans?</div>
            <button class="presser" id='left' @click="newVote('Left')">Left</button>
            <button class="presser" id='right' @click="newVote('Right')">Right</button>
        </div>
        <div class="resultContainer" v-else>
            <h2 class="title">Bias Meter</h2>
            <h3 class="news">News Organization: {{ publisher }}</h3>
            <progress class="bias" id="newsBias" max='100' :value="publisherBias"></progress>
            <h3>How our users voted:</h3>
            <progress class="bias" :max="totalVotes" :value="totalVotesRight"></progress>
        </div>
    </div>
</template>

<style>
.loginWarning {
    color: red;
    font-weight: bold;
}

.loginWarning:hover {
    color: lightcoral;
}

.bias{
    margin-bottom: 10px;
}

.title {
    margin-top: 20px;
    margin-bottom: 10px;
}
.presser {
    border: none;
    border-radius: 12px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}

.presser:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

#left {
    background-color: #008cba;
}

#right {
    background-color: #f44336;
}

.votePrompt {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: left;
}

.bias::-webkit-progress-bar {
    background-color: #008cba;
}

.bias::-webkit-progress-value {
    background-color: #f44336;
}

.bias {
    background-color: #008cba;
}

.bias::-moz-progress-bar {
    background-color: #f44336;
}
</style>

