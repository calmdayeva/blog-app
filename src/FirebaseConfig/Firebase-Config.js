// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getStorage} from 'firebase/storage';
import { getFirestore} from 'firebase/firestore';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWOTs0_yMNuecZRUtRRvxYIYILNCza7Gg",
  authDomain: "firstproject-kay.firebaseapp.com",
  projectId: "firstproject-kay",
  storageBucket: "firstproject-kay.appspot.com",
  messagingSenderId: "962565379535",
  appId: "1:962565379535:web:4e323bc582da00972daeba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(app);
export default app;