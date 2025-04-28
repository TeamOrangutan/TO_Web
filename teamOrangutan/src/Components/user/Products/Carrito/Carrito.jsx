import React from "react";
import { useEffect } from "react";
import { getCarrito } from "../../../../Api/user/carrito";
import { useState } from "react";

export const Carrito = () => {
  const [carrito, setcarrito] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const data = await getCarrito();
        setcarrito(data)
        setloading(true);
        console.log(carrito);
      } catch (error) {
        setloading(false);
      }
    };
    fetchCarrito()
  }, []);

  return <div>hey</div>;
};

export default Carrito;
