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
    <div class="bias">
        <p>Publisher Bias:</p>
        <progress class="biasbar" max='100' :value="publisherBias"></progress>
    </div>
</div>
<!-- <h2 class = "pname"> {{publisherName}}</h2> -->
<!-- <progress class="bias" max='100' :value="publisherBias"></progress> -->
</template>
<style scoped>
    .ImageLogo {
        width: 100px;
        border-radius: 100%;
        
    }
    .pname {
        text-align: center;
        padding: 10px;
        margin-bottom: 25px;

    }
    .bias {
        margin-left: 20px;
        background-color: #cd8de5ff;
    }
    /* Below if from Eddie's Voting.vue for reference on bias */
    .biasbar::-webkit-progress-bar {
        background-color: #008cba;
    }

    .biasbar::-webkit-progress-value {
        background-color: #f44336;
    }

    .biasbar {
        background-color: #008cba;
    }

    .biasbar::-moz-progress-bar {
        background-color: #f44336;
    }
</style>