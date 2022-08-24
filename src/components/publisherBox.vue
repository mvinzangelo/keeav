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
<div>
    <a :href="publisherWebsite" target="_blank"> <img alt="publisher logo" class="ImageLogo" :src="publisherLogo"/></a>
</div>
<div>
    <h2 class = "pname"> {{publisherName}}</h2>
    <progress class="bias" max='100' :value="publisherBias"></progress>
</div>
<!-- <h2 class = "pname"> {{publisherName}}</h2> -->
<!-- <progress class="bias" max='100' :value="publisherBias"></progress> -->
</template>
<style scoped>
    .ImageLogo {
        width: 100px;
    }
</style>