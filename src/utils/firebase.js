// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiYGJEaxwu6jFH9NQHk3dvq4KnuN6mmjk",
  authDomain: "texxano-mobile.firebaseapp.com",
  projectId: "texxano-mobile",
  storageBucket: "texxano-mobile.firebasestorage.app",
  messagingSenderId: "1045123674598",
  appId: "1:1045123674598:web:09f2ea9ccddbf9d46e2627",
  measurementId: "G-G7DMEFY7MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);