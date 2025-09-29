import React, { useEffect, useContext } from "react";
import { DataContext } from "../contex/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = () => {
  const { data, fetchAllProducts } = useContext(DataContext);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Loading state
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
        <p className="text-2xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {data.slice(0, 7).map((item, index) => (
          <div key={index}>
            <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] h-[600px] flex items-center justify-center px-4">
              <div className="space-y-6 text-center max-w-2xl">
                <h3 className="text-red-500 font-semibold font-sans text-sm uppercase tracking-wide">
                  Powering Your World with the Best Products
                </h3>
                <h1 className="text-white text-4xl md:text-5xl font-bold uppercase line-clamp-3">
                  {item.title}
                </h1>
                <p className="text-gray-300 text-lg">
                  {item.description || "Discover amazing products"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;