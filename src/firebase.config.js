// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACpTQoiPBm3ecyd3zZyHZEYE5_dqtaP9c",
  authDomain: "house-marketplace-420.firebaseapp.com",
  projectId: "house-marketplace-420",
  storageBucket: "house-marketplace-420.appspot.com",
  messagingSenderId: "750495137651",
  appId: "1:750495137651:web:f63d728c5d5b939f004f06"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()