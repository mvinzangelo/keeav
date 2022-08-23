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
            
        }
    },
    methods : {
        // callable functions for HTML go here
            
    }
}
</script>
<template>
<h2 class = "pname"> {{publisherName}}</h2>
<a :href="publisherWebsite" target="_blank"> <img alt="publisher logo" :src="publisherLogo"/></a>
<progress class="bias" max='100' :value="publisherBias"></progress>
</template>
<style scoped>
    /* Styles for component go here */
</style>