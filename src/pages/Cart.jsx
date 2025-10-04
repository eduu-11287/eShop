import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LucideNotebookText } from "lucide-react";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();

  const totalPrice = cartItem.reduce((total, items) => total + (items.price * items.quantity), 0);

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
                    <button onClick={()=>updateQuantity( cartItem, item.id, "decrease")} className="cursor-pointer">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={()=>updateQuantity( cartItem, item.id, "increase")} className="cursor-pointer">+</button>
                  </div>
                  <span onClick={()=>deleteItem(item.id)} className="hover:bg-white/60 transition-all rounded-full p-3 hoover:shadow-2xl">
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
                  value={location?.country}
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
                    value={location?.state}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor=""> PostCode</label>
                  <input
                    type="text"
                    placeholder="Enter your postcode"
                    required
                    className="p-2 rounded-md w-full"
                    value={location?.postcode}
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
                    value={location?.country}
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
                <button onClick={getLocation} className="bg-red-500 text-white px-2 rounded-md">
                  Delete Location
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
              <h1 className="text-gray-500 font-bold text-xl">Bill details</h1>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <LucideNotebookText />
                  </span>
                  Items total
                </h1>
                <p>Ksh {totalPrice}</p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <MdDeliveryDining />
                  </span>
                  Delivery Charges
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">Ksh200</span>{" "}
                  FREE
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <GiShoppingBag />
                  </span>
                  Handling Charges
                </h1>
                <p className="text-red-500 font-semibold">Ksh50</p>
              </div>
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand total</h1>
                <p className="font-semibold text-lg">Ksh {totalPrice + 50}</p>
              </div>
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                  Apply Promo Code{" "}
                </h1>
                <div className="flex gap-5">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="p-2 rounded-md w-full"
                  />
                  <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                    Apply
                  </button>
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                Proceed to Checkout
              </button>
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
