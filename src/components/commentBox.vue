<script>
// local functions can be decalred here
export default {
    props: {
        // properties go here
            // ex: title: String,
    },
    data() {
        return {
            // responsive variables go here
                // ex: count: 0,
            desiredComment: undefined,
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
    <div id="commentWrapper">
        <div id="displayCommentBox">
            <h1>Posted comments would go here</h1>
        </div>       
        <div id="commentMaker">
            <p>Where the comment would be typed initialy: {{desiredComment}}</p>
            <textarea v-model="desiredComment" placeholder="Comment..."></textarea>
            <button class="commentSubmit">&#x27A1</button>
        </div>
    </div>
</template>
<style scoped>
    /* Styles for component go here */
    #commentWrapper
    {
        background-color: grey;
        width: 80%;
        margin: 0 auto;
        height: 400px;
    }
    #displayCommentBox
    {
        background-color: rgb(208, 208, 208);
        padding: 10px;
        top: 10px;
        width: calc(100% - 20px);
        margin: 0 auto;
    }
    #commentMaker
    {
        background-color: rgb(89, 89, 89);
        padding: 10px;
        /* top: 10px; */
        width: 100%;
        /* vertical-align: bottom; */
        position: absolute;
        bottom: 0px;
        
    }
</style>   