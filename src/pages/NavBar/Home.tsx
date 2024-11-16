import React from "react";
import { Title } from "../../components/Title";
import "../../styles/Home.css";
import { ListImages } from "../../components/share/ListImages";
import { ProductCard } from "../../components/share/productCard";
import { productData } from "../../data/products";


export const Home: React.FC = () => {
  return (
    <>
      <ListImages />
      <Title label="EXPLORAR COLECCION" />
      <div className="parent">
        {productData.map((item: productI, index) => (
          <ProductCard
            key={index}
            id={item.id}
            name={item.name}
            description={item.description}
            path={item.path}
            price={item.price}
            hoverPath={item.hoverPath}
          />
        ))}
      </div>
    </>
  );
};
