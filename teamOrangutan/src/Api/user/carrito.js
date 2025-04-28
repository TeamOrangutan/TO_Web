// export const addCarrito = async (
//     product,
//     quantity,
//     size,

import { Api } from "./baseApi";

// )

export const getCarrito = async () => {
  try {
    const response = await Api.get("/products/carrito/8");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCarrito = async (productId, cantidad, talla, usuarioId) => {
  try {
    const response = await Api.post("/products/carrito", {
      productId,
      cantidad,
      talla,
      usuarioId,
    });

    console.log(response.data);
    
    return response.data
  } catch (error) {
    throw error
  }
};












