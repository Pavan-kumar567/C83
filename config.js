import firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyA3wNbgjZxD9I15CVIxM2QdWeGVN_5F_No",
    authDomain: "booksanta-23c4e.firebaseapp.com",
    databaseURL: "https://booksanta-23c4e.firebaseio.com",
    projectId: "booksanta-23c4e",
    storageBucket: "booksanta-23c4e.appspot.com",
    messagingSenderId: "427889943360",
    appId: "1:427889943360:web:834cf99ecf597edc8a90a5",
    measurementId: "G-6DMZ15JQWV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();