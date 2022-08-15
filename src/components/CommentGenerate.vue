<script>

import Comment from './CommentPost.vue'
// import { mapStores } from 'pinia';
// import { useLoginStore } from "../stores/loginStatus";

import { db } from '../firebaseResources';
import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    query,
    where,
    deleteDoc,
} from 'firebase/firestore'
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
            desiredComment: undefined, //takes in the current typed value in the comment pox
            postedComments: [], //array of all the comment in the firebase
            timer: '', //timer that refreshes the comments every so often based on AUTO_Refresh
            AUTO_REFRESH: 50000,
        };
    },
    // computed: {
    //     ...mapStores(useLoginStore),
    // },
    created () {
        this.getComments(); // will pull comments from firebase
        this.timer = setInterval(this.getComments, this.AUTO_REFRESH); //update comments every AUTO_REFRESH Amount of time
    },
    methods: {
        // callable functions for HTML go here
        // ex: incCount()
        // {
        //     this.count++;
        // }
        async getComments() {
            try {
                //get comment periodicaly is called to pull any new comments from the database
                // the id comparison is to prevent deleting all the comments the adding them again creating 
                // an annoying flash
                let q = query(collection(db, ('comments')));   
                const qSnap = await getDocs(q); //pull database docs from firebase
                qSnap.forEach((rdoc) => { //for each doc
                    let newComment = true;//assume the doc is a unique comment
                    this.postedComments.forEach((alreadyShowingComment) => { //check if any of the already posted comments matches the pulled commentId
                        if(rdoc.id == alreadyShowingComment.cid)//if one does match, (false) do not add the comment again
                        {
                            newComment=false;
                        }
                    });
                    if(newComment)//otherwise add the new comment
                    {
                        this.postedComments.push({cdata: rdoc.data(), cid: rdoc.id});
                    }

                });
                
            } catch (e) {
                alert('retrieve' + e);
            }

        },
        async createComment() { //generates a comment
            if (this.desiredComment != null /*&& userLoggedIn == true */) {
                try {
                    const docReference = await addDoc(
                        collection(db, ('comments')),
                        {
                            timeStamp: new Date(),
                            topicId: {},//connect to topicID store
                            poster: {}, //connect to UserID store
                            replies: [], // my idea of how to implement threads
                            comment: this.desiredComment
                        });
                } catch (e) {
                    alert('create comment' + e);
                    console.error(e);
                }
            }
        },
        submitComment() { // on submit we want to create comments then get comments to have the current view update
            this.createComment();
            this.getComments();
        },
        getTime() {//get current date
            const calendar = new Date();
            return calendar;
        },
        timeSince(date) { //generate the amount of time since comment was submitted
            let tempSeconds = date.seconds;
            let nonUnixDate = new Date(tempSeconds*1000);
            let seconds = Math.floor((new Date() - nonUnixDate) / 1000);
            let interval = seconds / 31536000;
            if (interval > 1) {
                return Math.floor(interval) + " years ago";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months ago";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days ago";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours ago";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        },
        cancelTimerAutoUpdate () {
            clearInterval(this.timer);
        }
    },
    beforeMount() {
        // this.getComments();
    },
    beforeDestroy () {
      this.cancelTimerAutoUpdate();
    },
    components: { Comment }
}
</script>
<template onl>
    <!-- HTML for components goes here -->
    <div id="commentWrapper">
        <div id="displayCommentBox">
            <div v-for="(comment, index) in postedComments">
                <p>{{comment}}</p>
                <Comment :timestamp="timeSince(postedComments[index].cdata.timeStamp)" :poster="{}" :replies="[]"
                    :comment="postedComments[index].cdata.comment" :cid="postedComments[index].cid"></Comment>
            </div>
        </div>
        <div id="commentMaker">
            <p>Comment: </p>
            <!-- <p>Where the comment would be typed initialy: {{desiredComment}}</p> -->
            <textarea v-model="desiredComment" placeholder="Comment..."></textarea>
            <button class="commentSubmit" @click="submitComment">&#x27A1</button>
        </div>
    </div>
</template>
<style scoped>
/* Styles for component go here */
#commentWrapper {
    background-color: grey;
    width: 80%;
    margin: 0 auto;
    height: 400px;
}

#displayCommentBox {
    background-color: rgb(208, 208, 208);
    /* top: 10px;  */
    /* padding: 10px; */
    width: 100%;
    /* margin: 10px 10px 10px 10px; */
}

#commentMaker {
    background-color: rgb(89, 89, 89);
    padding: 10px;
    /* top: 10px; */
    width: 100%;
    /* vertical-align: bottom; */
    position: absolute;
    bottom: 0px;

}
</style>   