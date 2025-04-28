import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { getCarrito } from "../../../Api/user/carrito";

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [cart, setCart] = useState({ carritoId: null, total: 0, items: [] });
  useEffect(() => {
    const fetchCarrito = async () => {
      const response = await getCarrito();
      setCart(response);
      const itemsLength = response.items?.length || 0;
      setCartCount(itemsLength);
    };
    fetchCarrito()
  }, [cart]);
  
  
  const addToCart = () => {
    console.log(cartCount);
    console.log(cart);
    
    // if (!product || !product.id) {
    //   console.error(
    //     "Producto inválido al intentar agregar al carrito:",
    //     product
    //   );
    //   return;
    // }

    // setCartCount((prev) => prev + 1);
    // const cleanedCart = cart.filter((item) => item !== null);

    // if (!cleanedCart.find((item) => item.id === product.id)) {
    //   const updatedCart = [...cleanedCart, product];
    //   setCart(updatedCart);
    //   setIsAnimating(true);
    //   setTimeout(() => setIsAnimating(false), 300);
    // }
  };
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleAddToCart = () => {};

  const handleRemoveToCart = () => {
    // setCartCount((prev) => prev - 1);
    // setIsAnimating(true);
    // setTimeout(() => setIsAnimating(false), 300); // Animación durante 300ms
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        isAnimating,
        handleAddToCart,
        handleRemoveToCart,
        cart,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
