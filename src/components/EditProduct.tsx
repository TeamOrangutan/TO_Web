import React from "react";

interface Product {
  name: string;
  description: string;
  price: number;
  stock: { nombre: string; cantidad: number }[];
  imagenes: string[];
  estado: string;
}

interface EditProductProps {
  product: Product;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleStockChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
}

export const EditProduct: React.FC<EditProductProps> = ({
  product,
  handleInputChange,
  handleStockChange,
}) => {
  return (
    <div className="edit-product-container">
      <div className="product-details">
        <label>Nombre del Producto</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="product-details">
        <label>Descripción del Producto</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="product-details">
        <label>Precio de Venta</label>
        <input
          type="number"
          name="price" 
          value={product.price}
          onChange={handleInputChange}
        />
      </div>

      <div className="product-stock">
        <h3>Stock / Tallas</h3>
        {product.stock.map((talla, index) => (
          <div key={index} className="stock-item">
            <div>
              <label>Talla</label>
              <input
                type="text"
                name="nombre" 
                value={talla.nombre}
                onChange={(e) => handleStockChange(index, "nombre", e.target.value)}
              />
            </div>
            <div>
              <label>Cantidad</label>
              <input
                type="number"
                name="cantidad"  // 'cantidad' es el campo dentro de 'stock'
                value={talla.cantidad}
                onChange={(e) => handleStockChange(index, "cantidad", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
