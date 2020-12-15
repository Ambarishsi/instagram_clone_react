import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDGBP4x0UQoQ7h2IXDUBwHLurw_JGUxwD4",
    authDomain: "instagram-clone-7bb17.firebaseapp.com",
    databaseURL: "https://instagram-clone-7bb17.firebaseio.com",
    projectId: "instagram-clone-7bb17",
    storageBucket: "instagram-clone-7bb17.appspot.com",
    messagingSenderId: "261951081160",
    appId: "1:261951081160:web:70a7bb59e111682853b3fd",
    measurementId: "G-Q27WHCYSVH"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};

 

