// export const addCarrito = async (
//     product,
//     quantity,
//     size,

import { Api } from "./baseApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// )

export const getCarrito = async () => {
  try {
    const user = localStorage.getItem("user");

    const token = localStorage.getItem("token");

    const response = await Api.get(`/products/carrito/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("obteniendo carrito");
    

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCarrito = async (productId, cantidad, talla, usuarioId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await Api.post(
      "/products/carrito",
      {
        productId,
        cantidad,
        talla,
        usuarioId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorText = error.response.data.message;
      console.log(error);

      toast.error(`${errorText}`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        style: { backgroundColor: "black", color: "#fff" },
      });
    }
    throw error;
  }
};

export const deleteItemCarrito = async (carritoItemId) => {
  const cartString = localStorage.getItem("cart");
    const token = localStorage.getItem("token");
  
  if (cartString) {
    const cart = JSON.parse(cartString);

    const carritoId = cart;
    try {
      const response = await Api.delete(
        `products/carrito/${carritoId}/item/${carritoItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const updateItemCart = async (itemId, talla, cantidad, action) => {
  try {
    const response = await Api.put(`products/updateProductItem/25`, {
      itemId,
      talla,
      cantidad,
      action,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
