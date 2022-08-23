<template>
    <p class="topic-text"><span>{{ topic }}</span></p>
    <p class="date">{{ date }}</p>
    <div id="section-container">
        <div class="articles-container">
            <Article :articleRef="leftArticleID" ref="leftArticle"></Article>
            <Article :articleRef="rightArticleID" ref="rightArticle"></Article>
        </div>
        <button @click="$router.push({ path: `/topic/NhRDXaZT9InPzhvDQSlh` })">Go back</button>
        <CommentGenerate :topicId="topicID"></CommentGenerate>
    </div>
</template>

<!-- Is there a better way of doing this? -->
<script setup>
import Article from '../components/Article.vue';
import CommentGenerate from '../components/CommentGenerate.vue'
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
            leftArticleID: '',
            rightArticleID: '',
            previousTopicID: '',
            nextTopicID: '',
            topicID: '',
        }
    },
    props: {
    },
    methods: {
        async updateTopic() {
            try {
                if (!this.$route.params.topicID) {
                    console.log("NO PARAM FOR TOPIC ID!");
                    const q = query(collection(db, 'topics'), orderBy('date', "desc"), limit(1));
                    const topic = await getDocs(q);
                    if (topic) {
                        this.date = topic.docs[0].data().date;
                        this.topic = topic.docs[0].data().topic;
                        this.leftArticleID = topic.docs[0].data().leftArticle;
                        this.rightArticleID = topic.docs[0].data().rightArticle;
                        this.previousTopicID = topic.docs[0].data().previousTopic;
                        this.nextTopicID = topic.docs[0].data().nextTopic;
                        this.topicID = topic.docs[0].id;
                    }
                    else {
                        console.log("Topic not found!");
                    }
                }
                else {
                    console.log(this.$route.params.topicID);
                    const topicRef = doc(db, "topics", this.$route.params.topicID);
                    const topicSnap = await getDoc(topicRef);
                    if (topicSnap.exists()) {
                        this.date = topicSnap.data().date;
                        this.topic = topicSnap.data().topic;
                        this.leftArticleID = topicSnap.data().leftArticle;
                        this.rightArticleID = topicSnap.data().rightArticle;
                        this.previousTopicID = topicSnap.data().previousTopic;
                        this.nextTopicID = topicSnap.data().nextTopic;
                        this.topicID = topicSnap.id;
                    } else {
                        console.log("No such topic!");
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        },
        postDateTime() {
            // to get as string 
            this.date = new Date(this.date.seconds * 1000).toDateString();
            this.date = this.date.slice(3, this.date.length);
            //alert(this.date);
        }
    },
    async created() {
        await this.updateTopic().then(() => {
            this.$refs.leftArticle.updateArticle();
            this.$refs.rightArticle.updateArticle();
        });

        this.postDateTime();
    },
    components: {
        Article,
        CommentGenerate,
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

.date {
    text-align: center;
    font-size: 2rem;
    color: rgb(87, 87, 87);
    margin-bottom: 30px;
}

#section-container {
    width: calc(100% - 500px);
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
    font-size: 4rem;
    font-weight: bold;
    font-family: 'Lobster', cursive;
    text-shadow: 2px 1px var(--dark-byzantium);
    color: var(--bright-lilac);
    margin: 10px 0;
    margin-top: 25px;
}

@media screen and (max-width: 1125px) {
    .articles-container {
        width: 100%;
        /* background-color: saddlebrown; */
        display: inline;
    }

    #section-container {
        width: calc(80% - 100px);
    }

}
</style>