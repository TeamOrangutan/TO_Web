import React, { useState } from "react";
import { Title } from "../../components/Title";
import "../../styles/Home.css";
import { ListImages } from "../../components/share/ListImages";
import { ProductCard } from "../../components/share/productCard";
import { productData } from "../../data/products";
import { AddProduct } from "../../components/share/AddProduct";
import { motion } from "framer-motion";
import ScrollToTop from "../../routers/ScrollToTop";
import { AiOutlinePlus } from "react-icons/ai";
export const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <ScrollToTop />
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
            estado={item.estado}
            price={item.price}
            hoverPath={item.hoverPath}
          />
        ))}
        <div>
          <motion.div
            className="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={openModal}
          >
            <AiOutlinePlus data-tip="Añadir Producto"  size={40} color="#777"/>
          </motion.div>

          {isModalOpen && <AddProduct closeModal={closeModal} />}
        </div>
      </div>
    </>
  );
};
