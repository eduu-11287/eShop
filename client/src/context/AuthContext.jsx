import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

const AuthContext = createContext();

// Move provider outside component to avoid recreating it
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Helper: map user data
  const mapUser = (firebaseUser) =>
    firebaseUser
      ? {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL:
            firebaseUser.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }
      : null;

  // --- Google sign-in with popup
  const signInWithGooglePopup = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      // Don't manually setUser here - let onAuthStateChanged handle it
      toast.success(`Welcome, ${firebaseUser.displayName || "User"} 👋`);
    } catch (error) {
      console.error("❌ Google sign-in error:", error);
      
      // Better error messages based on error code
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Sign-in cancelled");
      } else if (error.code === 'auth/popup-blocked') {
        toast.error("Popup blocked. Please allow popups for this site.");
      } else {
        toast.error("Sign-in failed. Please try again.");
      }
    }
  };

  // --- Logout
  const logout = async () => {
    try {
      await signOut(auth);
      // Don't manually setUser(null) - let onAuthStateChanged handle it
      toast("Signed out 👋");
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast.error("Sign-out failed. Try again.");
    }
  };

  // --- Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(mapUser(currentUser));
        setLoading(false);
      },
      (error) => {
        console.error("❌ Auth state change error:", error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGooglePopup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};