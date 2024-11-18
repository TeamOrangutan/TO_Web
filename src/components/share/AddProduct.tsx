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
  sizes: string[];
  details: string[];
  images: string[];
}

export const AddProduct: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  const [product, setProduct] = useState<ProductI>({
    name: "",
    description: "",
    salePrice: 0,
    manufacturingPrice: 0,
    sizes: ["M"],
    details: [],
    images: [],
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
          ? Number(value)
          : 1,
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


  const handleSaveChanges = async () => {
    const formData = new FormData();
    
    formData.append("nombre", product.name);
    formData.append("descripcion", product.description);
    formData.append("precioVenta", product.salePrice.toString());
    formData.append("manufacturingPrice", product.manufacturingPrice.toString());
  
    // Validar que haya al menos una imagen
    if (!product.images || product.images.length === 0) {
      console.log("El producto debe tener al menos una imagen");
      return;
    }
  
    product.images.forEach((image) => {
      const byteCharacters = atob(image.split(",")[1]);
      const byteArrays = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
      }
  
      const extension = image.split(";")[0].split("/")[1]; // Obtiene la extensión de la imagen
      const blob = new Blob([byteArrays], { type: `image/${extension}` });
      formData.append("images", blob, `image.${extension}`);
    });
  
    try {
      const response = await fetch("http://localhost:3000/api/products/", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Producto agregado correctamente");
        closeModal();
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
                <img src={image} alt={`Producto ${index + 1}`} style={{height: '100%', width:'100%'}}/>
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
                <AiOutlinePlus
                  data-tip="Añadir Producto"
                  size={40}
                  color="#777"
                  
                />
              </label>
            )}
          </div>

          <div className="edit-container">
            <input
              type="text"
              name="name"
              value={product.name}
              placeholder="Nombre del producto"
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
                <span>$</span>
                <input
                  type="number"
                  name="salePrice"
                  value={product.salePrice}
                  onChange={handleInputChange}
                  className="editable-price"
                />
              </div>

              <div className="input">
                <span>$</span>
                <input
                  type="number"
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
          </div>
        </div>
        <div className="actions">
          <div className="actions-container">
            <button onClick={closeModal} className="cancel-button">
              Cancelar
            </button>
            <button onClick={handleSaveChanges} className="save-button">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
