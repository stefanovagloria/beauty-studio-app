// firebase.js

import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCWQ7rikgUK2EOXSim2J34u00FHsXSZxAI",
    authDomain: "nefertiti-studio-e396a.firebaseapp.com",
    projectId: "nefertiti-studio-e396a",
    storageBucket: "nefertiti-studio-e396a.appspot.com",
    messagingSenderId: "143383684970",
    appId: "1:143383684970:web:348e300742f35c76336713",
    measurementId: "G-529MHYQ14P"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
