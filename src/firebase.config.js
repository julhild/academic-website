import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpOYBafD6U_W3eqm61vhdhAaUBo8S0hT8",
  authDomain: "cat-sciense-website.firebaseapp.com",
  projectId: "cat-sciense-website",
  storageBucket: "cat-sciense-website.appspot.com",
  messagingSenderId: "101418695136",
  appId: "1:101418695136:web:8e84f245548c92c6535385",
  measurementId: "G-2X094PNDBE",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
