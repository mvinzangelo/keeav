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
            headline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium.",
            publisherLogoLink: "src/assets/placeholderImage.svg",
            publisher: "[Publisher]",
            articlePictureLink: "src/assets/placeholderImage.svg",
            author: "[Author]",
            date: "mm/dd/yyyy",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta felis ut elementum vehicula. Praesent malesuada finibus nunc, vel mollis risus vestibulum et. Pellentesque consectetur tincidunt gravida. Suspendisse gravida justo at arcu vehicula dignissim. Cras tempor orci tempor mollis vulputate. Sed varius lectus sed interdum tincidunt. In nec eros fringilla purus tristique finibus sit amet ut nisl. Nullam semper rutrum nunc, ac blandit.",
            link: "https://edition.cnn.com/2022/08/06/europe/zaporizhzhia-nuclear-plant-intl/index.html"
            // link: {
            //     type: String,
            //     default: "https://edition.cnn.com/2022/08/06/europe/zaporizhzhia-nuclear-plant-intl/index.html",
            //     // validation function by https://stackoverflow.com/users/1092711/pavlo on https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
            //     validator(value) {
            //         let url;
            //         try {
            //             url = new URL(value);
            //         } catch (_) {
            //             return false;
            //         }
            //         return url.protocol === "http:" || url.protocol === "https:";
            //     }
            // }
        }
    },
    props: {
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
    width: 80px;
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

a:hover {
    text-decoration: underline;
}
</style>