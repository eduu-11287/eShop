import React, { useEffect, useMemo } from "react";
import { getData } from "../contex/DataContext";

const Category = () => {
  const { data, fetchAllProducts } = getData();

  // returns an array of unique category strings
  const getUniqueCategory = (list = [], property = "category") => {
    if (!Array.isArray(list)) return [];
    const values = list.map((item) => item[property]).filter(Boolean);
    return Array.from(new Set(values));
  };

  // memoize so we don't recalc on every render
  const categoryOnlyData = useMemo(() => getUniqueCategory(data, "category"), [data]);

  useEffect(() => {
    // only fetch if we don't already have products
    if (!data || data.length === 0) {
      fetchAllProducts();
    }
  }, [data, fetchAllProducts]);

  console.log("Unique categories:", categoryOnlyData);

  return (
    <div className="bg-[#101829]">
        <div className="max-w-7xl mx-auto flex gap-4 items-center justify-around py-7 px-4">
            {
                categoryOnlyData.map((item, index)=>{
                    return <div>
                        <button className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer">{item}</button>
                    </div>
                })
            }
        </div>
    </div>
  );
};

export default Category;
