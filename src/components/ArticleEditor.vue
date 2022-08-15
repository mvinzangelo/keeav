<script>
// local functions can be decalred here
import { db } from '../firebaseResources.js';
import { addDoc, collection } from "firebase/firestore";
export default {
    data() {
        return {
            // responsive variables go here
            articleEdit: true,
            articleImage: "",
            author: "",
            description: "",
            headline: "",
            publisher: "",
            publisherLogo: "",
            link: "",
            date: ""
        }
    },
    methods: {
        async articleEditor() {
            try {
                const docReference = await addDoc(
                    collection(db, 'articles'),
                    {
                        link: this.link,
                        headline: this.headline,
                        author: this.author,
                        publisher: this.publisher,
                        publisherLogo: this.publisherLogo,
                        articleImage: this.articleImage,
                        description: this.description,
                        date: this.date
                    }
                );
            } catch (err) {
                console.error(err);
            }
        },
    }
}
</script>
<template>
    <div id="compAlign">
        <div v-if="!articleEdit">
            <p>Article Link:</p>
            <input type="text" v-model="link" placeholder="link here" />
            <p>Headline:</p>
            <input type="text" v-model="headline" placeholder="headline here" />
            <p>Author:</p>
            <input type="text" v-model="author" placeholder="author here" />
            <p>Publisher:</p>
            <input type="text" v-model="publisher" placeholder="publisher here" />
            <p>Publisher Logo Link:</p>
            <input type="text" v-model="publisherLogo" placeholder="logo here" />
            <p>Article Picture Link:</p>
            <input type="text" v-model="articleImage" placeholder="picture here" />
            <p>Description:</p>
            <input type="text" v-model="description" placeholder="description here" />
            <p>Date:</p>
            <input type="text" v-model="date" placeholder="date here" />
        </div>
        <button v-if="articleEdit" @click="articleEdit = !articleEdit">Edit Article</button>
        <br>
        <button v-if="!articleEdit" @click="articleEdit = !articleEdit">Close Article Edit</button>

        <button v-if="!articleEdit" @click="articleEditor()">Submit Article</button>
    </div>
</template>
    <style scoped>
    #compAlign {
        text-align: center;
        position: relative;
        top: 50%;
    }
    </style>