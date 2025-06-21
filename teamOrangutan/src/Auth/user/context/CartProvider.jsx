import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import {
  deleteItemCarrito,
  getCarrito,
  updateItemCart,
} from "../../../Api/user/carrito";
import { getProuductById } from "../../../Api/user/productsApi";
import { AuthContext } from "./AuthContext";

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cart, setCart] = useState({ carritoId: null, total: 0, items: [] });
  const { user } = useContext(AuthContext);
  const refreshCart = async () => {
    const carrito = await getCarrito();

    const normalizedItems = carrito.items.map((item) => ({
      Item_Id: item.carritoItem_Id,
      productId: item.productId || item.productoId,
      size: item.size || "",
      quantity: item.quantity || item.cantidad || 1,
      precio: item.precio || item.producto?.price || 0,
    }));

    setCart({
      carritoId: carrito.carritoId,
      total: carrito.total,
      items: normalizedItems,
    });
  };

  useEffect(() => {
    if (user) {
      refreshCart();
    } else {
      setCart({ carritoId: null, total: 0, items: [] });
      setCartCount(0);
    }
  }, [user]);

  useEffect(() => {
    const itemsLength = cart.items?.length || 0;
    setCartCount(itemsLength);
  }, [cart]);

  const addToCart = async (newItem) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        items: [...prevCart.items, newItem],
        total: prevCart.total + (newItem.precio || 0),
      };
      return updatedCart;
    });

    setCartCount((prev) => prev + 1);
    setIsAnimating(true);
    await refreshCart();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const updateItemCarrito = async ({ itemId, talla, cantidad, action }) => {
    const data = await updateItemCart(itemId, talla, cantidad, action);
    return data;
  };

  const removeFromCart = async (itemId) => {
    try {
      await deleteItemCarrito(itemId);
      await refreshCart();
    } catch (error) {
      console.error("Error al eliminar item del carrito:", error);
    }
  };

  const fetchProductsInCart = async () => {
    try {
      const carrito = await getCarrito();
      console.log(carrito);

      const normalizedItems = carrito.items.map((item) => ({
        Item_Id: item.carritoItem_Id,
        productId: item.productId || item.productoId,
        size: item.size || item.talla || "",
        quantity: item.quantity || item.cantidad || 0,
        precio: item.precio || item.producto?.price || 0,
      }));

      const products = await Promise.all(
        normalizedItems.map(async (item) => {
          const product = await getProuductById(item.productId);
          return {
            ...product,
            quantity: item.quantity,
            size: item.size,

            Item_Id: item.Item_Id,
          };
        })
      );


      return products;
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        isAnimating,
        cart,
        addToCart,
        removeFromCart,
        refreshCart,
        fetchProductsInCart,
        updateItemCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
