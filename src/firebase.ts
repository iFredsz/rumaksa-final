import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, UserCredential} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: 'AIzaSyAljkL5BuNHPe7ZP8yTM-WDgvoR4ViUzyw',
  authDomain: 'rumaksa-web.firebaseapp.com',
  projectId: 'rumaksa-web',
  storageBucket: 'rumaksa-web.firebasestorage.app',
  messagingSenderId: '339490329652',
  appId: '1:339490329652:web:f10ce7715a1d549aab2661',
  measurementId: 'G-9ZCWDHD8FT',
};

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth
const storage = getStorage(app); // Initialize Storage

const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential : UserCredential= await signInWithEmailAndPassword(auth, email, password);
    return userCredential
  } catch (error) {
    console.error("Error signing in with email and password", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};

const checkUserLoginStatus = (): boolean => {
  return !!auth.currentUser;
};

export { db, auth, storage, app, loginWithEmailAndPassword, logout, checkUserLoginStatus };

