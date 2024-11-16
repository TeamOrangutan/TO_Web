import React, { useRef } from "react";
import { Title } from "../../components/Title";
import "../../styles/pages/products.css";
import { ProductCard } from "../../components/share/productCard";
import ScrollToTop from "../../routers/ScrollToTop";
import { motion, useInView } from "framer-motion";

export const Products: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
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
      <ScrollToTop />
      <div style={{ marginTop: "100px" }}>
        <Title label="TODOS LOS PRODUCTOS" />
        <button className="save-button">Agregar</button>
        <motion.div
          className="parent"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.05 }}
        >
          {productData.map((product) => (
            <motion.div
              ref={ref}
              key={product.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isInView ? "visible" : "hidden"}
            >
              <ProductCard
                name={product.name}
                path={product.path}
                id={product.id}
                description={product.description}
                price={product.price}
                hoverPath={product.hoverPath}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};
