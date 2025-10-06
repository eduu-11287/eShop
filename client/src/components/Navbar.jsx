import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ResponsiveMenu from "./ResponsiveMenu";
import AuthModal from "./AuthModal";

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
  const { cartItem } = useCart();
  const { user, logout } = useAuth();
  const [openNav, setOpenNav] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleDropdown = () => setOpenDropdown(!openDropdown);

  const handleSignOut = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="bg-white py-3 shadow-2xl px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo section */}
          <div className="flex lg:gap-7 gap-2 items-center">
            <Link to={"/"}>
              <h1 className="font-bold text-2xl sm:text-3xl">
                <span className="text-red-500 font-serif">e</span>Shop
              </h1>
            </Link>

            {/* Location Dropdown */}
            <div className="hidden lg:flex gap-1 cursor-pointer text-gray-700 items-center">
              <FiMapPin className="text-red-500" />
              <span className="font-semibold text-sm">
                {location ? (
                  <div className="space-y-0">
                    <p className="leading-tight">{location.county}</p>
                    <p className="leading-tight">{location.state}</p>
                  </div>
                ) : (
                  "Add Address"
                )}
              </span>
              <FaCaretDown onClick={toggleDropdown} />
            </div>

            {openDropdown && (
              <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-4 lg:left-60 border-2 p-5 border-gray-100 rounded-md">
                <h1 className="font-semibold mb-4 text-xl flex justify-between">
                  Location{" "}
                  <span onClick={toggleDropdown} className="cursor-pointer">
                    <CgClose />
                  </span>
                </h1>
                <button
                  onClick={getLocation}
                  className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
                >
                  Location
                </button>
              </div>
            )}
          </div>

          {/* menu section */}
          <nav className="flex gap-3 sm:gap-5 lg:gap-7 items-center">
            <ul className="hidden lg:flex gap-7 items-center text-xl font-semibold">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                to={"/products"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Products</li>
              </NavLink>

              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>About</li>
              </NavLink>

              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "border-b-2 transition-all border-red-500"
                      : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Contact</li>
              </NavLink>
            </ul>

            {/* Cart Icon */}
            <Link to={"/cart"} className="relative">
              <IoCartOutline className="h-6 w-6 sm:h-7 sm:w-7" />
              <span className="bg-red-500 px-1.5 sm:px-2 text-xs sm:text-sm rounded-full absolute -top-2 sm:-top-3 -right-2 sm:-right-3 text-white">
                {cartItem.length}
              </span>
            </Link>

            {/* User Profile / Sign In */}
            <div className="hidden lg:flex gap-2 relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img
                      src={
                        user.photoURL ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                      alt={user.displayName || "User"}
                      className="h-9 w-9 rounded-full border-2 border-red-500 hover:border-red-600 transition-colors cursor-pointer object-cover"
                    />
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-800">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-600 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <HiMenuAlt3
              onClick={() => setOpenNav(!openNav)}
              className="h-6 w-6 sm:h-7 sm:w-7 lg:hidden cursor-pointer"
            />
          </nav>
        </div>

        {/* Responsive Menu */}
        <ResponsiveMenu
          openNav={openNav}
          setOpenNav={setOpenNav}
          location={location}
          getLocation={getLocation}
        />
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
