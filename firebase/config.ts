import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ Instead of the above, we just fall back to memory persistence (Firebase handles this for Expo).

const firebaseConfig = {
  apiKey: 'AIzaSyAO_Y63V3rUkqSc9OBQ7XQavo1JXeYz2No',
  authDomain: 'patashala-lk.firebaseapp.com',
  projectId: 'patashala-lk',
  storageBucket: 'patashala-lk.firebasestorage.app',
  messagingSenderId: '417752899921',
  appId: '1:417752899921:web:c10835b34fc6c11c967370',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
