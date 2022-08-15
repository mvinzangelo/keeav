<script>
// local functions can be decalred here
export default {
    props: {
        // properties go here
        // ex: title: String,
        timestamp: String,
        poster: String,
        replies: Array,
        comment: String,
        cid: String,
    },
    data() {
        return {
            // responsive variables go here
            // ex: count: 0,
        }
    },
    methods: {
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
    <div class="displayedComment">

        <h4 class="commentOwner">Username: <strong>{{ poster }}</strong></h4>
        <p>timestamp: <strong>{{ timestamp }}</strong></p>
        <p>Comment: <strong>{{ comment }}</strong></p>
        <p>commentID: <strong>{{cid}}</strong></p>
    </div>
</template>
<style scoped>
/* Styles for component go here */
.displayedComment {
    padding: 10px;
    width: 100%;
    border-radius: 20px 10px 10px 30px;
    border: 2px solid;
    background-color: antiquewhite;

}
strong{
    font-weight: bold;
}
</style>