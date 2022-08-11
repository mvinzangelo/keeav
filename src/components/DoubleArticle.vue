<template>
    <div class="articles-container">
        <Article></Article>
        <Article></Article>
    </div>
</template>

<!-- Is there a better way of doing this? -->
<script setup>
import Article from './Article.vue';
</script>

<script>
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
        async getArticle() {
            try {
                const topicRef = doc(db, "topics", "IR3BBS28TlRT34k3gJ4a");
                const topicSnap = await getDoc(topicRef);
                if (topicSnap.exists()) {

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