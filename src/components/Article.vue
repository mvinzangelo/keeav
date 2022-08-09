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
        <p><img class="article-img" :src="articlePictureLink" alt="Article image"> </p>
        <p><span> {{ description }}</span></p>
        <!-- <p>Article: <a v-bind:href="link" target="_blank">{{ link }}</a></p> -->
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
            description: "Ukrainian officials and international experts have been warning for months of the risk that fighting poses to a sprawling nuclear power plant on the banks of Dnipro River in southern Ukraine. Earlier this week, the global nuclear watchdog said the situation was becoming increasingly perilous. "
        }
    },
    props: {
        link: {
            type: String,
            default: "https://edition.cnn.com/2022/08/06/europe/zaporizhzhia-nuclear-plant-intl/index.html",
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
    height: 600px;
    background-color: rgb(206, 206, 206);
    color: black;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.publisher-logo {
    height: 80px;
    width: auto;
    border-radius: 100%;
    border: 2px black solid;
}

.article-img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin: 10px 0;
    border-radius: 10px;
    border: 2px black solid;
}

.headline {
    font-weight: bold;
    font-size: 1.3rem;
}

.info-wrapper {
    display: flex;
    gap: 15px;
}

.info-text {
    display: flex;
    flex-direction: column;
}

a {
    color: black;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}
</style>