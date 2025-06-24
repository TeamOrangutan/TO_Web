import { useState } from "react";
import { createProduct, updateProduct } from "../Api/user/productsApi";
import { toast } from "react-toastify";

export function useForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precioVenta: "00.00",
    estado: "Disponible",
    tallas: [],
    images: [],
  });
  const agregarTallasForm = (nuevasTallas) => {
    setFormData((prevData) => ({
      ...prevData,
      tallas: Array.isArray(nuevasTallas)
        ? nuevasTallas
        : [...(prevData.tallas || []), nuevasTallas],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    try {
      const response = await createProduct(
        formData.nombre,
        formData.descripcion,
        formData.precioVenta,
        formData.estado,
        formData.tallas,
        formData.images
      );
      onProductAdded();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const handleSubmitUpdate = async (e, setLoading) => {
    e.preventDefault();
     if (setLoading) setLoading(true);
    try {
      const response = await updateProduct(formData.id, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precioVenta: formData.precioVenta,
        estado: formData.estado,
        tallas: formData.tallas,
        images: formData.images,
      });
      console.log("Producto actualizado:", response.data);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    } finally {
    if (setLoading) setLoading(false);
  }
  };

  return {
    handleInputChange,
    handleSubmit,
    formData,
    agregarTallasForm,
    setFormData,
    handleSubmitUpdate,
  };
}

export default useForm;
