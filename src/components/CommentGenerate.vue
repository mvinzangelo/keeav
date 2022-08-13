<script>

import Comment from './CommentPost.vue'

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
            desiredComment: undefined,
            postedComments: [],
            timer: '',
        };
    },
    created () {
        this.getComments();
        this.timer = setInterval(this.getComments, 50000);
    },
    methods: {
        // callable functions for HTML go here
        // ex: incCount()
        // {
        //     this.count++;
        // }
        async getComments() {
            try {
                const date = new Date();

                this.postedComments = [];
                // alert('443');
                let q = query(collection(db, ('comments')));

                // alert('543');
                const qSnap = await getDocs(q);

                qSnap.forEach((rdoc) => {
                    // alert(rdoc.id);
                    this.postedComments.push(rdoc.data())

                });
                
            } catch (e) {
                alert('retrieve' + e);
            }

        },
        async createComment() {
            if (this.desiredComment != null /*&& userLoggedIn == true */) {
                try {
                    console.log('calling create comment');
                    console.log('Comment: ' + this.createComment);
                    const date = new Date();
                    const docReference = await addDoc(
                        collection(db, ('comments')),
                        {
                            timeStamp: new Date(),
                            topicId: '',
                            poster: {},
                            replies: [],
                            comment: this.desiredComment
                        });
                    // alert('commen');
                    console.log('New comment has ID:', docReference.id);
                    console.log('Completed createComment')
                } catch (e) {
                    alert('create comment' + e);
                    console.error(e);
                }
            }
        },
        submitComment() {
            const time = this.getTime();
            this.createComment();
            // alert('111');
            this.getComments();
            // alert('22211');
            // this.postedComments.push({ timestamp: new Date(), poster: NaN, responseToo: NaN, comment: this.desiredComment },);
            // this.postedComments = this.getComments();
            // alert(time);
        },
        getTime() {
            const calendar = new Date();
            // alert(calendar);
            return calendar;
        },
        timeSince(date) {
            // alert(typeof(date));
            // alert(Object.keys(date));
            let tempSeconds = date.seconds;
            // alert('cc');
            let nonUnixDate = new Date(tempSeconds*1000);
            // alert(nonUnixDate);
            let seconds = Math.floor((new Date() - nonUnixDate) / 1000);
            // alert(seconds);
            let interval = seconds / 31536000;
            // alert('00');
            if (interval > 1) {
                // alert('11');
                return Math.floor(interval) + " years ago";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                // alert('222');
                return Math.floor(interval) + " months ago";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                // alert('333');
                return Math.floor(interval) + " days ago";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                // alert('444');
                return Math.floor(interval) + " hours ago";
            }
            interval = seconds / 60;
            if (interval > 1) {
                // alert('555');
                return Math.floor(interval) + " minutes ago";
            }
            // alert('666');
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
                <Comment :timestamp="timeSince(postedComments[index].timeStamp)" :poster="{}" :replies="[]"
                    :comment="postedComments[index].comment"></Comment>
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