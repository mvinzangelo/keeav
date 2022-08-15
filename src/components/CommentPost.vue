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

        <p class="commentOwner">Username: <strong>{{ poster }}</strong></p>
        <p>timestamp: <strong>{{ timestamp }}</strong></p>
        <p>Comment: <strong>{{ comment }}</strong></p>
        <!-- <p>commentID: <strong>{{cid}}</strong></p> -->
    </div>
</template>
<style scoped>
/* Styles for component go here */
.displayedComment {
    padding: 10px;
    width: calc(100% - 24px);
    border-radius: 10px 5px 5px 15px;
    margin-bottom: 2px;
    /* border: 2px solid; */
    box-shadow: 1px 1px 3px rgb(0, 0, 0);
    background-color: rgb(236, 255, 221);

}
strong{
    font-weight: bold;
}
</style>