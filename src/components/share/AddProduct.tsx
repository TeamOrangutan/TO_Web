import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/components/addProduct.css";
import { Title } from "../Title";
import { AiOutlinePlus } from "react-icons/ai";

interface ProductI {
  name: string;
  description: string;
  salePrice: number;
  manufacturingPrice: number;
  details: string[];
  images: string[];
  tallas: { nombre: string; cantidad: number }[];
}

export const AddProduct: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [product, setProduct] = useState<ProductI>({
    name: "",
    description: "",
    salePrice: 0,
    manufacturingPrice: 0,
    details: [],
    images: [],
    tallas: [{ nombre: "M", cantidad: 0 }], // Inicializa con una talla M y cantidad 0
  });
  const [count, setCounter] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]:
        name === "salePrice" || name === "manufacturingPrice"
          ? value === ""
            ? 0
            : parseFloat(value)
          : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          images:
            prev.images.length < 2
              ? [...prev.images, reader.result as string]
              : prev.images,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddDetail = () => {
    if (count < 4) {
      setProduct({
        ...product,
        details: [...product.details, `Nuevo Detalle ${count + 1}`],
      });
      setCounter(count + 1);
    }
  };

  const handleRemoveDetail = (index: number) => {
    setProduct({
      ...product,
      details: product.details.filter((_, i) => i !== index),
    });
    setCounter(count - 1);
  };

  const handleStockChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    
    // Si el campo es de tipo "cantidad" y el valor es un número válido
    const updatedStock = [...product.tallas];
    
    updatedStock[index] = {
      ...updatedStock[index],
      // Verificamos si el campo es cantidad o nombre
      [name]: name === "cantidad" ? (value === "" ? 0 : parseInt(value)) : value,
    };
    
    setProduct({
      ...product,
      tallas: updatedStock,
    });
  };

  const handleAddStock = () => {
    setProduct({
      ...product,
      tallas: [...product.tallas, { nombre: "", cantidad: 0 }],
    });
  };

  const handleRemoveStock = (index: number) => {
    setProduct({
      ...product,
      tallas: product.tallas.filter((_, i) => i !== index),
    });
  };

  const handleSaveChanges = async () => {
    // Validar que las tallas tengan 'nombre' y 'cantidad'
    const validateStock = (stock: { nombre: string; cantidad: number; }[]) => {
      for (let talla of stock) {
        if (!talla.nombre || !talla.cantidad) {
          console.log("Cada talla debe tener un nombre y una cantidad.");
          return false;
        }
      }
      return true;
    };
  
    // Verificar las tallas
    if (!validateStock(product.tallas)) {
      return; // No enviar si no es válido
    }
  
    // Crear un nuevo objeto FormData
    const formData = new FormData();
  
    // Agregar los datos básicos del producto
    formData.append("nombre", product.name);
    formData.append("descripcion", product.description);
    formData.append("precioVenta", product.salePrice.toString());
    formData.append("manufacturingPrice", product.manufacturingPrice.toString());
  
    // Convertir las tallas a JSON y agregarlo al FormData
    formData.append('tallas', JSON.stringify(product.tallas));
  
    // Verificar si se han proporcionado imágenes
    if (!product.images || product.images.length === 0) {
      console.log("El producto debe tener al menos una imagen");
      return;
    }
  
    // Convertir las imágenes de base64 a Blob y agregarlas al FormData
    product.images.forEach((image) => {
      const byteCharacters = atob(image.split(",")[1]);
      const byteArrays = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }
  
      const extension = image.split(";")[0].split("/")[1];
      const blob = new Blob([byteArrays], { type: `image/${extension}` });
  
      // Agregar la imagen al FormData
      formData.append("images", blob, `image.${extension}`);
    });
  
    // Enviar la solicitud a la API
    try {
      const response = await fetch("http://localhost:3000/api/products/", {
        method: "POST",
        body: formData,
      });
  
      // Si la respuesta es exitosa
      if (response.ok) {
        console.log("Producto agregado correctamente");
        closeModal(); // Cerrar el modal si todo va bien
      } else {
        const errorData = await response.json();
        console.log("Error al guardar el producto:", errorData.error || errorData.message || "Desconocido");
      }
    } catch (error) {
      console.error("Error al enviar el producto", error);
    }
  };

  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="modal-content">
        <button onClick={closeModal} className="close-button">
          ✖
        </button>
        <Title label="AÑADIR PRODUCTO" />

        <div className="modal-body">
          <div className="image-upload">
            {product.images.map((image, index) => (
              <div key={index} className="image-preview">
                <img
                  src={image}
                  alt={`Producto ${index + 1}`}
                  style={{ height: "100%", width: "100%" }}
                />
                <button
                  className="delete-button"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✖
                </button>
              </div>
            ))}
            {product.images.length < 2 && (
              <label htmlFor={`product-image-${product.images.length}`}>
                <input
                  type="file"
                  id={`product-image-${product.images.length}`}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <AiOutlinePlus size={40} color="#777" />
              </label>
            )}
          </div>

          <div className="edit-container">
            <label>Nombre del producto</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="editable-title"
            />
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className="editable-description"
              placeholder="Añade una descripción a tu producto"
            />

            <div className="inputs-container">
              <div className="input">
                <label>Precio de venta</label>
                <input
                  type="text"
                  name="salePrice"
                  value={product.salePrice}
                  onChange={handleInputChange}
                  className="editable-price"
                />
              </div>

              <div className="input">
                <label>Coste de producción</label>
                <input
                  type="text"
                  name="manufacturingPrice"
                  value={product.manufacturingPrice}
                  onChange={handleInputChange}
                  className="editable-price"
                />
              </div>
            </div>

            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              name="estado"
              onChange={handleInputChange}
              style={{ width: "200px", backgroundColor: "white" }}
            >
              <option value="disponible">Disponible</option>
              <option value="agotado">Agotado</option>
            </select>

            <label htmlFor="detalles">Detalles:</label>
            <ul className="details-list">
              {product.details?.map((detalle, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={detalle}
                    onChange={(e) => {
                      const updatedDetails = [...product.details];
                      updatedDetails[index] = e.target.value;
                      setProduct({
                        ...product,
                        details: updatedDetails,
                      });
                    }}
                    className="editable-detail"
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleRemoveDetail(index)}
                  >
                    ✖
                  </button>
                </li>
              ))}
              {product.details.length < 4 && (
                <li>
                  <button className="add-button" onClick={handleAddDetail}>
                    Agregar +
                  </button>
                </li>
              )}
            </ul>

            {/* NUEVO: Tallas y cantidades */}
            <label htmlFor="stock">Stock (Talla y Cantidad):</label>
            <div className="stock-container">
              {product.tallas.map((item, index) => (
                <div key={index} className="stock-item">
                  <input
                    type="text"
                    name="nombre"
                    value={item.nombre}
                    onChange={(e) => handleStockChange(e, index)}
                    placeholder="Tamaño"
                    className="stock-input"
                  />
                  <input
                    type="number"
                    name="cantidad"
                    value={item.cantidad}
                    onChange={(e) => handleStockChange(e, index)}
                    placeholder="Cantidad"
                    className="stock-input"
                  />
                  <button
                    className="delete-button"
                    onClick={() => handleRemoveStock(index)}
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button className="add-button" onClick={handleAddStock}>
                Agregar stock +
              </button>
            </div>
          </div>

          <div className="buttons">
            <button className="cancel-button" onClick={closeModal}>
              Cancelar
            </button>
            <button className="save-button" onClick={handleSaveChanges}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
