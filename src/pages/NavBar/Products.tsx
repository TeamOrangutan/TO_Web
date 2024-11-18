import React, { useState } from "react";
import { Title } from "../../components/Title";
import "../../styles/pages/products.css";
import { ProductCard } from "../../components/share/productCard";
import ScrollToTop from "../../routers/ScrollToTop";
import { motion } from "framer-motion";
import { AddProduct } from "../../components/share/AddProduct";
import { SortSelector } from "../../components/SortSelector";
import data from "../../data/product.json"; 
import "../../styles/pages/histories.css";

export const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [sortBy, setSortBy] = useState("Fecha de publicacion");

  const options = [
    { label: 'Fecha de publicacion' },
    { label: 'Precio' }
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);

    setFilteredData(applySort(filteredData, newSortBy));
  };

  const applySort = (dataToSort: typeof data, sortBy: string) => {
    switch (sortBy) {
      case "Fecha de publicacion":
        return [...dataToSort].sort((a, b) => new Date(a.fecha_de_publicacion).getTime() - new Date(b.fecha_de_publicacion).getTime());
      case "Precio":
        return [...dataToSort].sort((a, b) => a.price - b.price);
      default:
        return dataToSort;
    }
  };

  return (
    <>
      <ScrollToTop />
      <div style={{ marginTop: "100px" }}>
        <Title label="TODOS LOS PRODUCTOS" />
        
        <div style={{ flexDirection: "row", display: "flex", gap: 15 }}>
          <div className="histories-header">
            <SortSelector value={sortBy} onChange={handleSortChange} options={options} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={openModal}
            >
              <button className="save-button">Agregar</button>
            </motion.div>
            {isModalOpen && <AddProduct closeModal={closeModal} />}
          </div>
        </div>

        {/* Productos */}
        <div className="parent">
          {filteredData.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              path={product.path}
              id={product.id}
              estado={product.estado}
              description={product.description}
              price={product.price}
              hoverPath={product.hoverPath}
            />
          ))}
        </div>
      </div>
    </>
  );
};
