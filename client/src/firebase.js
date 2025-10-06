import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3xbIDLNFKYOSaLUTMBx3Mem147Xw252w",
    authDomain: "eshop-399c7.firebaseapp.com",
    projectId: "eshop-399c7",
    storageBucket: "eshop-399c7.firebasestorage.app",
    messagingSenderId: "971753712771",
    appId: "1:971753712771:web:249bcbfaacb12c81f1bfb6"
};

// initialize firebase
const app =initializeApp(firebaseConfig);

// initialize firebase authentication
export const auth = getAuth(app);

// google authentication provider
export const googleProvider = new GoogleAuthProvider();