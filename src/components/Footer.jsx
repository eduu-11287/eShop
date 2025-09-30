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
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-4">eShop</h2>
          <p className="mb-4">
            Powering Your World with the Best Products.
          </p>
          <p>CBD, Nairobi City, kenya</p>
          <p>Email: customersupport@eShop.com</p>
          <p>Phone: (+254) 717-677-853</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2">
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
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition"
            >
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay in the Loop
          </h3>
          <p className="mb-4">
            Subscribe to get special offers, free giveaways, and more.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-2 rounded-l-lg bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 px-4 py-2 rounded-r-lg hover:bg-red-700 transition text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
        <p>&copy: {new Date().getFullYear()} <span className="text-red-500">eShop</span>. All
        rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
