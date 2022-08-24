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
                let pcluster = query(collection(db, ("topics")));
                const qSnap = await getDocs(pcluster); //pull database docs from firebase
                qSnap.forEach((rdoc) => {
                    this.topicsArray.push({ topicID: rdoc.id, topicData: rdoc.data() });
                });
            }
            catch (e) {
                alert("retrieve" + e);
            }
        },
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
            :date="topicsArray[index].topicData.date">
        </TopicBox>
    </div>
</template>

