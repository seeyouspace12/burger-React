import Rebase from 're-base';
import firebase from "firebase/app";
require('firebase/database');

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDJRbHaIZcptOzODIvYqzteo73d-CD_LR8",
    authDomain: "very-hot-burgers-3ec4a.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-3ec4a-default-rtdb.europe-west1.firebasedatabase.app",
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export  default  base;