import React, { useState, useEffect } from "react";
import { Title } from "../../components/Title";
import "../../styles/pages/products.css";
import { ProductCard } from "../../components/share/productCard";
import ScrollToTop from "../../routers/ScrollToTop";
import { motion } from "framer-motion";
import { AddProduct } from "../../components/share/AddProduct";
import { SortSelector } from "../../components/SortSelector";
import "../../styles/pages/histories.css";
import { getProductsWithUpdatedPaths } from "../../api/service/product.service";

export const Products: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("fecha_de_publicacion");
  const [sortOrder, setSortOrder] = useState("asc");
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const options = [{ label: "fecha de publicación" }, { label: "precio" }];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const updatedProducts = await getProductsWithUpdatedPaths();
        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
  
    fetchProducts();
  }, [updateTrigger]);
  const handleUpdate = () => {
    setUpdateTrigger(prev => !prev)
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    handleUpdate();
    setIsModalOpen(false);
  }
    ;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    const sortedProducts = applySort(products, newSortBy, sortOrder);
    setProducts(sortedProducts);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    const sortedProducts = applySort(products, sortBy, newOrder);
    setProducts(sortedProducts);
  };

  const applySort = (dataToSort: any[], sortBy: string, sortOrder: string) => {
    switch (sortBy) {
      case "fecha_de_publicacion":
        return [...dataToSort].sort((a, b) => {
          const dateA = new Date(a.fecha_de_publicacion).getTime();
          const dateB = new Date(b.fecha_de_publicacion).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
      case "precio":
        return [...dataToSort].sort((a, b) => {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
      default:
        return dataToSort;
    }
  };

  const handleProductDeleted = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  // const handleProductCreation = async () => {
  //   try {
  //     const newProduct = {
  //       name: "Nuevo Producto",
  //       descripcion: "Descripción",
  //       precio: 100,
  //       manufacturingPrice: 50,
  //       images: [],
  //     };

  //     const response = await axios.post(
  //       "http://localhost:3000/api/products",
  //       newProduct
  //     );

  //     if (response.status === 201) {
  //       const updatedProducts = await axios.get(
  //         "http://localhost:3000/api/products"
  //       );
  //       setProducts(updatedProducts.data);
  //       closeModal();
  //     }
  //   } catch (error) {
  //     console.error("Error al crear el producto:", error);
  //   }
  // };

  return (
    <>
      <ScrollToTop />
      <div style={{ marginTop: "100px" }}>
        <Title label="TODOS LOS PRODUCTOS" />
        <div style={{ flexDirection: "row", display: "flex", gap: 15 }}>
          <div className="histories-header">
            <SortSelector
              value={sortBy}
              onChange={handleSortChange}
              options={options}
            />
            <SortSelector
              value={sortOrder}
              onChange={handleSortOrderChange}
              options={[{ label: "asc" }, { label: "desc" }]}
              labelText="De forma:"
            />
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
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              path={product.path}
              id={product.id}
              estado={product.estado}
              description={product.description}
              price={product.price}
              hoverPath={product.hoverPath}
              onProductDeleted={handleProductDeleted}
            />
          ))}
        </div>
      </div>
    </>
  );
};
