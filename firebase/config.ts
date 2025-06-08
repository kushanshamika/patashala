// firebase/config.ts
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔁 Replace with your actual Firebase config (from Project Settings > Web App)
const firebaseConfig = {
  apiKey: "AIzaSyAO_Y63V3rUkqSc9OBQ7XQavo1JXeYz2No",
  authDomain: "patashala-lk.firebaseapp.com",
  projectId: "patashala-lk",
  storageBucket: "patashala-lk.firebasestorage.app",
  messagingSenderId: "417752899921",
  appId: "1:417752899921:web:c10835b34fc6c11c967370"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
