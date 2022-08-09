<template>
    <div class="block">
        <p>Article: <a v-bind:href="link" target="_blank">{{ link }}</a></p>
        <p>Article headline:
        <h1>{{ headline }}</h1>
        </p>
        <p>Publisher icon: <img class="publisher-logo" :src="publisherLogoLink" alt="Logo"> </p>
        <p>Publisher: <span>{{ publisher }}</span></p>
        <p>Article picture: <img class="article-img" :src="articlePictureLink" alt="Article image"> </p>
        <p>Author name: <span>{{ author }}</span></p>
        <p>Date published: <span>{{ date }}</span></p>
        <p>Description: <span> {{ description }}</span></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            headline: "Fears for nuclear safety after shelling at Ukrainian power plant",
            publisherLogoLink: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png",
            publisher: "CNN",
            articlePictureLink: "https://cdn.cnn.com/cnnnext/dam/assets/220806023306-zaporizhzhia-nuclear-plant-file-exlarge-169.jpg",
            author: "Vasco Cotovio",
            date: "09/06/2022",
            description: "Lorem ipsum dolor"
        }
    },
    props: {
        link: {
            type: String,
            default: "https://edition.cnn.com/2022/08/06/europe/zaporizhzhia-nuclear-plant-intl/index.html",
            required: true,
            // validation function by https://stackoverflow.com/users/1092711/pavlo on https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
            validator(value) {
                let url;
                try {
                    url = new URL(value);
                } catch (_) {
                    return false;
                }
                return url.protocol === "http:" || url.protocol === "https:";
            }
        }
    }
}

</script>

<style>
.block {
    width: 500px;
    height: 500px;
    background-color: black;
}

.publisher-logo {
    height: 40px;
    width: auto;
    border-radius: 100%;
}

.article-img {
    height: 100px;
    widows: auto;
}

p {
    font-weight: bold;
}
</style>