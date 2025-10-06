import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/loading.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [page, SetPPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const pageHandler = (selectedPage) => {
    SetPPage(selectedPage);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );
  const dynamicPage = Math.ceil(filteredData?.length / 4);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {data?.length > 0 ? (
          <>
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full bg-red-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-red-600 transition-colors font-semibold"
              >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              {/* Filter Section - Responsive */}
              <div
                className={`${
                  showFilters ? "block" : "hidden"
                } lg:block w-full lg:w-64 lg:flex-shrink-0`}
              >
                <FilterSection
                  search={search}
                  setSearch={setSearch}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  category={category}
                  setCategory={setCategory}
                  handleCategoryChange={handleCategoryChange}
                />
              </div>

              {/* Products Grid Section */}
              {filteredData?.length > 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                  {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop, 4 on large screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 mt-4 lg:mt-10 w-full">
                    {filteredData
                      ?.slice(page * 4 - 4, page * 4)
                      .map((product, index) => {
                        return <ProductCard key={index} product={product} />;
                      })}
                  </div>
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex-1 flex justify-center items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] mt-4 lg:mt-10">
                  <Lottie 
                    animationData={notfound} 
                    className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]" 
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <video muted autoPlay loop className="w-full max-w-[200px] sm:max-w-[300px]">
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;