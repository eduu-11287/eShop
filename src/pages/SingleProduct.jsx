import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );
      const product = res.data;
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (singleProduct) {
      addToCart({ ...singleProduct, quantity });
    }
  };

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-6 sm:px-6 lg:px-8">
          <Breadcrums title={singleProduct.title} />
          <div className="max-w-6xl mx-auto sm:p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-4 sm:mt-6">
            {/* Product Image */}
            <div className="w-full">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="rounded-xl sm:rounded-2xl w-full object-cover max-h-[400px] sm:max-h-[500px] md:max-h-full mx-auto"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                {singleProduct.title}
              </h1>
              
              <div className="text-sm sm:text-base text-gray-700 font-medium">
                {singleProduct.category.toUpperCase()}
              </div>
              
              <p className="text-lg sm:text-xl text-red-500 font-bold flex flex-wrap items-center gap-2">
                Ksh{singleProduct.price}
                <span className="bg-red-500 text-white px-3 py-1 text-xs sm:text-sm rounded-full">
                  Best Selling
                </span>
              </p>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {singleProduct.description}
              </p>
              
              {/* Quantity selector */}
              <div className="flex items-center gap-3 sm:gap-4">
                <label 
                  htmlFor="quantity" 
                  className="text-base sm:text-lg font-medium text-gray-700"
                >
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 sm:w-20 border border-gray-300 rounded-lg px-2 sm:px-3 py-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div className="flex gap-3 sm:gap-4 mt-2 sm:mt-4">
                <button 
                  onClick={handleAddToCart}
                  className="px-4 sm:px-6 flex items-center justify-center gap-2 py-2 sm:py-3 text-base sm:text-lg bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors w-full sm:w-auto font-semibold"
                >
                  <IoCartOutline className="w-5 h-5 sm:w-6 sm:h-6" /> 
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[400px] text-lg sm:text-xl text-gray-600">
          Loading...
        </div>
      )}
    </>
  );
};

export default SingleProduct;