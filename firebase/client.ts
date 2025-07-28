// FILE: firebase/client.ts
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOPdXQtCDgJ9dJuiaNYiiUcVZB6FPZh-I",
    authDomain: "wiseprep-7cc96.firebaseapp.com",
    projectId: "wiseprep-7cc96",
    storageBucket: "wiseprep-7cc96.appspot.com", // ✅ fix typo
    messagingSenderId: "800674498587",
    appId: "1:800674498587:web:42fb1fc5986efb25b190be",
    measurementId: "G-7V44TGN4KS",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // ✅ Fixed getApps()

export const auth = getAuth(app);
export const db = getFirestore(app);
