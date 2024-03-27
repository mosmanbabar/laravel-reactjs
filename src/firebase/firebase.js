import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/app';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
   
    apiKey: "AIzaSyBJnN1ByC0nwB0zf0WuuKuO6JDp_zpLlNo",
    authDomain: "fir-32fb1.firebaseapp.com",
    projectId: "fir-32fb1",
    storageBucket: "fir-32fb1.appspot.com",
    messagingSenderId: "552693027421",
    appId: "1:552693027421:web:52426c073b982346b8b3b4",
    measurementId: "G-E2N3SSDK19"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getDatabase(app);

export { app, auth, db };