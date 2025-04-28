import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRouterUser from "./router/user/AppRouterUser.jsx";
import AuthProvider from "./Auth/user/context/AuthProvider.jsx";
import { CartProvider } from "./Auth/user/context/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <AppRouterUser />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
