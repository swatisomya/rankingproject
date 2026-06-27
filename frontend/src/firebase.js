import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2hejZgAmIIJn7pk2xUd3d1ZPTAbLCcnk",
  authDomain: "rankhub-666a8.firebaseapp.com",
  projectId: "rankhub-666a8",
  storageBucket: "rankhub-666a8.firebasestorage.app",
  messagingSenderId: "944485326200",
  appId: "1:944485326200:web:db4ec7fa5fae00c8787c8d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};