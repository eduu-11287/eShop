import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, skip login page
  useEffect(() => {
    if (user) {
      navigate("/checkout");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/checkout"); // redirect after success
    } catch (error) {
      console.error("Google sign-in failed:", error);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] px-4 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Welcome back 👋
      </h1>
      <p className="text-gray-600 mb-8">
        Sign in to continue to checkout and complete your purchase.
      </p>

      <button
        onClick={handleGoogleLogin}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center gap-3"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          className="w-6 h-6"
        />
        Sign in with Google
      </button>

      <p className="text-gray-500 text-sm mt-6">
        We’ll never share your data. You’re safe here 🔒
      </p>
    </div>
  );
};

export default Login;
