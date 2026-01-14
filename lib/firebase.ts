import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpdsPiyiakV8KTCnBvCotOdDm4U_RK86M",
  authDomain: "project-6284060146436019339.firebaseapp.com",
  projectId: "project-6284060146436019339",
  storageBucket: "project-6284060146436019339.firebasestorage.app",
  messagingSenderId: "768144896302",
  appId: "1:768144896302:web:6789c3d4ebf1ae1199cabf",
  measurementId: "G-JW1LMM21WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Authentication Exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export { analytics };
