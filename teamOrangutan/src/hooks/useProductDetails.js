import { useEffect, useState } from "react";
import { getProuductById } from "../Api/user/productsApi";

export const useProductDetails = (product) => {
  const [productUpdate, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precioVenta: "",
    estado: "Disponible",
    tallas: [],
    images: [],
  });

  const [order, setorder] = useState({});
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setProductData(product);
    }
  }, [product]);

  const setProductData = (data) => {
    let images = [];

    if (typeof data.path === "string") {
      images = [data.path];
    } else if (Array.isArray(data.path)) {
      images = data.path;
    }

    setProduct({
      nombre: data.name || "",
      descripcion: data.description || "",
      precioVenta: data.price || "00.00",
      estado: data.estado || "Disponible",
      tallas: data.tallas || [],
      images: images,
    });
  };

  const refreshProduct = async (id) => {
    try {
      const updatedProduct = await getProuductById(id); 
      setProductData(updatedProduct);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return {
    productUpdate,
    quantity,
    increase,
    decrease,
    selectedSize,
    setSelectedSize,
    order,
    setorder,
    refreshProduct,
  };
};
