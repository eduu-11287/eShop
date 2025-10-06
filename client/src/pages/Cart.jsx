import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LucideNotebookText } from "lucide-react";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import emptyCart from "../assets/emptyCart.jpg";
import { useNavigate } from "react-router-dom";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    address: location?.country || "",
    state: location?.state || "",
    postcode: location?.postcode || "",
    country: location?.country || "",
    phone: "",
    promoCode: ""
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalPrice = cartItem.reduce(
    (total, items) => total + items.price * items.quantity,
    0
  );

  if (!cartItem) {
    return <div className="mt-10 max-w-6xl mx-auto mb-5 px-4">Loading...</div>;
  }

  return (
    <div className="mt-6 sm:mt-10 max-w-6xl mx-auto mb-5 px-4 sm:px-6 lg:px-8">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">My Cart ({cartItem.length})</h1>
          <div className="mt-6 sm:mt-10 space-y-3">
            {cartItem.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-gray-100 p-3 sm:p-5 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full"
                >
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h1 className="line-clamp-2 text-sm sm:text-base">{item.title}</h1>
                      <p className="text-red-500 font-semibold text-base sm:text-lg">
                        Ksh{item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="bg-red-500 text-white flex gap-3 sm:gap-4 p-2 rounded-md font-bold text-lg sm:text-xl">
                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "decrease")
                        }
                        className="cursor-pointer w-6 sm:w-auto"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(cartItem, item.id, "increase")
                        }
                        className="cursor-pointer w-6 sm:w-auto"
                      >
                        +
                      </button>
                    </div>
                    <span
                      onClick={() => deleteItem(item.id)}
                      className="hover:bg-white/60 transition-all rounded-full p-2 sm:p-3 hover:shadow-2xl"
                    >
                      <FaRegTrashAlt className="text-red-500 text-xl sm:text-2xl cursor-pointer" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20 mt-6">
            {/* Delivery Info Form */}
            <div className="bg-gray-100 rounded-md p-5 sm:p-7 space-y-3 sm:space-y-4">
              <h1 className="text-gray-800 font-bold text-lg sm:text-xl">Delivery Info</h1>
              <div className="flex flex-col space-y-1">
                <label htmlFor="fullName" className="text-sm sm:text-base">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="p-2 rounded-md text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="address" className="text-sm sm:text-base">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="p-2 rounded-md text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="state" className="text-sm sm:text-base">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Enter your state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="p-2 rounded-md w-full text-sm sm:text-base"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="postcode" className="text-sm sm:text-base">PostCode</label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    placeholder="Enter your postcode"
                    required
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="p-2 rounded-md w-full text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="country" className="text-sm sm:text-base">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Enter your country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="p-2 rounded-md w-full text-sm sm:text-base"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="phone" className="text-sm sm:text-base">Phone No.</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="p-2 rounded-md w-full text-sm sm:text-base"
                  />
                </div>
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-3 cursor-pointer hover:bg-red-600 transition-colors w-full sm:w-auto text-sm sm:text-base">
                Submit
              </button>
              <div className="flex items-center justify-center w-full text-gray-700 text-sm sm:text-base">
                ----------OR----------
              </div>
              <div className="flex justify-center">
                <button
                  onClick={getLocation}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base"
                >
                  Detect Location
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-5 sm:p-7 space-y-3 sm:space-y-4 h-max">
              <h1 className="text-gray-500 font-bold text-lg sm:text-xl">Bill details</h1>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <LucideNotebookText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                  Items total
                </h1>
                <p>Ksh {totalPrice}</p>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <MdDeliveryDining className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                  Delivery Charges
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">Ksh200</span>{" "}
                  FREE
                </p>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <GiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                  Handling Charges
                </h1>
                <p className="text-red-500 font-semibold">Ksh50</p>
              </div>
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center text-sm sm:text-base">
                <h1 className="font-semibold text-base sm:text-lg">Grand total</h1>
                <p className="font-semibold text-base sm:text-lg">Ksh {totalPrice + 50}</p>
              </div>
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-5 sm:mt-7 text-sm sm:text-base">
                  Apply Promo Code
                </h1>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                  <input
                    type="text"
                    name="promoCode"
                    placeholder="Enter code"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    className="p-2 rounded-md w-full text-sm sm:text-base"
                  />
                  <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-2 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base whitespace-nowrap">
                    Apply
                  </button>
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-2 sm:py-3 rounded-md w-full cursor-pointer mt-3 hover:bg-red-600 transition-colors text-sm sm:text-base font-semibold">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:gap-5 justify-center items-center min-h-[500px] sm:h-[600px] px-4">
          <h1 className="text-red-500/80 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
            Oh no! Your cart is empty!
          </h1>
          <img src={emptyCart} alt="Empty cart" className="w-[250px] sm:w-[350px] md:w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-md cursor-pointer hover:bg-red-600 transition-colors text-sm sm:text-base"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;