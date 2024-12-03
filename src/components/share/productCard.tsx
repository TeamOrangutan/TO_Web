import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/components/productCard.css";
import { fadeConfig } from "../../utils/motionConfig";
import { SlPencil } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";
import swal from "sweetalert";
import axios from "axios"; 
export const ProductCard: React.FC<productI> = ({
  id,
  name,
  price,
  path,
  hoverPath,
  onProductDeleted, 
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const [currentImg, setCurrentImg] = useState<string>(`${path}`);
  const navigate = useNavigate();

  const changeRoute = (path: string) => navigate(path);

  const handleDelete = async () => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este producto.",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`http://localhost:3000/api/products/${id}`);

          if (response.status === 200) {
            swal("¡Producto eliminado!", {
              icon: "success",
            });

            if (onProductDeleted) {
              onProductDeleted(id);
            }
          }
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          swal("Hubo un error al eliminar el producto.", {
            icon: "error",
          });
        }
      } else {
        swal("El producto está a salvo.");
      }
    });
  };

  return (
    <div
      className="card"
      onMouseEnter={() => setCurrentImg(`${hoverPath}`)}
      onMouseLeave={() => setCurrentImg(`${path}`)}
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
        <p>{formatPrice(price)}</p> 
      </div>
    </div>
  );
};
