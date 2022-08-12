<template>
    <div class="articles-container">
        <p><span>{{ topic }}</span></p>
        <Article :articleRef="leftArticle"></Article>
        <Article :articleRef="rightArticle"></Article>
        <button v-on:click="updateTopic">Update topic</button>
    </div>
</template>

<!-- Is there a better way of doing this? -->
<script setup>
import Article from './Article.vue';
</script>

<script>
import { db } from '../firebaseResources.js'
import {
    doc,
    getDoc,
    query,
} from 'firebase/firestore'

export default {
    data() {
        return {
            date: "mm/dd/yyyy",
            topic: "Lorem ipsum",
            leftArticle: '',
            rightArticle: '',
        }
    },
    props: {
    },
    methods: {
        async updateTopic() {
            try {
                const topicRef = doc(db, "topics", "IR3BBS28TlRT34k3gJ4a");
                const topicSnap = await getDoc(topicRef);
                if (topicSnap.exists()) {
                    this.date = topicSnap.data().date;
                    this.topic = topicSnap.data().topic;
                    this.leftArticle = topicSnap.data().leftArticle;
                    this.rightArticle = topicSnap.data().rightArticle;
                    console.log(this.leftArticle);

                } else {
                    console.log("No such document!");
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>
.articles-container {
    height: 100%;
    width: 100%;
    background-color: grey;
    display: flex;
    justify-content: space-around;
}

.article-card {
    height: 60%;
    width: 48%;
    background-color: rgb(95, 95, 95);
}
</style>