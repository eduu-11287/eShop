import React, { useEffect } from "react";
import { getData } from "../contex/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Category from "./Category";
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Carousel = () => {
  const { data, fetchAllProducts } = getData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data || data.length === 0) {
      fetchAllProducts();
    }
  }, [data, fetchAllProducts]);

  // Loading state
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
        <p className="text-2xl text-gray-600">Loading products...</p>
      </div>
    );
  }

const HandleShopNow = () => {
  navigate('/products'); 
}

  // Custom arrows
  const SamplePrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Previous slide"
      className="absolute left-12 top-1/2 -translate-y-1/2 p-2 rounded-full z-30 bg-[#f53347] hover:bg-[#555] text-white"
    >
      <AiOutlineArrowLeft className="w-5 h-5" />
    </button>
  );

  const SampleNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Next slide"
      className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-full z-30 bg-[#f53347] hover:bg-[#555] text-white"
    >
      <AiOutlineArrowRight className="w-5 h-5" />
    </button>
  );

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="w-full overflow-hidden relative">
      <Slider {...settings}>
        {data.slice(0, 7).map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div className="flex gap-10 justify-center h-[600px] items-center px-4">
              {/* Text Section */}
              <div className="space-y-6">
                <h3 className="text-red-500 font-semibold text-sm uppercase tracking-wide">
                  Powering Your World with the Best Products
                </h3>
                <h1 className="text-white text-4xl md:w-[500px] font-bold uppercase line-clamp-3">
                  {item.title}
                </h1>
                <p className="md:w-[500px] line-clamp-3 text-gray-400">
                  {item.description}
                </p>
                <button 
                  onClick={HandleShopNow}
                  className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md mt-2 hover:scale-105 transition-transform duration-200">
                    Shop Now
                </button>
              </div>

              {/* Image Section */}
              <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-br from-purple-500/20 to-red-500/20 p-8 flex items-center justify-center shadow-2xl shadow-red-400/50 hover:scale-105 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Category />
    </div>
  );
};

export default Carousel;
