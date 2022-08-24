<script>

import {db} from '../firebaseResources';
import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    query,
    where,
    deleteDoc,
} from 'firebase/firestore'
import PublisherBox from '../components/publisherBox.vue';

// local functions can be decalred here
export default {
    props: {
    // properties go here
    // ex: title: String,
    },
    data() {
        return {
            publisherArray: [], //array for publishers
        };
    },
    methods: {
        async getPublishersDB() {
            try {
                let pcluster = query(collection(db, ("publishers")));
                const qSnap = await getDocs(pcluster); //pull database docs from firebase
                qSnap.forEach((rdoc) => {
                    this.publisherArray.push({ politicPublisher: rdoc.id, publisherData: rdoc.data() });
                    // alert(rdoc.id);
                });
                // alert(JSON.stringify(this.publisherArray));
            }
            catch (e) {
                alert("retrieve" + e);
            }
        },
    },
    beforeMount() {
        this.getPublishersDB();
    },
    components: { PublisherBox }
}
</script>
<template>
<div class="publisherExplain"> 
    <div id="data"> 
        <h2>How we get our Data:</h2>
            <p>We get our publisher bias rating from AllSides, 
                but in the future we plan to aggregate from multiple bias rating websites. 
            </p>
    </div>
    <div id="articles"> 
        <h2>How we choose our articles:</h2>
            <p>Our editorial board, which consists of political 
                scientists from both sides of the political spectrum, selects the articles and the topics. 
            </p>
    </div>
    <div id="rules"> 
        <h2>Community Rules:</h2>
            <ol>
                <li>No racist slurs</li>
                <li>No personal attacks on another User</li>
                <li>No posting of personal details of another user</li>
                <li>No Derogatory Words</li>
                <li>No Doxing</li>
                <li>No Endangering Information</li>
                <li>No Hate Speech</li>
            </ol>
    </div>
    <div id="moderate"> 
        <h2>How we Moderate:</h2>
            <p>We plan to have a moderation team that moderates 
                comments according to the rules above.
            </p>
    </div>
    </div>

    <div v-for="(publisher, index) in publisherArray" class = "publisherContainer">
        <PublisherBox
            :publisherName = "publisherArray[index].politicPublisher"
            :publisherWebsite = "publisherArray[index].publisherData.website"
            :publisherLogo = "publisherArray[index].publisherData.publisherLogoLink"
            :publisherBias = "publisherArray[index].publisherData.publisherBias"
            
            ></PublisherBox>
        
    </div>

</template>
<style scoped>
    .publisherContainer{
        display: inline-flex;
        background-color: #cd8de5ff;
        padding: 10px;
        margin-bottom: 40px;
        font-family: 'Lobster', cursive;
        border-radius: 15px;
    }
    h2 {
        display: block; 
        font-size: 1.5em; 
        margin-top: 0.83em;
        margin-bottom: 0.83em; 
        margin-left: 0; 
        margin-right: 0; 
        font-weight: bold;
    }
    ol {
        /* background-color: pink; */
        display: block; 
        list-style-type: decimal; 
        margin-top: 1em; 
        margin-bottom: 1em; 
        margin-left: 0; 
        margin-right: 0; 
        padding-left: 40px;
    }
    .publisherExplain {
        background-color: #cd8de5ff;
        border-radius: 15px;
        margin-bottom: 35px;
        padding: 10px;
    }
    #data {
        margin-top: -20px;
    }
</style>