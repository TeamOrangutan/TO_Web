import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/components/productCard.css";
import { fadeConfig } from "../../utils/motionConfig";
import { SlPencil } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";

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

  const navigate = useNavigate();

  const changeRoute = (path: string) => navigate(path);
  const [currentImg, setCurrentImg] = useState<string>(path);

  return (
    <div
      className="card"
      onMouseEnter={() => setCurrentImg(hoverPath)}
      onMouseLeave={() => setCurrentImg(path)}
    >
      <div className="card-actions">
        <button
          className="edit-button"
          onClick={() => changeRoute(`/Product/${id}`)}
        >
          <SlPencil size={14} />
        </button>
        <button className="delete-button">
          <AiOutlineDelete color="black" size={20}/>
        </button>
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
