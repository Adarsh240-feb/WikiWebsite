// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCifQRopfnrilGat-Ed_nDmp86L8S96t0A",
  authDomain: "wikidata-67d77.firebaseapp.com",
  projectId: "wikidata-67d77",
  storageBucket: "wikidata-67d77.firebasestorage.app",
  messagingSenderId: "582647204443",
  appId: "1:582647204443:web:019a966950721f244c0d7e",
  measurementId: "G-MY1D82H2E5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize and export Firestore instance for use throughout the app
export const db = getFirestore(app);