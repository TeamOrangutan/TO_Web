import { Api } from "./baseApi";
import "react-toastify/dist/ReactToastify.css";

export const getStats = async () => {
  try {
    const response = await Api.get(`/stats/ventas-mensuales`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response);
    }

    throw error;
  }
};

export const generarReporte = async () => {
  try {
    const usuario_fk = localStorage.getItem("user")
    const response = await Api.post(`/stats/generarReporteQuincenal`, {
      usuario_fk: usuario_fk
    });
console.log(response.data);
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response);
    }

    throw error;
  }
}