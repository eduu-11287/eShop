import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AuthModal = ({ isOpen, onClose }) => {
  const { signInWithGooglePopup } = useAuth();

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      await signInWithGooglePopup();
      toast.success("Signed in successfully!");
      onClose();
    } catch (error) {
      console.error("❌ Google sign-in failed:", error);
      toast.error("Sign-in failed. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-[90%] sm:w-[400px] animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-3 text-center text-gray-800">
          Sign in to Continue
        </h2>
        <p className="text-gray-600 mb-6 text-center text-sm">
          You need to sign in to complete your purchase.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
        >
          Continue with Google
        </button>

        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
