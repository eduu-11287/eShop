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
        {data.slice(0, 7).map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
            >
              <div className="flex gap-10 justify-center h-[600px] items-center px-4">
                <div className="space-y-6">
                  <h3 className="text-red-500 font-semibold font-sans text-sm uppercase tracking-wide">
                    Powering Your World with the Best Products
                  </h3>
                  <h1 className="text-white text-4xl md:w-[500px] line-clamp font-bold uppercase line-clamp-3">
                    {item.title}
                  </h1>
                  <p className="md:w-[500px] line-clamp-3 text-gray-400">
                    {item.description}
                  </p>
                  <button className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2">Shop Now</button>
                </div>
                <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-br from-purple-500/20 to-red-500/20 p-8 flex items-center justify-center shadow-2xl shadow-red-400/50 hover:scale-105 transition-all duration-300">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
