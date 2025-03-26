import { useState } from "react";

export const useForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    preciodeVenta: "00.00",
    precioFabricacion: '00.00'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar los datos del formulario (por ejemplo, enviarlos a una API)
    console.log(formData);
    setOpen(false); // Cerrar el modal después de enviar el formulario
  };

  return {handleInputChange, handleSubmit, formData};
};

export default useForm;
