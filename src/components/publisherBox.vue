<script>
// local functions can be decalred here
export default {
    props: {
        publisherName: String,
        publisherWebsite: String,
        publisherLogo: String,
        publisherBias: Number
    },
    data() {
        return {
            // responsive variables go here
                // ex: count: 0,
        }
    },
    methods : {
        // callable functions for HTML go here
            // ex: incCount()
            // {
            //     this.count++;
            // }
    }
}
</script>
<template>
<h2 class = "pname"> {{publisherName}}</h2>
<a :src = "publisherWebsite"> <img :href = "publisherLogo"/></a>
<progress class="bias" max='100' :value="publisherBias"></progress>
</template>
<style scoped>
    /* Styles for component go here */
</style>