<template>
    <div class="block">
        <p>Article: <a v-bind:href="link">{{ link }}</a></p>
        <p>Article headline:
        <h1>HEADLINE</h1>
        </p>
        <p>Publisher icon: <img class="publisher-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png" alt="Logo"> </p>
        <p>Article picture: <img class="article-img"
                src="https://cdn.cnn.com/cnnnext/dam/assets/220806023306-zaporizhzhia-nuclear-plant-file-exlarge-169.jpg"
                alt="Article image"> </p>
        <p>Author name: <span>James Doe</span></p>
        <p>Date published: <span>mm/dd/yyyy</span></p>
        <p>Description: <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Sed turpis tincidunt id aliquet risus feugiat in ante. Eleifend mi in
                null posuere. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Nulla facilisi
                cras
                ullamcorper. Ac ut consequat semper viverra nam.
            </span></p>

    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        link: {
            type: String,
            default: "https://www.google.com/",
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
</style>