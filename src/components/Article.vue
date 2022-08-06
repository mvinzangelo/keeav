<template>
    <div class="block"></div>
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
</style>