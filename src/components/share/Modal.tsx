import React from "react";
import { motion } from "framer-motion";
import "../../styles/modal.css";

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

  const totalGanancias = products.reduce((acc, product) => acc + product.total, 0);
  const totalVentas = totalGanancias; // En este ejemplo es lo mismo

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
        onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic en el contenido
      >
        <header className="modal-header">
          <img src="/logo.png" alt="Logo" className="modal-logo" />
          <button className="close-btn" onClick={onClose}>X</button>
        </header>
        <h2 className="modal-title">TODOS LOS PRODUCTOS</h2>
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
