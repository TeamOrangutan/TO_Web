import { Api } from "./baseApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllOrdenes = async () => {
  try {
    const usuarioId = localStorage.getItem("user");
    const response = await Api.get(`/orders/all/${usuarioId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getResumeOrdenes = async () => {
  try {
    const response = await Api.get('/orders/all/')
    console.log(response.data);
    
    return response.data
  } catch (error) {
    throw error
  }
}