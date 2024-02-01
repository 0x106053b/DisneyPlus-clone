import { initializeApp } from "firebase/app";

// firebase의 auth 기능을 사용하기 위해 "firebase/auth" import
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDegFrux3rnXip5y8uq8rsFwpkVyREnLRU",
  authDomain: "react-disney-plus-app-6a99e.firebaseapp.com",
  projectId: "react-disney-plus-app-6a99e",
  storageBucket: "react-disney-plus-app-6a99e.appspot.com",
  messagingSenderId: "8798547952",
  appId: "1:8798547952:web:2b915f49d6639ed6e2f735"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;