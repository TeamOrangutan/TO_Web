import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../data/products";
import "../../styles/pages/updateProduct.css";
import { Title } from "../../components/Title";
import { useNavigate } from "react-router-dom";

interface productI {
  id: number;
  name: string;
  price: number;
  description: string;
  estado?: string;
  detalles?: string[];
  path: string;
}

function getDataById(id: number): productI | undefined {
  return productData.find((item) => item.id === id);
}

export const UpdateProducts: React.FC = () => {
  const navigate = useNavigate();
  const { productid } = useParams<{ productid: string }>();
  const [product, setProduct] = useState<productI | undefined>(undefined);

  useEffect(() => {
    if (productid) {
      const fetchedProduct = getDataById(Number(productid));
      setProduct(fetchedProduct);
    }
  }, [productid]);

  const handleGoBack = () => {
    navigate(-1)
  }
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (product) {
      setProduct({
        ...product,
        [name]: name === "price" ? Number(value) : value,
      });
    }
  };

  const handleAddDetail = () => {
    if (product) {
      const detalles = product.detalles || [];
      setProduct({ ...product, detalles: [...detalles, `Nuevo Detalle`] });
    }
  };

  const handleRemoveDetail = (index: number) => {
    if (product?.detalles) {
      const updatedDetalles = product.detalles.filter((_, i) => i !== index);
      setProduct({ ...product, detalles: updatedDetalles });
    }
  };

  const handleSaveChanges = () => {
    console.log("Producto actualizado:", product);
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div style={{marginTop: '100px'}}>
      <Title label="ACTUALIZAR PRODUCTO" />
      <div className="product-container">
        <div className="image-container">
          <img
            src="/example.jpg"
            alt={product.name}
            className="product-image"
          />
        </div>

        {/* Contenedor de edición */}
        <div className="edit-container">
          {/* Nombre del producto editable */}
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="editable-title"
          />

          {/* Precio editable */}
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="editable-price"
          />

          {/* Descripción editable */}
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="editable-description"
          />

          {/* Estado editable */}
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={product.estado || ""}
            onChange={handleInputChange}
          >
            <option value="disponible">Disponible</option>
            <option value="agotado">Agotado</option>
          </select>

          {/* Lista de detalles */}
          <ul className="details-list">
            {product.detalles?.map((detalle, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={detalle}
                  onChange={(e) => {
                    const updatedDetalles = [...(product.detalles || [])];
                    updatedDetalles[index] = e.target.value;
                    setProduct({ ...product, detalles: updatedDetalles });
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
            <li>
              <button className="add-button" onClick={handleAddDetail}>
                Agregar +
              </button>
            </li>
          </ul>

          {/* Botones de acción */}
          <div className="action-buttons">
            <button className="cancel-button" onClick={handleGoBack}>Cancelar</button>
            <button className="save-button" onClick={handleSaveChanges}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
