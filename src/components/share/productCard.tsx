import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../../styles/components/productCard.css";
import { fadeConfig } from "../../utils/motionConfig";

export const ProductCard: React.FC<productI> = ({
  id,
  name,
  price,
  path,
  hoverPath,
}) => {
  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  const [currentImg, setCurrentImg] = useState<string>(path);

  return (
    <div
      className="card"
      onMouseEnter={() => setCurrentImg(hoverPath)}
      onMouseLeave={() => setCurrentImg(path)}
    >
      <div className="card-actions">
        <Link to={`Product/${id}`} style={{textDecoration: "none"}}>
          <button className="edit-button">✏️</button>
        </Link>
        <button className="delete-button">🗑️</button>
      </div>

      <motion.img
        src={currentImg}
        alt={name}
        className="card-image"
        key={currentImg}
        {...fadeConfig}
      />

      <div className="card-content">
        <p>{name}</p>
        <p>{`$ ${formatPrice(price)}`}</p>
      </div>
    </div>
  );
};
