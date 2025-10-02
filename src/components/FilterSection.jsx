import React from "react";
import { getData } from "../contex/DataContext";

const FilterSection = ({
  search,
  setSearch,
  category,
  setCategory,
  priceRange,
  setPriceRange,
  handleCategoryChange,
}) => {
  const { categoryOnlyData } = getData();
  return (
    <div className="bg-gray-100 mt:-10 p-4 rounded-md h-max">
      <input
        type="text"
        placeholder="Search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2"
      />

      {/* category only data */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                name={item}
                checked={category === item}
                value={item}
                onChange={handleCategoryChange}
              />
              <button className="cursor-pointer uppercase">{item}</button>
            </div>
          );
        })}
      </div>
      {/* price range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="">
          Price Range: Ksh{priceRange[0]} - Ksh{priceRange[1]}
        </label>
        <input
          type="range"
          name=""
          id=""
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>
      <button className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
        onClick={()=>{setSearch(''); setCategory("All"); setPriceRange([0,10000])}}
      >
        Rest Filters
      </button>
    </div>
  );
};

export default FilterSection;
