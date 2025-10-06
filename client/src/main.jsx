import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./context/DataContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <DataProvider>
    <CartProvider>
        <App />
        <ScrollToTop smooth style={{backgroundColor:'#fa2d37', display:'flex', alignItems:'center',  justifyContent: 'center'}}/>   
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </CartProvider>
  </DataProvider>
  // </StrictMode>
);
