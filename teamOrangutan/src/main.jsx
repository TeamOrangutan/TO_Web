import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRouterUser from "./router/user/AppRouterUser.jsx";
import AuthProvider from "./Auth/user/context/AuthProvider.jsx";
import { CartProvider } from "./Auth/user/context/CartProvider.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
           <GoogleOAuthProvider clientId={clientId}>
          <ToastContainer />
          <AppRouterUser />
          </GoogleOAuthProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
