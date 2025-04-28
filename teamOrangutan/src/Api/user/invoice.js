import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createInvoice = async (products, cliente) => {
  try {
    const invoiceData = {
      nombreCliente: `${cliente.nombre} ${cliente.apellido}`,
      productos: products,
    };

    const response = await fetch("http://localhost:3000/api/invoices/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      const errorText = await response.text();
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
      throw new Error(`Error al crear la factura: ${errorText}`);
    }

    toast.info("Factura creada correctamente", {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      style: { backgroundColor: "black", color: "#fff" },
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getInvoices = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/invoices/All", {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
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
      throw new Error(`Error al obtener las facturas: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getSales = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/invoices/", {
      method: "GET",
    });

    if (!response.ok) {
      const errorText = await response.text();
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
      throw new Error(`Error al obtener las ventas: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
