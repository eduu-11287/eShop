import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductListView = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4">
        {/* Image Container - Fixed Height */}
        <div 
          className="w-full sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex-shrink-0 bg-white rounded-lg p-2 cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <h1 
            className="font-bold text-sm sm:text-base md:text-lg line-clamp-2 hover:text-red-500 cursor-pointer transition-colors"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {product.title}
          </h1>
          
          <p className="text-red-500 font-bold text-lg sm:text-xl md:text-2xl">
            Ksh{product.price}
          </p>
          
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Free delivery <span className="font-semibold">every Fri,</span>{" "}
            for orders <span className="font-semibold">above Ksh500</span>
          </p>
          
          <button 
            onClick={() => addToCart(product)} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full sm:w-auto sm:max-w-[150px] text-sm font-medium mt-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;