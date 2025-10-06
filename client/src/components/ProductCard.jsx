import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItem } = useCart();

  console.log(cartItem);

  return (
    <div className="border border-gray-200 rounded-xl hover:shadow-xl transition-all p-3 flex flex-col h-full bg-white">
      {/* Image Container - Fixed Aspect Ratio */}
      <div 
        className="w-full aspect-square bg-gray-50 rounded-lg p-3 mb-3 cursor-pointer overflow-hidden"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain hover:scale-105 transition-transform"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h1 
          className="line-clamp-2 font-semibold text-sm sm:text-base mb-2 cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.title}
        </h1>
        
        <p className="text-red-500 font-bold text-base sm:text-lg mb-3">
          Ksh {product.price}
        </p>
        
        <button 
          onClick={() => addToCart(product)} 
          className="bg-red-500 hover:bg-red-600 px-3 py-2 text-sm rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-medium transition-colors mt-auto"
        >
          <IoCartOutline className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;