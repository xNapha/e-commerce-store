// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCh7Q3NOEeK7mk1R4u2yrwAykSOkvvpAM8",
    authDomain: "e-commerce-store-ea136.firebaseapp.com",
    projectId: "e-commerce-store-ea136",
    storageBucket: "e-commerce-store-ea136.appspot.com",
    messagingSenderId: "402830661063",
    appId: "1:402830661063:web:66304dfebee785a47a75e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
