import React from "react";

interface ProductContainerProps {
  product: {
    name: string;
    price: number;
    description: string;
    estado: string;
    detalles?: string[];
    path?: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleAddDetail: () => void;
  handleRemoveDetail: (index: number) => void;
}

export const EditProduct: React.FC<ProductContainerProps> = ({
  product,
  handleInputChange,
  handleAddDetail,
  handleRemoveDetail,
}) => {
  const handleDetailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedDetalles = [...(product.detalles || [])];
    updatedDetalles[index] = e.target.value;
    handleInputChange({
      target: { name: "detalles", value: updatedDetalles },
    });
  };

  return (
    <div className="product-container">
      <div className="image-container">
        <img src={`http://localhost:3000/api/products/file/${product.path}`} alt={product.name} className="product-image" />
      </div>

      <div className="edit-container">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          className="editable-title"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          className="editable-price"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="editable-description"
        />

        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={product.estado}
          onChange={handleInputChange}
          style={{ width: "200px" }}
        >
          <option value="disponible">Disponible</option>
          <option value="agotado">Agotado</option>
        </select>

        <label htmlFor="detalles">Detalles:</label>
        <ul className="details-list">
          {(product.detalles || []).map((detalle, index) => (
            <li key={index}>
              <input
                type="text"
                value={detalle}
                onChange={(e) => handleDetailChange(e, index)}
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
          {(product.detalles?.length || 0) < 4 && (
            <li>
              <button className="add-button" onClick={handleAddDetail}>
                Agregar +
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
