// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhVe1s8oKgWw09FAfD1m6_MXfu6JZzIHM",
  authDomain: "todo-app-8a704.firebaseapp.com",
  projectId: "todo-app-8a704",
  storageBucket: "todo-app-8a704.appspot.com",
  messagingSenderId: "336955917337",
  appId: "1:336955917337:web:4d98012271694181c3d688",
  measurementId: "G-ZJDYJV9LQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db= getFirestore(app)