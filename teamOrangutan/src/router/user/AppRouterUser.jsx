import { Route, Routes } from "react-router-dom";
import Products from "../../Pages/user/Products";
import ActualizarProduct from "../../Pages/user/ActualizarProduct";
import Historial from "../../Pages/user/Historial";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Home from "../../Pages/user/Home";
import LoginPage from "../../Auth/user/pages/LoginPage";
import Details from "../../Pages/user/Details";
import Carrito from "../../Components/user/Carrito/Carrito";
import Micuenta from "../../Components/user/Profile/Micuenta";
import Payments from "../../Pages/user/Payments";
import ResetPasswordPage from "../../Pages/user/ResetPasswordPage";

function AppRouterUser() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}></Route>

        <Route path="/products" element={<Products />}></Route>

        <Route path="/details/:id" element={<Details />}></Route>

        <Route path="/carrito/" element={<Carrito />}></Route>

        <Route
          path="/Perfil/"
          element={
            <PrivateRoute>
              <Micuenta />
            </PrivateRoute>
          }
        ></Route>

        {/* <Route path="/payments/" element={<Payments />}></Route> */}

        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route
          path="/actualizarProduct/:id"
          element={
            <PrivateRoute>
              <ActualizarProduct />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/acercaDe"
          element={
            <PrivateRoute>
              <Historial />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default AppRouterUser;
