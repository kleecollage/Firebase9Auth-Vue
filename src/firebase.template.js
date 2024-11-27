// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "<API-KEY>",
  authDomain: "auth-vue3-5b15d.firebaseapp.com",
  projectId: "<ID>",
  storageBucket: "auth-vue3-5b15d.firebasestorage.app",
  messagingSenderId: "773805580553",
  appId: "1:773805580553:web:a2f89a611380a58f67b3d8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const timeStamp = serverTimestamp

const getCurrentUser = () => {
  return new Promise ( (resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export { app, auth, db, getCurrentUser, timeStamp };
