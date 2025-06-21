import { Api } from "./baseApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = async (correo, contrasena) => {
  try {
    const response = await Api.post("/auth/login", {
      correo,
      contrasena,
    });

    console.log("Login exitoso:", response.data);
    // toast.info("Inicio de sesión exitoso", {
    //   position: "top-right",
    //   autoClose: 3500,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   theme: "dark",
    //   style: { backgroundColor: "black", color: "#fff" }, // Fondo azul, texto blanco
    // });

    return response.data;
  } catch (error) {
    toast.error("Error " + error.response?.data?.error, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    console.error("Error en el login:", error.response?.data || error.message);
    throw error;
  }
};

export const register = async (
  nombres,
  apellidos,
  correo,
  direccion,
  contrasena
) => {
  try {
    const response = await Api.post("/auth/register", {
      nombres,
      apellidos,
      correo,
      direccion,
      contrasena,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
