
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kathir-blog.firebaseapp.com",
  projectId: "kathir-blog",
  storageBucket: "kathir-blog.appspot.com",
  messagingSenderId: "306434855289",
  appId: "1:306434855289:web:aab2cf9b3f456d18ab5fa8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);