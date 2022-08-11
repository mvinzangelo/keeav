// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDX6ya_rpIsC_9a5S514pltoGnbFeQxuzA",
    authDomain: "hammer-7cff9.firebaseapp.com",
    projectId: "hammer-7cff9",
    storageBucket: "hammer-7cff9.appspot.com",
    messagingSenderId: "936034255142",
    appId: "1:936034255142:web:c9e1f79491c51dab0101e7"
};

// Initialize Firebase
export const db = getFirestore(initializeApp(firebaseConfig));