<template>
    <p class="topic-text"><span>{{ topic }}</span></p>
    <div id="section-container">
        <div class="articles-container">
            <Article :articleRef="leftArticle" ref="leftArticle"></Article>
            <Article :articleRef="rightArticle" ref="rightArticle"></Article>
        </div>
        <CommentGenerate :topicId="topicID"></CommentGenerate>

    </div>
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
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap');
.articles-container {
    margin: 0 auto;
    width: 100%;
    /* background-color: rgb(105, 34, 34); */
    
    display: flex;
    /* padding: 10px */
    justify-content: center;
}
#section-container
{
    width: calc(100% - 500px );
    /* background-color: darksalmon; */
    /* display: flex; */
    /* justify-content: center; */
    margin: 0 auto;
}

.article-card {
    background-color: rgb(95, 95, 95);

}

.topic-text {
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    font-family: 'Playfair Display', serif;
    /* background-color: red; */
    text-decoration: 3px underline goldenrod;
    padding: 20px
}

@media screen and (max-width: 1125px) {
  .articles-container {
    width: 100%;
    /* background-color: saddlebrown; */
    display: inline;
  }
  #section-container
    {
        width: calc(80% - 100px);
    }
 
}
</style>