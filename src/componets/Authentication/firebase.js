import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6POgLH1WmDYpWSz222JWJPrGNGCpg650",
  authDomain: "rehab-78a2b.firebaseapp.com",
  projectId: "rehab-78a2b",
  storageBucket: "rehab-78a2b.firebasestorage.app",
  messagingSenderId: "689541096407",
  appId: "1:689541096407:web:d09cac1978c8896dca6192"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { db,auth }; 