import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrums from "../components/Breadcrums";
import { IoCartOutline } from "react-icons/io5";

const SingleProduct = () => {
  const params = useParams();
  const [SingleProduct, setSingleProduct] = useState(null);
  console.log(params);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`
      );
      const product = res.data;
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.id]);

  return (
    <>
      {SingleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={SingleProduct.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="w-full">
              <img
                src={SingleProduct.image}
                alt={SingleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            {/* Product Details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl font-bold text-gray-800">
                {SingleProduct.title}
              </h1>
              <div className="text-gray-700">
                {SingleProduct.category.toUpperCase()}
              </div>
              <p className="text-xl text-red-500 font-bold">
                Ksh{SingleProduct.price}{" "}
                <span className="bg-red-500 text-white p-2 rounded-full">
                  Best Selling
                </span>
              </p>
              <p className="text-gray-600">{SingleProduct.description}</p>
              {/* quantity selector */}
              <div className="flex items-center gap-4">
                <label htmlFor="" className="text-lg font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md">
                  <IoCartOutline className="w-6 h-6" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SingleProduct;
