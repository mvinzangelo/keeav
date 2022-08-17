<script>

import Comment from './CommentPost.vue'
import { mapStores } from 'pinia';
import { useLoginStore } from "../stores/loginStatus";

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

export default {
    props: {
        topicId: String,
    },
    data() {
        return {
            desiredComment: undefined, //takes in the current typed value in the comment pox
            postedComments: [], //array of all the comment in the firebase
            loginInfo: null,
            timer: '', //timer that refreshes the comments every so often based on AUTO_Refresh
            AUTO_REFRESH: 50000,
            // threads?
            selectedID: null,
            parentComment: null,
            // parentCommentId: undefined,

        };
    },
    computed: {
        ...mapStores(useLoginStore),
    },
    async created () {
        this.getComments(); // will pull comments from firebase
        if (this.loginStore.userID != '') {
            try {
                const docReference = doc(db, 'userInfo', this.loginStore.userID);
                const response = await getDoc(docReference);

                this.loginInfo = {
                    firstName: response.firstName,
                    ...response.data(),
                }
            } catch (err) {
                console.error(err);
            }
        }
        // this.timer = setInterval(this.getComments, this.AUTO_REFRESH); //update comments every AUTO_REFRESH Amount of time
    },
    methods: {  
        async getComments() {
            try {
                //get comment periodicaly is called to pull any new comments from the database
                // the id comparison is to prevent deleting all the comments the adding them again creating 
                // an annoying flash
                let q = query(collection(db, ('comments')));   
                const qSnap = await getDocs(q); //pull database docs from firebase
                qSnap.forEach((rdoc) => 
                { //for each doc
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
                    this.postedComments.sort(function(a,b)
                    {
                        // alert(a.cdata.timeStamp);
                      return a.cdata.timeStamp -  b.cdata.timeStamp;
                    });
                });
                
            } catch (e) {
                alert('retrieve' + e);
            }

        },
        async createComment() { //generates a comment
            if (this.desiredComment != null /*&& userLoggedIn == true */) {
                try {
                    // alert((this.loginInfo.firstName + " " +  this.loginInfo.lastName));
                    let userName = (this.loginInfo.firstName + " " +  this.loginInfo.lastName);
                    const docReference = await addDoc(
                        collection(db, ('comments')),
                        {
                            timeStamp: new Date(),
                            topicId: this.topicId,//connect to topicID store
                            poster: userName, //connect to UserID store
                            replies: [], // my idea of how to implement threads
                            comment: this.desiredComment,
                            parentId: this.selectedID,
                            parentComment: this.parentComment,
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
            // document.getElementById('commentSubmitionInput').value=null;
            this.desiredComment = undefined;
            // document.getElementById('commentSubmitionInput').placeholder="Comment...";
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
        },

        //threads
        selectComment(id, replyTo) {
            // alert("test: " + String(a));
            if(id == this.selectedID)
            {
                this.selectedID = null;
                this.parentComment = null;
            }
            else
            {
                this.selectedID = id;
                this.parentComment = replyTo.substring(0,50);
            }
        },
    },
    beforeMount() {
        this.getComments();
    },
    beforeDestroy () {
      this.cancelTimerAutoUpdate();
    },
    components: { Comment }
}
</script>
<template>
    <!-- HTML for components goes here -->
    <!-- <h2>3 {{parentCommentId}}</h2> -->

    <div id="commentWrapper">
        <div id="displayCommentBox">
            <div v-for="(comment, index) in postedComments">
                <!-- <p>{{comment}}</p> -->
                <Comment :id="postedComments[index].cid" @click="selectComment(postedComments[index].cid, postedComments[index].cdata.comment)" :timestamp="timeSince(postedComments[index].cdata.timeStamp)" :poster="postedComments[index].cdata.poster" :replies="[]"
                    :comment="postedComments[index].cdata.comment" :cid="postedComments[index].cid" :parentId="postedComments[index].cdata.parentId" :parentComment="postedComments[index].cdata.parentComment"></Comment>
            </div>
        </div>
        <div id="commentMaker">
            <p>Comment: </p>
            <p class="replyToPrompt" v-if="!login && selectedID">Reply to: <span id="commentReplyTo">{{parentComment}}</span></p>
            <p class="errorLabel" v-if="!loginInfo">&#x26A0 Login to comment </p>
            <div id="commentInlineDisplay">
                <textarea id="commentSubmitionInput" v-if="loginInfo" v-model="desiredComment" @keypress.enter="submitComment" placeholder="Comment..."></textarea>
                <button v-if="loginInfo" id="commentSubmit" @click="submitComment">&#x27A1</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* Styles for component go here */
#commentWrapper {
    /* background-color: rgb(106, 69, 69); */
    padding: 10px;
    width: 100%;
    overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #2e2e2e;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

#displayCommentBox {
    display: flex;
    flex-direction: column-reverse;
    margin: 0 auto;
    background-color: #7dbc6e;
    height: 400px;
    overflow-y: scroll;
    width: 100%;
}

#commentMaker {
    background-color: rgb(138, 255, 208);
    padding: 10px;
    width: calc(100% - 40px);
    position: relative;
    bottom: 0px;

}
.replyToPrompt
{
    font-weight: bold;
    color:#1c03c5;
    font-size: 17px;
}
.errorLabel
{
    color: red;
    font-weight: bold;
    font-size: 1.2rem;
    text-indent: 30px;
}
#commentSubmitionInput
{
    width: calc(100% - 50px);
    /* border-radius: ; */
    resize: none;

}
#commentSubmit
{
    background-color: rgb(201, 255, 205);
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-radius: 100%;
}
#commentInlineDisplay
{
    width: 100%;
    display: inline-flex;
}
</style>   