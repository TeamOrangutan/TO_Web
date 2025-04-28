import { useEffect, useState } from "react";

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
      let images = [];

      if (typeof product.path === "string") {
        images = [product.path];
      } else if (Array.isArray(product.path)) {
        images = product.path;
      }

      setProduct({
        nombre: product.name || "",
        descripcion: product.description || "",
        precioVenta: product.price || "00.00",
        estado: product.estado || "Disponible",
        tallas: product.tallas || [],
        images: images,
      });
    }
  }, [product]);

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
  };
};
