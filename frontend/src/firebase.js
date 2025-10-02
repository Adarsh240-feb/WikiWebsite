// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBxAOcBgkyUqYBNmcQvKDfnqGTuqiiHJGU",
    authDomain: "wikidata-640dc.firebaseapp.com",
    projectId: "wikidata-640dc",
    storageBucket: "wikidata-640dc.firebasestorage.app",
    messagingSenderId: "1001389626080",
    appId: "1:1001389626080:web:d378939fadc625df387685",
    measurementId: "G-YJFXX2F5K8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);