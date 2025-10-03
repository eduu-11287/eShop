import React from "react";
import { getData } from "../contex/DataContext";

import { useLocation, useNavigate } from 'react-router-dom';

const Category = () => {
  const { categoryOnlyData } = getData();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current category from URL
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.toUpperCase()}`);
  };

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex gap-4 items-center justify-around py-7 px-4">
        {categoryOnlyData.map((item, index) => {
          const isActive = currentCategory === item.toUpperCase();
          
          return (
            <div key={index}>
              <button 
                onClick={() => handleCategoryClick(item)}
                className={`uppercase text-white px-3 py-2 rounded transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-red-600 to-purple-600 scale-110' 
                    : 'bg-gradient-to-r from-red-500 to-purple-500 hover:scale-105'
                }`}
              >
                {item}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
