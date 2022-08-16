<template>
    <div class="block">
        <div class="info-wrapper">
            <p><img class="publisher-logo" :src="publisherLogoLink" alt="Logo"> </p>
            <div class="info-text">
                <p class="headline"><a :href="link" target="_blank">{{ headline }}</a></p>
                <p>By: <span>{{ author }}</span></p>
                <!-- <p><span>{{ publisher }}</span></p> -->
            </div>
        </div>
        <a :href="link" target="_blank"><img class="article-img" :src="articlePictureLink" alt="Article image"> </a>
        <p><span> {{ description }}</span></p>
        <!-- <p>Article: <a v-bind:href="link" target="_blank">{{ link }}</a></p> -->
        <Voting :articleID="articleRef" ref="voting"></Voting>
    </div>
</template>

<script>
import Voting from './Voting.vue'
import { db } from '../firebaseResources.js'
import {
    doc,
    getDoc,
    query,
} from 'firebase/firestore'

export default {
    data() {
        return {
            headline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium.",
            publisherLogoLink: "src/assets/placeholderImage.png",
            publisher: "[Publisher]",
            articlePictureLink: "src/assets/placeholderImage.png",
            author: "[Author]",
            date: "mm/dd/yyyy",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta felis ut elementum vehicula. Praesent malesuada finibus nunc, vel mollis risus vestibulum et. Pellentesque consectetur tincidunt gravida. Suspendisse gravida justo at arcu vehicula dignissim. Cras tempor orci tempor mollis vulputate. Sed varius lectus sed interdum tincidunt. In nec eros fringilla purus tristique finibus sit amet ut nisl. Nullam semper rutrum nunc, ac blandit.",
            link: "https://www.lipsum.com/feed/html"
        }
    },
    props: {
        articleRef: String,
    },
    methods: {
        async updateArticle() {
            try {
                // TODO: Get article info from database
                const articleRef = doc(db, "articles", this.articleRef);
                const articleSnap = await getDoc(articleRef);
                if (articleSnap.exists()) {
                    this.description = articleSnap.data().description;
                    this.link = articleSnap.data().link;
                    this.articlePictureLink = articleSnap.data().articlePictureLink;
                    this.author = articleSnap.data().author;
                    this.headline = articleSnap.data().headline;
                    this.publisherLogoLink = articleSnap.data().publisherLogoLink;
                    // update the vote when articleID is fetched
                    this.$refs.voting.getData();
                } else {
                    console.log("No such article!");
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
    components: {
        Voting,
    }
}
</script>

<style>
.block {
    /* max-width: 500px; */
    width: 45%;
    margin: 5px auto;
    /* min-height: 600px; */
    color: black;
    /* display: flex; */
    flex-direction: column;
    padding: 20px;
    overflow: none;
    box-shadow: 2px 1px var(--dark-byzantium);
    background-color: var(--lavender-blush);
    border-radius: 15px;
}

.publisher-logo {
    height: 80px;
    width: 80px;
    border-radius: 100%;
    /* border: 2px var(--dark-byzantium) solid; */
    object-fit: fill;
}

.article-img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin: 10px 0;
    border-radius: 10px;
    /* border: 2px var(--dark-byzantium) solid; */
}

.headline {
    font-weight: bolder;
    font-size: 1.3rem;
    line-height: 1;
}

.info-wrapper {
    display: flex;
    gap: 15px;
}

.info-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

a {
    color: black;
    text-decoration: none;
}

@media screen and (max-width: 1125px) {
    .block {
        width: 96%;
    }
}
</style>