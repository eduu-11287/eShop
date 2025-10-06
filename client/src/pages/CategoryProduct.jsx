import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ProductListView from "../components/ProductListView";

const CategoryProduct = () => {
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams(); 
  const navigate = useNavigate();

  const getFilteredProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const products = res.data; 
      setSearchData(products); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilteredProducts();
  }, [category]); 

  return (
    <div className="min-h-screen bg-gray-50">
      {!loading && searchData.length > 0 ? ( 
        <div className="w-full max-w-6xl mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-md cursor-pointer flex gap-1 sm:gap-2 items-center hover:bg-gray-700 transition-colors text-sm sm:text-base font-medium"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back
            </button>
          </div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 capitalize">
            {category.replace(/%20/g, ' ')}
          </h1>
          
          <div className="w-full space-y-3 sm:space-y-4">
            {searchData.map((product) => {
              return <ProductListView key={product.id} product={product} />;
            })}
          </div>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <div className="animate-spin h-10 w-10 sm:h-12 sm:w-12 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h1 className="text-base sm:text-lg text-gray-600">Loading products...</h1>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4">No products found</h1>
            <button 
              onClick={() => navigate(-1)} 
              className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProduct;