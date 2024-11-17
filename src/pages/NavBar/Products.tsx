import React, {useState} from "react";
import { Title } from "../../components/Title";
import "../../styles/pages/products.css";
import { ProductCard } from "../../components/share/productCard";
import "../../styles/Home.css";
import ScrollToTop from "../../routers/ScrollToTop";
import {motion} from 'framer-motion'
import { AddProduct } from '../../components/share/AddProduct';
export const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const productData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: "TE PASO UN FÓSFORO",
    path: "example.jpg",
    estado: "disponible",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: 9.99,
    hoverPath: "example1.jpg",
  }));
  return (
    <>
      <ScrollToTop />
      <div style={{ marginTop: "100px" }}>
        <Title label="TODOS LOS PRODUCTOS" />
        <div style={{ flexDirection: "row", display: "flex", gap: 15 }}>
          <div className="cancel-button">Ordenar por</div> {/*Cambiar*/}
          <div>
            {/* Este es el contenedor del icono */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={openModal}
            >
            </motion.div>

            <button className="save-button" onClick={openModal}>
              Agregar
            </button>
            {isModalOpen && <AddProduct closeModal={closeModal} />}
          </div>
        </div>
        <div className="parent">
          {productData.map((product) => (
            <ProductCard
              name={product.name}
              path={product.path}
              id={product.id}
              estado={product.estado}
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
