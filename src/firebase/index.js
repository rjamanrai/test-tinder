

const firebaseConfig = {
  apiKey: "AIzaSyBzqEUgmF0mYFjVxuAhU39x7sTRx4aa3WE",
  authDomain: "test-tinder-ed663.firebaseapp.com",
  databaseURL:
    "https://test-tinder-ed663-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-tinder-ed663",
  storageBucket: "test-tinder-ed663.appspot.com",
  messagingSenderId: "161115876157",
  appId: "1:161115876157:web:71dcd4362cd80d46a3b354",
  measurementId: "G-SKWH812C14",
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

 

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export const auth = getAuth(app);

export default db
// export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.firestore();
