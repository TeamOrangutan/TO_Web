import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../styles/components/addProduct.css";
import { Title } from "../Title";

interface ProductI {
  name: string;
  description: string;
  salePrice: number;
  manufacturingPrice: number;
  sizes: string[];
  details: string[];
  image: string | null;
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
    image: null,
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
          : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDetail = () => {
    if (count < 3) {
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

  const handleSaveChanges = () => {
    console.log("Producto agregado:", product);
    closeModal(); // Cerrar el modal después de guardar
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

        {/* Contenedor para imagen y inputs */}
        <div className="modal-body">
          {/* Imagen del producto */}
          <div className="image-upload">
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              id="product-image"
              style={{ display: "none" }}
            />
            <label htmlFor="product-image" className="image-label">
              {product.image ? (
                <img src={product.image} alt="Producto" className="preview-image" />
              ) : (
                <span>+</span>
              )}
            </label>
          </div>

          <div className="inputs">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Nombre del producto"
            />
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Descripción"
            />
            <input
              type="number"
              name="salePrice"
              value={product.salePrice}
              onChange={handleInputChange}
              placeholder="Precio de venta"
            />
            <input
              type="number"
              name="manufacturingPrice"
              value={product.manufacturingPrice}
              onChange={handleInputChange}
              placeholder="Precio de fabricación"
            />

            <select
              name="sizes"
              value={product.sizes[0]}
              onChange={handleInputChange}
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>

            <div className="details">
              <h3>Detalles:</h3>
              <ul>
                {product.details.map((detalle, index) => (
                  <li key={index}>
                    {detalle}{" "}
                    <button onClick={() => handleRemoveDetail(index)}>✖</button>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleAddDetail}
                disabled={count >= 3}
              >
                {count < 3 ? "Agregar detalle" : "Límite de detalles alcanzado"}
              </button>
            </div>
          </div>

        </div>
          <div className="actions">
            <button onClick={closeModal} className="cancel-button">Cancelar</button>
            <button onClick={handleSaveChanges} className="save-button">Guardar</button>
          </div>
      </div>
    </motion.div>
  );
};
