import React, { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error while typing
  };

  // Validation logic
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

  // Simulate API submission
  const fakeSubmit = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% success rate (to simulate real-world behavior)
        Math.random() > 0.1 ? resolve() : reject();
      }, 1500);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("⚠️ Please fix the highlighted errors", {
        style: { background: "#1f2937", color: "#fff", borderRadius: "12px" }
      });
      return;
    }

    setLoading(true);
    try {
      await fakeSubmit();

      console.log("Form submitted:", formData);

      toast.success("Message sent successfully 🚀", {
        style: { background: "#1f2937", color: "#fff", borderRadius: "12px" },
        icon: "📩"
      });

      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      toast.error("❌ Failed to send message. Try again.", {
        style: { background: "#1f2937", color: "#fff", borderRadius: "12px" }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
      {/* Toast provider */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
        {/* Title */}
        <h2 className="text-4xl font-bold text-white text-center mb-10">
          Get in Touch with <span className="text-red-400">eShop</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="text-white space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Contact Info</h3>
              <p className="text-gray-300">
                Have a question or need support? We're here to help.
              </p>
            </div>

            <div className="space-y-3 text-gray-200">
              <p className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>
                  <strong>Address:</strong> 00618, Nairobi, Kenya
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>
                  <strong>Email:</strong> customersupport@eShop.com
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-400" />
                <span>
                  <strong>Phone:</strong> +254 717 677 853
                </span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-white mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white/20 border ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-blue-500"
                } text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2`}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="youremail@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white/20 border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-blue-500"
                } text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-white mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-white/20 border ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/30 focus:ring-blue-500"
                } text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 resize-none`}
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-2 rounded-xl transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
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
