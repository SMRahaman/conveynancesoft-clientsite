// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz2UZar2ikQqbl4BR576_Zl62MbC_H4VE",
  authDomain: "conveynance-soft.firebaseapp.com",
  projectId: "conveynance-soft",
  storageBucket: "conveynance-soft.appspot.com",
  messagingSenderId: "531794512668",
  appId: "1:531794512668:web:91e867fc4fd422571e88d9",
  measurementId: "G-YD2E66GCE9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
