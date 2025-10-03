import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = () => {
  const { cartItem } = useCart();

  if (!cartItem) {
    return <div className="mt-10 max-w-6xl mx-auto mb-5">Loading...</div>;
  }

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5">
      {cartItem.length > 0 ? (
        <div>
          <h1>My Cart ({cartItem.length})</h1>
          <div className="mt-10">
            {cartItem.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-md"
                    />
                    <div>
                      <h1 className="w-[300px] line-clamp-2">{item.title}</h1>
                      <p className="text-red-500 font-semibold text-lg">
                        Ksh{item.price}
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                    <button className="cursor-pointer">-</button>
                    <span>1</span>
                    <button className="cursor-pointer">+</button>
                  </div>
                  <span className="hover:bg-white/60 transition-all rounded-full p-3 hoover:shadow-2xl">
                    <FaRegTrashAlt className=" text-red-500 text-2xl cursor-pointer" />
                  </span>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
              <h1 className="text-grey-800 font-bold text-xl">Delivery Info</h1>
              <div className="flex flex-col space-y-1">
                <label htmlFor=""> Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor=""> Addres</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  required
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor=""> State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    required
                    className="p-2 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor=""> PostCode</label>
                  <input
                    type="text"
                    placeholder="Enter your postcode"
                    required
                    className="p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor=""> Country</label>
                  <input
                    type="text"
                    placeholder="Enter your country"
                    required
                    className="p-2 rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor=""> Phone No.</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    required
                    className="p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                Submit
              </button>
              <div className="flex items-center justify-center w-full text-gray-700">
                ----------OR----------
              </div>
              <div className="flex justify-center">
                <button className="bg-red-500 text-white px-2 rounded-md">
                  Delete Location
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
