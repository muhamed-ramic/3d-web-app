// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHnq5iLqEHI3BqFFfCFqkictPeeVeHwjM",
  authDomain: "d-mini-web-app.firebaseapp.com",
  projectId: "d-mini-web-app",
  storageBucket: "d-mini-web-app.firebasestorage.app",
  messagingSenderId: "291839076688",
  appId: "1:291839076688:web:a1c732e68f7262ac212455",
  measurementId: "G-C1N2MFW10N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);