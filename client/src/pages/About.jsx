// src/pages/About.jsx
import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { getData } from "../context/DataContext";

const About = () => {
  // Access fetch function from context to prefetch products
  const { fetchAllProducts } = getData();

  // Prefetch products when user hovers/focuses button
  const prefetchProducts = useCallback(() => {
    if (fetchAllProducts) fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
          {/* Header */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8">
            About <span className="text-red-600">e</span>Shop
          </h1>

          {/* Introduction */}
          <div className="mb-8 sm:mb-10">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Welcome to{" "}
              <span className="text-red-600 font-semibold">eShop</span>, your
              one-stop destination for the latest and greatest products. From
              cutting-edge gadgets to must-have accessories, we're here to power
              up your life with premium products and unbeatable service.
            </p>
          </div>

          {/* Our Mission */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-3 sm:mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              At eShop, our mission is to make products accessible to everyone.
              We're passionate about connecting people with the tools and things
              they need to thrive in a digital world — all at competitive prices
              and delivered with speed and care.
            </p>
          </div>

          {/* Why Choose eShop */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-4 sm:mb-6">
              Why Choose eShop?
            </h2>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <span className="text-red-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">
                  •
                </span>
                <span className="text-gray-700 text-base sm:text-lg">
                  Top-quality products from trusted brands
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">
                  •
                </span>
                <span className="text-gray-700 text-base sm:text-lg">
                  Lightning-fast and secure shipping
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">
                  •
                </span>
                <span className="text-gray-700 text-base sm:text-lg">
                  Reliable customer support, always ready to help
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">
                  •
                </span>
                <span className="text-gray-700 text-base sm:text-lg">
                  Easy returns and hassle-free shopping experience
                </span>
              </li>
            </ul>
          </div>

          {/* Our Vision */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-3 sm:mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              We envision a future where technology elevates everyday life. At
              eShop, we're committed to staying ahead of the curve, offering
              cutting-edge solutions that are both practical and affordable at
              your comfort zone.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-3 sm:mb-4">
              Join eShop Family
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-5 sm:mb-6">
              Whether you're a tech enthusiast, a professional, or just looking
              for something cool and functional   eShop has something for
              everyone.
            </p>

            {/* Start Shopping button with link + prefetch */}
            <Link
              to="/products"
              onMouseEnter={prefetchProducts}
              onFocus={prefetchProducts}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg text-base sm:text-lg"
              aria-label="Start shopping - go to products"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;