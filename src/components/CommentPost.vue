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

        // threads
        parentId: String,
        parentComment: String,
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
        getHref(a)
        {
            return ('#'+a);
        }
    }
}
</script>
<template>
    <!-- HTML for components goes here -->
    <div class="displayedComment">
        <!-- <p>parentId: <strong> {{parentId}} </strong></p>
        <p>parentComment <strong> {{parentComment}} </strong></p>
        <p class="commentOwner">Username: <strong>{{ poster }}</strong></p>
        <p>timestamp: <strong>{{ timestamp }}</strong></p>
         -->
         <span class="userPoster">
            <img width="15" src="../assets/tempAvatar.png"/>
            <p class="userName">{{ poster }}</p>
         </span>
        <a class="repliedComment" :href="getHref(parentId)" v-if="parentId != null"><strong>Reply to:</strong>{{parentComment}} ...</a>
        <p class="ActualComment">{{ comment }}</p>
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
.repliedComment
{
    border-left: 4px solid rgb(183, 183, 183);
    padding-left: 4px;
    color: rgb(114, 114, 114);
}
.userName
{
    /* vertical-align: center;
    background-color: blue; */
    vertical-align: middle;
}
.userPoster
{
    /* background-color: red; */
    display: flex;
    margin-bottom: 10px;
    vertical-align: center;
}

.ActualComment
{
    margin-top: 4px;
}
strong{
    font-weight: bold;
}
</style>