import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("error", "⚠️ Please fix the highlighted errors");
      return;
    }

    setLoading(true);

    try {
      // Use relative path for both dev and production
      const response = await fetch("/api/sendEmail.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse response:", parseError);
        throw new Error("Server returned invalid response");
      }

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to send message");
      }

      showToast("success", "📩 Message sent successfully 🚀");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Email send error:", error);
      console.error("Error details:", error.message);
      showToast("error", `❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {toast.show && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl transition-all duration-300 ${
          toast.type === "success" ? "bg-[#1f2937]" : "bg-[#1f2937]"
        } text-white font-medium border border-white/20`}>
          {toast.message}
        </div>
      )}

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-5xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-6 sm:mb-8 md:mb-10">
          Get in Touch with <span className="text-red-400">eShop</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="text-white space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Contact Info</h3>
              <p className="text-sm sm:text-base text-gray-300">
                Have a question or need support? We're here to help.
              </p>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-gray-200">
              <p className="flex items-start sm:items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span><strong>Address:</strong> 00618, Nairobi, Kenya</span>
              </p>
              <p className="flex items-start sm:items-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span className="break-all"><strong>Email:</strong> eShopsupport@gmail.com</span>
              </p>
              <p className="flex items-start sm:items-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                <span><strong>Phone:</strong> +254 717 677 853</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-1 text-sm sm:text-base">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-white/20 border ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-blue-500"
                } text-white rounded-lg sm:rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-1 text-sm sm:text-base">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-white/20 border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-blue-500"
                } text-white rounded-lg sm:rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-white mb-1 text-sm sm:text-base">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-white/20 border ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-blue-500"
                } text-white rounded-lg sm:rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 resize-none`}
              />
              {errors.message && (
                <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Sending...
                </span>
              ) : (
                "Send Message 🚀"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;