<template>
    <p class="topic-text"><span>{{ topic }}</span></p>
    <div class="articles-container">
        <Article :articleRef="leftArticle" ref="leftArticle"></Article>
        <Article :articleRef="rightArticle" ref="rightArticle"></Article>
    </div>
    <CommentGenerate :topicId="topicID"></CommentGenerate>
</template>

<!-- Is there a better way of doing this? -->
<script setup>
import Article from './Article.vue';
import CommentGenerate from './CommentGenerate.vue'
</script>

<script>
import { db } from '../firebaseResources.js'
import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    orderBy,
    limit,
} from 'firebase/firestore'

export default {
    data() {
        return {
            date: "mm/dd/yyyy",
            topic: "Lorem ipsum",
            leftArticle: '',
            rightArticle: '',
            topicID: '',
        }
    },
    props: {
    },
    methods: {
        async updateTopic() {
            try {
                const q = query(collection(db, 'topics'), orderBy('date', "desc"), limit(1));
                const latestTopic = await getDocs(q);
                if (latestTopic) {
                    this.date = latestTopic.docs[0].data().date;
                    this.topic = latestTopic.docs[0].data().topic;
                    this.leftArticle = latestTopic.docs[0].data().leftArticle;
                    this.rightArticle = latestTopic.docs[0].data().rightArticle;
                    this.topicID = latestTopic.docs[0].id;
                }
                else {
                    console.log("Topic not found!");
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
    async created() {
        await this.updateTopic().then(() => {
            this.$refs.leftArticle.updateArticle();
            this.$refs.rightArticle.updateArticle();
        });
    },
    components: {
        Article,
        CommentGenerate,
    }
}
</script>

<style>
.articles-container {
    background-color: grey;
    display: flex;
    justify-content: space-around;
}

.article-card {
    background-color: rgb(95, 95, 95);
}

.topic-text {
    text-align: center;
}
</style>