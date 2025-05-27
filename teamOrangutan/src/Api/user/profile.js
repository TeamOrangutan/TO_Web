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
    const formData = new FormData();

    // Adjuntar campos de texto
    formData.append("nombres", formDataObject.nombres);
    formData.append("apellidos", formDataObject.apellidos);
    formData.append("direccion", formDataObject.direccion);
    formData.append("correo", formDataObject.correo);

    if (formDataObject.imagen instanceof File) {
      formData.append("imagenPerfil", formDataObject.imagen);
    }

    console.log(formDataObject);
    console.log(formData);

    const response = await fetch(
      `http://localhost:3000/api/user/updateuserdata/${user}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error al actualizar usuario");
    }

    return data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};
