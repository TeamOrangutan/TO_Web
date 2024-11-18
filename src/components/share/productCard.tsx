import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/components/productCard.css";
import { fadeConfig } from "../../utils/motionConfig";
import { SlPencil } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";
import swal from "sweetalert";

export const ProductCard: React.FC<productI> = ({
  id,
  name,
  price,
  path,
  hoverPath,
}) => {
  const formatPrice = (price: number): string => price.toFixed(2);
  const [currentImg, setCurrentImg] = useState<string>(path);

  const navigate = useNavigate();

  const changeRoute = (path: string) => navigate(path);

  const handleDelete = () => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este producto.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Aquí iría la lógica para eliminar el producto
        console.log(`Producto con ID ${id} eliminado`);
        swal("¡Producto eliminado!", {
          icon: "success",
        });
      } else {
        swal("El producto está a salvo.");
      }
    });
  };

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
        <button className="delete-button" onClick={handleDelete}>
          <AiOutlineDelete color="black" size={20} />
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
