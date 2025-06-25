import { Api } from "./baseApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getProfile = async () => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const response = await Api.get(`/user/profile/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error en getProfile:", error.response);
    }

    throw error;
  }
};
export const updateUserData = async (formDataObject) => {
  try {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Adjuntar campos de texto
    formData.append("nombres", formDataObject.nombres);
    formData.append("apellidos", formDataObject.apellidos);
    formData.append("direccion", formDataObject.direccion);
    formData.append("correo", formDataObject.correo);
    formData.append("telefono", formDataObject.telefono);

    if (formDataObject.imagen instanceof File) {
      formData.append("imagenPerfil", formDataObject.imagen);
    }

    // Usa tu instancia de Axios para mantener el token y la baseURL
    const response = await Api.put(
      `/user/updateuserdata/${user}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};
