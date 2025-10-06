import { createContext, useContext, useEffect, useState, useRef } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
  const [authInitialized, setAuthInitialized] = useState(false);
  
  // Prevent duplicate toasts and redirects
  const redirectHandled = useRef(false);
  const toastShown = useRef(false);
  
  const googleProvider = new GoogleAuthProvider();

  // Optional: Request additional scopes
  googleProvider.addScope('profile');
  googleProvider.addScope('email');

  // Helper: Normalize user data
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

  // Detect mobile device (more comprehensive check)
  const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (
      /android/i.test(userAgent) ||
      (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform))
    );
  };

  const signInWithGoogle = async () => {
    try {
      // Set persistence before sign-in
      await setPersistence(auth, browserLocalPersistence);

      const mobile = isMobile();
      
      if (mobile) {
        // Mobile: Use redirect (native browser flow)
        console.log("📱 Mobile detected - using signInWithRedirect");
        
        // Store flag to show loading state after redirect
        sessionStorage.setItem('authRedirectPending', 'true');
        
        toast.loading("Redirecting to Google...", { id: "google-signin" });
        await signInWithRedirect(auth, googleProvider);
        // User will be redirected away - code below won't execute
      } else {
        // Desktop: Use popup (modal-like experience)
        console.log("🖥️ Desktop detected - using signInWithPopup");
        
        const loadingToast = toast.loading("Opening Google sign-in...", { id: "google-signin" });
        
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const firebaseUser = result.user;
          
          toast.dismiss(loadingToast);
          setUser(mapUser(firebaseUser));
          
          if (!toastShown.current) {
            toast.success(`Welcome, ${firebaseUser.displayName || "User"}!`, { id: "welcome-toast" });
            toastShown.current = true;
          }
        } catch (popupError) {
          toast.dismiss(loadingToast);
          
          // Handle popup blocked or closed by user
          if (popupError.code === 'auth/popup-blocked') {
            toast.error("Popup blocked! Please allow popups for this site.", { duration: 5000 });
          } else if (popupError.code === 'auth/popup-closed-by-user') {
            toast("Sign-in cancelled", { icon: "ℹ️" });
          } else {
            throw popupError; // Re-throw other errors
          }
        }
      }
    } catch (error) {
      console.error("❌ Google Sign-In Error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      toast.dismiss("google-signin");
      
      // User-friendly error messages
      const errorMessages = {
        'auth/network-request-failed': 'Network error. Check your connection.',
        'auth/too-many-requests': 'Too many attempts. Try again later.',
        'auth/unauthorized-domain': 'This domain is not authorized. Contact support.',
        'auth/operation-not-allowed': 'Google sign-in is not enabled.',
      };
      
      toast.error(errorMessages[error.code] || "Sign-in failed. Please try again.", {
        duration: 4000,
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toastShown.current = false;
      toast("Signed out 👋", { id: "signout-toast" });
    } catch (error) {
      console.error("❌ Logout error:", error);
      toast.error("Sign-out failed. Please try again.");
    }
  };

  // 🔥 CRITICAL: Handle redirect result FIRST (before onAuthStateChanged)
  useEffect(() => {
    const handleRedirectResult = async () => {
      if (redirectHandled.current) return;
      
      try {
        console.log("🔍 Checking for redirect result...");
        
        // Check if we're expecting a redirect
        const isPendingRedirect = sessionStorage.getItem('authRedirectPending') === 'true';
        
        if (isPendingRedirect) {
          setLoading(true);
          toast.loading("Completing sign-in...", { id: "redirect-loading" });
        }
        
        const result = await getRedirectResult(auth);
        
        if (result?.user) {
          console.log("✅ Redirect successful:", result.user.email);
          redirectHandled.current = true;
          
          const firebaseUser = result.user;
          setUser(mapUser(firebaseUser));
          
          toast.dismiss("redirect-loading");
          
          if (!toastShown.current) {
            toast.success(`Welcome back, ${firebaseUser.displayName || "User"}!`, {
              id: "welcome-toast",
              duration: 3000,
            });
            toastShown.current = true;
          }
        } else if (isPendingRedirect) {
          // Redirect was pending but no result (user cancelled or error)
          console.log("⚠️ Redirect completed but no user");
          toast.dismiss("redirect-loading");
        }
        
        // Clear the pending flag
        sessionStorage.removeItem('authRedirectPending');
      } catch (error) {
        console.error("❌ Redirect result error:", error);
        console.error("Error code:", error.code);
        
        toast.dismiss("redirect-loading");
        sessionStorage.removeItem('authRedirectPending');
        
        // Handle specific redirect errors
        if (error.code === 'auth/account-exists-with-different-credential') {
          toast.error("This email is already linked to another account.", { duration: 5000 });
        } else if (error.code !== 'auth/popup-closed-by-user') {
          toast.error("Authentication failed. Please try again.");
        }
      } finally {
        redirectHandled.current = true;
      }
    };

    handleRedirectResult();
  }, []);

  // 🔥 Monitor auth state changes (session persistence)
  useEffect(() => {
    console.log("👂 Setting up auth state listener...");
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔄 Auth state changed:", currentUser?.email || "No user");
      
      // Only update user if redirect hasn't shown toast yet
      setUser(mapUser(currentUser));
      
      if (!authInitialized) {
        setAuthInitialized(true);
        setLoading(false);
      }
    });

    return () => {
      console.log("🧹 Cleaning up auth listener");
      unsubscribe();
    };
  }, [authInitialized]);

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};