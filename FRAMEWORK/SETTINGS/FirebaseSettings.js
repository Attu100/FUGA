// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjm5G6f1Y3wpLXfdo5A1fSPIuyN_5i5-I",
  authDomain: "fuga-51ee0.firebaseapp.com",
  projectId: "fuga-51ee0",
storageBucket: "fuga-51ee0.appspot.com",
  messagingSenderId: "379538541849",
  appId: "1:379538541849:web:401549c866ae0ad9af8988"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});