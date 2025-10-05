import React from "react";
import banner from "../assets/banner1.jpg";

const MidBanner = () => {
  return (
    <div className="bg-gray-100 py-8 sm:py-12 md:py-16 lg:py-24">
      <div
        className="relative max-w-7xl mx-4 sm:mx-6 md:mx-auto rounded-lg md:rounded-2xl bg-cover bg-center h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px]"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 rounded-lg md:rounded-2xl bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 md:px-8 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              Best Products at Your Fingertips
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 leading-relaxed px-2 sm:px-0">
              Discover the latest products with unbeatable prices and free
              shipping on all orders.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 sm:py-2.5 sm:px-5 md:py-3 md:px-6 lg:py-3 lg:px-8 text-sm sm:text-base rounded-lg transition duration-300 hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;