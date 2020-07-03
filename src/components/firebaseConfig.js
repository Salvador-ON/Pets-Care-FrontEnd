import firebase from 'firebase'
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA44fL4AQDsT96kS3ywQepRb15r1-tYOY0",
  authDomain: "pets-care-be.firebaseapp.com",
  databaseURL: "https://pets-care-be.firebaseio.com",
  projectId: "pets-care-be",
  storageBucket: "pets-care-be.appspot.com",
  messagingSenderId: "354735734638",
  appId: "1:354735734638:web:14f3e8fb688a59aec74b7f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };