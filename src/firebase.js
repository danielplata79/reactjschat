// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqkn1pftcTk1ASvrBP9G71hajOYJ6QGCE",
  authDomain: "reactjschat-31bf0.firebaseapp.com",
  projectId: "reactjschat-31bf0",
  storageBucket: "reactjschat-31bf0.appspot.com",
  messagingSenderId: "420517910283",
  appId: "1:420517910283:web:3db25a2cec10922047f40e",
  measurementId: "G-BHX64GHRM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);