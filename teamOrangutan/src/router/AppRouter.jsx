import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import ActualizarProduct from "../Pages/ActualizarProduct";
import Historial from "../Pages/Historial";
import LoginPage from "../Pages/LoginPage";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/actualizarProduct" element={<ActualizarProduct />}></Route>
        <Route path="/historial" element={<Historial />}></Route>

        <Route path="/auth/login" element={<LoginPage />}></Route>

      </Routes>
    </>
  );
}

export default AppRouter;
