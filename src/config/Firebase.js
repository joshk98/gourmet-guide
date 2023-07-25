import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDr50iwNEfq4R5R2E3xKJ46kfIArbv2BZA",
  authDomain: "gourmet-guide-c5f51.firebaseapp.com",
  projectId: "gourmet-guide-c5f51",
  storageBucket: "gourmet-guide-c5f51.appspot.com",
  messagingSenderId: "228118331925",
  appId: "1:228118331925:web:dd4fc67fc42571ca2bc41c",
  measurementId: "G-DLY35WK5G6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error creating account:", error.message);
    return null;
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    return null;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error logging out:", error.message);
    return false;
  }
};

export { app, auth, signIn, signUp };
