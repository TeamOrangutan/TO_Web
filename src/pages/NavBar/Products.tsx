import React from "react";
import { Title } from "../../components/Title";
import "../../styles/pages/products.css";
import { ProductCard } from "../../components/share/productCard";

export const Products: React.FC = () => {
  const productData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: "TE PASO UN FÓSFORO",
    path: "example.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 9.99,
    hoverPath: "example1.jpg",
  }));
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Title label="TODOS LOS PRODUCTOS" />
        <button className="save-button">Agregar</button>
        <div className="parent">
        {productData.map((product) => (
        <ProductCard
          key={product.id} // Clave única requerida para listas
          name={product.name}
          path={product.path}
          id={product.id}
          description={product.description}
          price={product.price}
          hoverPath={product.hoverPath}
        />
      ))}
          
        </div>
      </div>
    </>
  );
};
