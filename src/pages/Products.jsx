import React, { useEffect, useState } from "react";
import { getData } from "../contex/DataContext";
import FilterSection from "../components/FilterSection";
import Loading from "../assets/loading.webm";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [page, SetPPage] = useState(1);

  useEffect(() => {
    fetchAllProducts();
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
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8">
              <FilterSection
                search={search}
                setSearch={setSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
              />
              {filteredData?.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-4 gap-7 mt-10">
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
                <div></div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
