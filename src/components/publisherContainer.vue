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
    <div id = "publisherExplain"> 
        <!-- <p> Main paragraph from Eddie</p> -->
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
</style>