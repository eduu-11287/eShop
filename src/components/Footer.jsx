import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-3 sm:mb-4">
            eShop
          </h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            Powering Your World with the Best Products.
          </p>
          <p className="text-sm sm:text-base">CBD, Nairobi City, Kenya</p>
          <p className="text-sm sm:text-base">Email: eShopsupport@gmail.com</p>
          <p className="text-sm sm:text-base">Phone: (+254) 717-677-853</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Order Tracking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition">
                Size Guide
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-3 sm:space-x-4">
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition text-sm sm:text-base"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition text-sm sm:text-base"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition text-sm sm:text-base"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition text-sm sm:text-base"
              aria-label="Pinterest"
            >
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Stay in the Loop
          </h3>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            Subscribe to get special offers, free giveaways, and more.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-2 text-sm sm:text-base rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 px-4 py-2 text-sm sm:text-base rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-red-700 transition text-white font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 sm:py-6 text-center text-xs sm:text-sm px-4">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-red-500">eShop</span>. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;