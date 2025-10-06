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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

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
      setUser(mapUser(firebaseUser));
      toast.success(`Welcome, ${firebaseUser.displayName || "User"} 👋`);
    } catch (error) {
      console.error("❌ Google sign-in error:", error);
      toast.error("Sign-in failed. Please try again.");
    }
  };

  // --- Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast("Signed out 👋");
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast.error("Sign-out failed. Try again.");
    }
  };

  // --- Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(mapUser(currentUser));
      setLoading(false);
    });
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
