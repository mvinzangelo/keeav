<script>
import { db } from '../firebaseResources';
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
    orderBy,
} from 'firebase/firestore'
import TopicBox from '../components/TopicBox.vue';

// local functions can be decalred here
export default {
    props: {
    },
    data() {
        return {
            topicsArray: [],
        };
    },
    methods: {
        async getTopicsDB() {
            try {
                let pcluster = query(collection(db, ("topics")), orderBy('date', "desc"));
                const qSnap = await getDocs(pcluster); //pull database docs from firebase
                qSnap.forEach((rdoc) => {
                    this.topicsArray.push({ topicID: rdoc.id, topicData: rdoc.data() });
                });
            }
            catch (e) {
                alert("retrieve" + e);
            }
        },
        postDateTime(inputDate) {
            let date = new Date(inputDate.seconds * 1000).toDateString();
            date = date.slice(3, date.length);
            return date;
        }
    },
    beforeMount() {
        this.getTopicsDB();
    },
    components: { TopicBox }
}
</script>

<template>
    <div v-for="(topic, index) in topicsArray" class="topics-container">
        <TopicBox :topicID="topicsArray[index].topicID" :topic="topicsArray[index].topicData.topic"
            :date="postDateTime(topicsArray[index].topicData.date)">
        </TopicBox>
    </div>
</template>

<style>
.topics-container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

