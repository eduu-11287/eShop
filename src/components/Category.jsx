import React from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { categoryOnlyData } = getData();
  const navigate = useNavigate();

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto py-4 sm:py-5 md:py-7 px-4">
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center justify-center">
          {categoryOnlyData.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => navigate(`/category/${item}`)}
                className="uppercase text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 text-xs sm:text-sm md:text-base rounded transition-all bg-gradient-to-r from-red-500 to-purple-500 hover:scale-105 hover:from-red-600 hover:to-purple-600"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;