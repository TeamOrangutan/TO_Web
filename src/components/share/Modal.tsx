import React from "react";
import { motion } from "framer-motion";
import "../../styles/modal.css";
import LogoPrimalGarage from "../../assets/images/PrimalGarage-Black.webp";
import { Title } from "../Title";

interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  products: Product[];
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, products }) => {
  if (!isVisible) return null;

  const totalGanancias = products.reduce(
    (acc, product) => acc + product.total,
    0
  );
  const totalVentas = totalGanancias;

  // Calcular las filas adicionales vacías necesarias para llegar a 15
  const emptyRowsCount = Math.max(0, 15 - products.length);
  const emptyRows = Array.from({ length: emptyRowsCount });

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <center>
            <img src={LogoPrimalGarage} alt="Logo" className="modal-logo" />
          </center>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
        </header>
        <Title label="TODOS LOS PRODUCTOS" />
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Nombre del producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>${product.total}</td>
                </tr>
              ))}
              {emptyRows.map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="modal-footer">
          <p>Total de ganancias: ${totalGanancias}</p>
          <p>Total de ventas: ${totalVentas}</p>
        </footer>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
