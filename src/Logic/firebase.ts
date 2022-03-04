import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD15OOIEqX05ueByMITYrFt6VeDMFis1_M",
  authDomain: "collectors-community.firebaseapp.com",
  projectId: "collectors-community",
  storageBucket: "collectors-community.appspot.com",
  messagingSenderId: "800346630630",
  appId: "1:800346630630:web:2da56990e4045b148b8e27",
  measurementId: "G-KTYV1X91VX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firestore = getFirestore(app);

export { firebaseAuth, firestore };
