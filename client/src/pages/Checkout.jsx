import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { LucideNotebookText } from "lucide-react";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { FaCreditCard, FaMobileAlt } from "react-icons/fa";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItem, setCartItem } = useCart();
  const { user } = useAuth();

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to proceed to checkout");
      navigate("/login");
    }
    if (cartItem.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }
  }, [user, cartItem, navigate]);

  // Form state
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    country: "Kenya",
  });

  const [paymentMethod, setPaymentMethod] = useState("mpesa"); // 'mpesa' or 'card'
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const itemsTotal = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handlingCharges = 50;
  const deliveryCharges = itemsTotal >= 1000 ? 0 : 200;
  const grandTotal = itemsTotal + handlingCharges + deliveryCharges;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validateForm = () => {
    const { fullName, email, phone, address, city, state, postcode } =
      deliveryInfo;

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !postcode
    ) {
      toast.error("Please fill in all delivery information");
      return false;
    }

    if (paymentMethod === "mpesa" && !mpesaPhone) {
      toast.error("Please enter your M-Pesa phone number");
      return false;
    }

    // Validate phone number format (Kenyan)
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid Kenyan phone number");
      return false;
    }

    if (paymentMethod === "mpesa" && !phoneRegex.test(mpesaPhone)) {
      toast.error("Please enter a valid M-Pesa phone number");
      return false;
    }

    return true;
  };

  // Handle M-Pesa Payment (Structure for future integration)
  const processMpesaPayment = async () => {
    // TODO: Integrate with Daraja API
    // This is the structure - you'll add actual API calls later

    try {
      toast.info("Initiating M-Pesa payment...");

      // Future M-Pesa integration will go here:
      // 1. Call your backend API
      // 2. Backend calls Daraja API STK Push
      // 3. Wait for user to enter M-Pesa PIN on phone
      // 4. Receive callback confirmation

      // Simulate payment process for now
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success response
      return {
        success: true,
        transactionId: `MPX${Date.now()}`,
        message: "Payment successful",
      };
    } catch (error) {
      console.error("M-Pesa payment error:", error);
      throw new Error("Payment failed. Please try again.");
    }
  };

  // Handle Card Payment (Structure for future integration)
  const processCardPayment = async () => {
    // TODO: Integrate with Stripe/PayPal/Flutterwave

    try {
      toast.info("Processing card payment...");

      // Future card payment integration will go here
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock success response
      return {
        success: true,
        transactionId: `CARD${Date.now()}`,
        message: "Payment successful",
      };
    } catch (error) {
      console.error("Card payment error:", error);
      throw new Error("Payment failed. Please try again.");
    }
  };

  // Handle order submission
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Process payment based on selected method
      const paymentResult =
        paymentMethod === "mpesa"
          ? await processMpesaPayment()
          : await processCardPayment();

      if (paymentResult.success) {
        // Prepare order data
        const orderData = {
          orderId: `ORD${Date.now()}`,
          userId: user.uid,
          userEmail: user.email,
          items: cartItem,
          deliveryInfo,
          paymentMethod,
          paymentDetails: {
            transactionId: paymentResult.transactionId,
            amount: grandTotal,
            currency: "KSH",
          },
          itemsTotal,
          handlingCharges,
          deliveryCharges,
          grandTotal,
          orderDate: new Date().toISOString(),
          status: "pending",
        };

        // TODO: Save order to Firebase/Database
        // await saveOrderToDatabase(orderData);

        // TODO: Send confirmation email
        // await sendConfirmationEmail(orderData);

        // Store order in localStorage temporarily
        localStorage.setItem("lastOrder", JSON.stringify(orderData));

        // Clear cart
        setCartItem([]);
        localStorage.removeItem("cartItems");

        toast.success("Order placed successfully! 🎉");

        // Navigate to order confirmation
        navigate("/order-confirmation", { state: { orderData } });
      }
    } catch (error) {
      console.error("Order processing error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItem.length === 0 || !user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="mt-6 sm:mt-10 max-w-6xl mx-auto mb-10 px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold text-2xl sm:text-3xl mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Left Column - Forms */}
        <div className="space-y-6">
          {/* Delivery Information */}
          <div className="bg-gray-100 rounded-md p-5 sm:p-7">
            <h2 className="text-gray-800 font-bold text-lg sm:text-xl mb-4">
              Delivery Information
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={deliveryInfo.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={deliveryInfo.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+254712345678 or 0712345678"
                  required
                  className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label htmlFor="address" className="text-sm font-medium">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                  placeholder="Street address, apartment, suite, etc."
                  required
                  className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="city" className="text-sm font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryInfo.city}
                    onChange={handleInputChange}
                    placeholder="Nairobi"
                    required
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="state" className="text-sm font-medium">
                    State/County *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={deliveryInfo.state}
                    onChange={handleInputChange}
                    placeholder="Nairobi County"
                    required
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="postcode" className="text-sm font-medium">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={deliveryInfo.postcode}
                    onChange={handleInputChange}
                    placeholder="00100"
                    required
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label htmlFor="country" className="text-sm font-medium">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={deliveryInfo.country}
                    onChange={handleInputChange}
                    placeholder="Kenya"
                    required
                    className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-100 rounded-md p-5 sm:p-7">
            <h2 className="text-gray-800 font-bold text-lg sm:text-xl mb-4">
              Payment Method
            </h2>

            <div className="space-y-3">
              {/* M-Pesa Option */}
              <div
                onClick={() => setPaymentMethod("mpesa")}
                className={`p-4 rounded-md border-2 cursor-pointer transition-all ${
                  paymentMethod === "mpesa"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white hover:border-red-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaMobileAlt className="text-2xl text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">M-Pesa</h3>
                    <p className="text-sm text-gray-600">
                      Pay with M-Pesa (Lipa na M-Pesa)
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      paymentMethod === "mpesa"
                        ? "border-red-500 bg-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "mpesa" && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                {paymentMethod === "mpesa" && (
                  <div className="mt-3">
                    <label
                      htmlFor="mpesaPhone"
                      className="text-sm font-medium block mb-1"
                    >
                      M-Pesa Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="mpesaPhone"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="+254712345678 or 0712345678"
                      required
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      You'll receive an STK push on this number
                    </p>
                  </div>
                )}
              </div>

              {/* Card Option */}
              <div
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-md border-2 cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white hover:border-red-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaCreditCard className="text-2xl text-blue-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      Credit/Debit Card
                    </h3>
                    <p className="text-sm text-gray-600">
                      Pay with Visa, Mastercard
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${
                      paymentMethod === "card"
                        ? "border-red-500 bg-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <p className="text-xs text-gray-600 mt-2 italic">
                    Card payment integration coming soon
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="bg-white border border-gray-100 shadow-xl rounded-md p-5 sm:p-7">
            <h2 className="text-gray-800 font-bold text-lg sm:text-xl mb-4">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cartItem.map((item) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Ksh {item.price} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-sm">
                    Ksh {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <h3 className="flex gap-1 items-center text-gray-700">
                  <LucideNotebookText className="w-4 h-4" />
                  Items total
                </h3>
                <p>Ksh {itemsTotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <h3 className="flex gap-1 items-center text-gray-700">
                  <MdDeliveryDining className="w-5 h-5" />
                  Delivery Charges
                </h3>
                {deliveryCharges === 0 ? (
                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">Ksh200</span>{" "}
                    FREE
                  </p>
                ) : (
                  <p>Ksh {deliveryCharges}</p>
                )}
              </div>

              {itemsTotal < 1000 && (
                <p className="text-xs text-gray-600 italic">
                  Add Ksh {(1000 - itemsTotal).toFixed(2)} more for free
                  delivery
                </p>
              )}

              <div className="flex justify-between items-center text-sm sm:text-base">
                <h3 className="flex gap-1 items-center text-gray-700">
                  <GiShoppingBag className="w-4 h-4" />
                  Handling Charges
                </h3>
                <p>Ksh {handlingCharges}</p>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                <h3>Grand Total</h3>
                <p className="text-red-500">Ksh {grandTotal.toFixed(2)}</p>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className={`w-full mt-6 py-3 rounded-md font-semibold text-white transition-all ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Place Order - Ksh ${grandTotal.toFixed(2)}`
              )}
            </button>
            {/* Cancel Order Button */}
            <button
              onClick={() => navigate("/cart")}
              disabled={isProcessing}
              className={`w-full mt-3 py-3 rounded-md font-semibold border transition-all ${
                isProcessing
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-red-500 border-red-500 hover:bg-red-50"
              }`}
            >
              Cancel Order
            </button>

            <p className="text-xs text-center text-gray-600 mt-3">
              By placing your order, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
