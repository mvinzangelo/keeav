<template>
    <div class="block">
        <p>Article: <a v-bind:href="link">{{ link }}</a></p>
        <p>Publisher icon: <img class="publisher-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png" alt="Logo"> </p>

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
</style>