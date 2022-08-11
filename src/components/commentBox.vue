<script>

import Comment from './comment.vue'

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
            // date: new Date(),
            postedComments: [],
        };
    },
    methods: {
        // callable functions for HTML go here
        // ex: incCount()
        // {
        //     this.count++;
        // }
        async getComments() {
            try 
            {   
                const date = new Date();

                this.postedComments=[];
                // alert('443');
                let q = query(collection(db, ('comments')));

                // alert('543');
                const qSnap = await getDocs(q);

                qSnap.forEach((rdoc) => {
                    this.postedComments.push(rdoc.data())
            
                });
            } catch (e)
            {
                alert('retrieve' + e);
            }
        
        },
        async createComment()
        {
            if(this.desiredComment != null /*&& userLoggedIn == true */)
            {
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
                } catch(e)
                {
                    alert('create comment'+e);
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
        getTime() 
        {
            const calendar = new Date();
            // alert(calendar);
            return calendar;
        }
        
    },
     beforeMount()
     {
        this.getComments();
     },
    components: { Comment }
}
</script>
<template onl>
<!-- HTML for components goes here -->
    <div id="commentWrapper">
        <div id="displayCommentBox">
            <div v-for="(comment, index) in postedComments">
                <Comment 
                    :timeStamp="postedComments[index].timeStamp"
                    :poster = "{}"
                    :replies="[]"
                    :comment="postedComments[index].comment"
                ></Comment>
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
        /* top: 10px;  */
        /* padding: 10px; */
        width: 100%;
        /* margin: 10px 10px 10px 10px; */
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