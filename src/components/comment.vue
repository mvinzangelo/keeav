<script>
// local functions can be decalred here
export default {
    props: {
        // properties go here
            // ex: title: String,
            timestamp: Date,
            poster: Object,
            replies: Array,
            comment: String,
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
<!-- HTML for components goes here -->
<h4 class="commentOwner">{{poster.userName}}</h4>
<p>{{timestamp}}--{{comment}}</p>
<p>{{}}</p>
</template>
<style scoped>
    /* Styles for component go here */
</style>