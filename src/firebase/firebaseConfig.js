import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqK_VQR7zebS3Fty-KdZar4X94GrBvslc",
  authDomain: "com-102270.firebaseapp.com",
  projectId: "com-102270",
  storageBucket: "com-102270.firebasestorage.app",
  messagingSenderId: "268732327991",
  appId: "1:268732327991:web:d1f5bc239fa26e2a26b7b2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
