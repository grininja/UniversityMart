// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage,ref} from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1f6C2aEAkiIu7aT92Zw-_VQ_ZgiZD6yk",
  authDomain: "universitymart-6a223.firebaseapp.com",
  projectId: "universitymart-6a223",
  storageBucket: "universitymart-6a223.appspot.com",
  messagingSenderId: "714452464998",
  appId: "1:714452464998:web:db3462fa40a36776e244a7",
  measurementId: "G-ES88QQDDZT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const storageRef = ref(storage);
// const analytics = getAnalytics(app);