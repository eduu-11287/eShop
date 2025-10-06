import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { FiMapPin } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

const ResponsiveMenu = ({ openNav, setOpenNav, location, getLocation }) => {
  const { user, logout } = useAuth();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
      setOpenNav(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {/* Overlay */}
      {openNav && (
        <div
          onClick={() => setOpenNav(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Menu */}
      <div
        className={`${
          openNav ? "left-0" : "-left-full"
        } fixed bottom-0 top-0 z-40 flex h-screen w-[280px] sm:w-[320px] flex-col bg-white px-6 sm:px-8 pb-6 pt-6 text-black lg:hidden rounded-r-xl shadow-2xl transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-bold text-2xl sm:text-3xl">
              <span className="text-red-500 font-serif">e</span>Shop
            </h1>
            <CgClose
              onClick={() => setOpenNav(false)}
              className="h-6 w-6 sm:h-7 sm:w-7 cursor-pointer hover:text-red-500 transition-colors"
            />
          </div>

          {/* User Info Section - Show if logged in */}
          {user && (
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt={user.displayName || "User"}
                  className="w-12 h-12 rounded-full border-2 border-red-500 object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-base">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Location Section */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <FiMapPin className="text-red-500 h-5 w-5" />
              <span className="font-semibold text-base">Delivery Location</span>
            </div>
            {location ? (
              <div className="ml-7 text-sm text-gray-700">
                <p className="font-medium">{location.county}</p>
                <p className="text-gray-500">{location.state}</p>
              </div>
            ) : (
              <p className="ml-7 text-sm text-gray-500">No location set</p>
            )}
            <button
              onClick={() => {
                getLocation();
                setOpenNav(false);
              }}
              className="ml-7 mt-3 bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600 transition-colors"
            >
              Detect my location
            </button>
          </div>

          <nav className="flex-1">
            <ul className="flex flex-col gap-6 sm:gap-7 text-lg sm:text-xl font-semibold">
              <NavLink
                to={"/"}
                onClick={() => setOpenNav(false)}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 border-red-500 text-red-500"
                      : "text-black hover:text-red-500"
                  } cursor-pointer transition-colors pb-1`
                }
              >
                <li>Home</li>
              </NavLink>
              <NavLink
                to={"/products"}
                onClick={() => setOpenNav(false)}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 border-red-500 text-red-500"
                      : "text-black hover:text-red-500"
                  } cursor-pointer transition-colors pb-1`
                }
              >
                <li>Products</li>
              </NavLink>
              <NavLink
                to={"/about"}
                onClick={() => setOpenNav(false)}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 border-red-500 text-red-500"
                      : "text-black hover:text-red-500"
                  } cursor-pointer transition-colors pb-1`
                }
              >
                <li>About</li>
              </NavLink>
              <NavLink
                to={"/contact"}
                onClick={() => setOpenNav(false)}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 border-red-500 text-red-500"
                      : "text-black hover:text-red-500"
                  } cursor-pointer transition-colors pb-1`
                }
              >
                <li>Contact</li>
              </NavLink>
            </ul>
          </nav>

          {/* Auth Buttons Section */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              {user ? (
                // User is logged in - show Sign Out button
                <button
                  onClick={handleSignOut}
                  className="bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-md cursor-pointer w-full text-center hover:bg-red-50 transition-colors font-semibold"
                >
                  Sign Out
                </button>
              ) : (
                // User is not logged in - show Sign In button
                <button
                  onClick={() => {
                    setOpenAuthModal(true);
                    setOpenNav(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer w-full text-center hover:bg-red-600 transition-colors font-semibold"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={openAuthModal} 
        onClose={() => setOpenAuthModal(false)} 
      />
    </>
  );
};

export default ResponsiveMenu;