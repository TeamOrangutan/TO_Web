import { Api } from "./baseApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getAllProuducs = async () => {
    const token = localStorage.getItem("token");

  try {
    const response = await Api.get("/products",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });;
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response);
    }

    throw error;
  }
};

export const getProuductById = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await Api.get(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener productos:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createProduct = async (
  nombre,
  descripcion,
  precioVenta,
  estado,
  tallas,
  images
) => {
  try {
    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precioVenta", precioVenta.toString());
    formData.append("estado", estado);

    formData.append("tallas", JSON.stringify(tallas));

    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      } else {
        console.warn("Formato de imagen inválido:", image);
      }
    });

    console.log("agregar");
    console.log(formData);

    const response = await fetch("http://localhost:3000/api/products/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      toast.error(`${errorText}`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { backgroundColor: "black", color: "#fff" },
      });
      throw new Error(`Error al crear el producto: ${errorText}`);
    }

    toast.info("Producto creado correctamente", {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      style: { backgroundColor: "black", color: "#fff" },
    });

    return await response.json();
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const { nombre, descripcion, precioVenta, estado, tallas, images } =
      updatedData;

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("precioVenta", precioVenta.toString());
    formData.append("estado", estado);
    formData.append("tallas", JSON.stringify(tallas));

    const imagenesAntiguas = images.filter((img) => typeof img === "string");
    const imagenesNuevas = images.filter((img) => img instanceof File);

    formData.append("imagenesAntiguas", JSON.stringify(imagenesAntiguas));

    imagenesNuevas.forEach((image) => {
      formData.append("images", image);
    });

    console.log("tallas");
    console.log(formData);

    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const responseText = await response.text();
      toast.error(responseText || "Error al actualizar el producto");
      throw new Error(responseText || "Error al actualizar el producto");
    }
    const responseData = await response.json();

    toast.info("Producto actualizado correctamente", {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      style: { backgroundColor: "black", color: "#fff" },
    });
    return responseData;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    toast.info("Error al actualizar el producto:" + error, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      style: { backgroundColor: "black", color: "#fff" },
    });
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await Api.delete(`/products/${id}`);
    console.log(response);
    if (response.status == 200) {
      toast.success("Producto eliminado correctamente", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { backgroundColor: "black", color: "#fff" },
      });
    }
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
  }
};
