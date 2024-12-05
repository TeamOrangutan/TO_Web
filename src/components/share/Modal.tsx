import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../styles/modal.css";
import LogoPrimalGarage from "../../assets/images/PrimalGarage-Black.webp";
import { Title } from "../Title";
import primalGarageApi from "../../api/primalGarageApi";

interface Product {
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  id: number;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, id }) => {
  if (!isVisible) return null;
  const [products, setProducts] = useState<Product[]>([]);

  const totalGanancias = products.reduce(
    (acc, product) => acc + product.subtotal,
    0
  );
  useEffect(() => {
    const getProduct = async () => {
      const response = await primalGarageApi.get(`/invoices/${id}`);
      console.log(response.data)
      setProducts(response.data);
    };
    getProduct();
  }, [id]);
  const totalVentas = totalGanancias;

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
                  <td>${product.subtotal}</td>
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
