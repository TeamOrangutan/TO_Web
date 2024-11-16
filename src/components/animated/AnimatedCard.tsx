import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "../share/productCard";

interface PropsAnimatedCard {
  product: productI;
  variants: {
    hidden: {
      opacity: number;
      y: number;
    };
    visble: {
      opacity: number;
      y: number;
    };
  };
}
const AnimatedCard: React.FC<PropsAnimatedCard> = ({ product, variants }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6 }}
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
  );
};

export default AnimatedCard;
