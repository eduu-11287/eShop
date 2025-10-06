import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import { Navigate } from "react-router-dom";

const CheckoutGuard = ({ children }) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!user) {
    return (
      <>
        <AuthModal isOpen={!user} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  return children;
};

export default CheckoutGuard;
