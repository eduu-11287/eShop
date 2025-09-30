import React, { useEffect, useMemo } from "react";
import { getData } from "../contex/DataContext";

const Category = () => {
  const { data, fetchAllProducts, categoryOnlyData } = getData();

  useEffect(() => {
    // only fetch if we don't already have products
    if (!data || data.length === 0) {
      fetchAllProducts();
    }
  }, [data, fetchAllProducts]);

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex gap-4 items-center justify-around py-7 px-4">
        {categoryOnlyData.map((item, index) => {
          return (
            <div>
              <button className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3">
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
