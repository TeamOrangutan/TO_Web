import { getAllProuducs } from "../Api/user/productsApi";
import { getInvoices, getSales } from "../Api/user/invoice";
import { useEffect, useState } from "react";

const useHistorialData = () => {
  const [productos, setProductos] = useState([]); // Productos disponibles
  const [facturas, setFacturas] = useState([]); // Las facturas
  const [ventas, setVentas] = useState([]);
  const [order, setOrder] = useState(""); // Estado para ordenar

  const fetchProductos = async () => {
    const data = await getAllProuducs();
    setProductos(data);
  };

  const fetchFacturas = async () => {
    const data = await getInvoices();
    setFacturas(data);
  };

  const fetchVentas = async () => {
    const data = await getSales();
    setVentas(data);
  };
  useEffect(() => {
    fetchFacturas();
    fetchProductos();
    fetchVentas();
  }, []);

  const sortedFacturas =
    order === "Fecha"
      ? [...facturas].sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
      : facturas;

  return {
    productos,
    facturas: sortedFacturas,
    ventas,
    order,
    setOrder,
  };
};

export default useHistorialData;
