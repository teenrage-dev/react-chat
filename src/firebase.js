// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAfkSG84SUUdIX1WZQJ9QZiNbxBS4vsXlo',
  authDomain: 'chat-react-ea77d.firebaseapp.com',
  projectId: 'chat-react-ea77d',
  storageBucket: 'chat-react-ea77d.appspot.com',
  messagingSenderId: '881980946009',
  appId: '1:881980946009:web:bcd796a3a0b10e946c2348',
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
