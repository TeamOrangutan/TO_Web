import { useState } from "react";

const useAnimateCart = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); 
  };

  return {
    cartCount,
    setCartCount,
    isAnimating,
    setIsAnimating,
    handleAddToCart,
  };
};

export default useAnimateCart
