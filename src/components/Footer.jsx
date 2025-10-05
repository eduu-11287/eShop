import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return toast.error("Please enter your email");
    if (!emailRegex.test(email)) return toast.error("Please enter a valid email address");

    setLoading(true);

    try {
      // ✅ Match EmailJS template variable names EXACTLY as set in your template
      const templateParams = {
        from_name: "Newsletter Subscriber",
        reply_to: email,
        user_email: email,
        message: `New subscriber: ${email}`,
      };

      // ✅ Ensure .env variables are prefixed correctly and available
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("You're subscribed! 🎉 Check your inbox for confirmation.");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0b1120] text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-3 sm:mb-4">
            eShop
          </h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            Powering Your World with the Best Products.
          </p>
          <p className="text-sm sm:text-base">CBD, Nairobi City, Kenya</p>
          <p className="text-sm sm:text-base">Email: eShopsupport@gmail.com</p>
          <p className="text-sm sm:text-base">Phone: (+254) 717-677-853</p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {["Contact Us", "Shipping & Returns", "FAQs", "Order Tracking", "Size Guide"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-red-500 transition">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-3 sm:space-x-4">
            {[FaFacebookF, FaInstagram, FaTwitter, FaPinterestP].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition text-sm sm:text-base"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Stay in the Loop
          </h3>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">
            Subscribe to get special offers, free giveaways, and more.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-2 sm:gap-0"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="flex-1 px-3 py-2 text-sm sm:text-base rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 px-4 py-2 text-sm sm:text-base rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-red-700 transition text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 sm:py-6 text-center text-xs sm:text-sm px-4">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-red-500">eShop</span>. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
