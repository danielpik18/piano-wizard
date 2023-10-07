// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7oGUxTs2oIcZuiTIyCtcgJoJYm0FFGJo",
    authDomain: "piano-wizard.firebaseapp.com",
    projectId: "piano-wizard",
    storageBucket: "piano-wizard.appspot.com",
    messagingSenderId: "820973930669",
    appId: "1:820973930669:web:8d99334f3bdeb3da2d1e24",
    measurementId: "G-HRCYMZWLSG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
