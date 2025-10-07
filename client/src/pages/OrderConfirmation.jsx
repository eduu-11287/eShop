import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaBoxOpen, FaTruck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import jsPDF from "jspdf"; // For invoice download
import "jspdf-autotable"; // For table in PDF

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const order = location.state?.orderData || JSON.parse(localStorage.getItem("lastOrder") || "null");

    if (!order) {
      navigate("/");
    } else {
      setOrderData(order);
      sendConfirmationEmail(order);
    }
  }, [location, navigate]);

  const sendConfirmationEmail = async (order) => {
    try {
      // This is a placeholder; connect your backend email API here
      await fetch("/api/send-confirmation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });
      console.log("Confirmation email sent!");
    } catch (err) {
      console.error("Failed to send email", err);
    }
  };

  const downloadInvoice = () => {
    if (!orderData) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Order Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderData.orderId}`, 14, 30);
    doc.text(`Order Date: ${formatDate(orderData.orderDate)}`, 14, 36);

    const tableData = orderData.items.map((item) => [
      item.title,
      item.quantity,
      `Ksh ${(item.price * item.quantity).toFixed(2)}`
    ]);

    doc.autoTable({
      startY: 45,
      head: [["Item", "Quantity", "Price"]],
      body: tableData,
    });

    doc.text(`Grand Total: Ksh ${orderData.grandTotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`Invoice_${orderData.orderId}.pdf`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!orderData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-4">
              <FaCheckCircle className="text-green-500 text-5xl sm:text-6xl" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <p className="text-sm text-gray-600 mt-1">
                Order ID: <span className="font-mono font-semibold">{orderData.orderId}</span>
              </p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
              {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
            </span>
          </div>

          {/* Items */}
          <div className="border-t pt-6">
            <h3 className="font-bold text-gray-900 mb-4">Items Ordered</h3>
            <div className="space-y-3">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex gap-3 sm:gap-4 pb-3 border-b last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    Ksh {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-6 space-y-2">
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-600">Items Total</span>
              <span className="font-medium">Ksh {orderData.itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-600">Delivery Charges</span>
              <span className="font-medium">
                {orderData.deliveryCharges === 0 ? (
                  <span className="text-red-500">FREE</span>
                ) : (
                  `Ksh ${orderData.deliveryCharges}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span className="text-gray-600">Handling Charges</span>
              <span className="font-medium">Ksh {orderData.handlingCharges}</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold pt-2 border-t">
              <span>Grand Total</span>
              <span className="text-red-500">Ksh {orderData.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={downloadInvoice}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              <HiDownload /> Download Invoice
            </button>
          </div>

          {/* Delivery Progress */}
          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-2">Delivery Status</h3>
            <div className="flex justify-between items-center text-gray-600">
              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-green-500" /> Ordered
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className="text-gray-400" /> Shipped
              </div>
              <div className="flex items-center gap-2">
                <MdEmail className="text-gray-400" /> Delivered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
