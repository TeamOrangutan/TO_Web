import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/updateProduct.css";
import { Title } from "../../components/Title";
import { EditProduct } from "../../components/EditProduct";

export const UpdateProducts: React.FC = () => {
  const navigate = useNavigate();
  const { productid } = useParams<{ productid: string }>();
  const [product, setProduct] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductData = async () => {
      if (productid) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/products/${productid}`
          );
          setProduct(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      }
    };

    fetchProductData();
  }, [productid]);

  if (loading) return <div>Cargando...</div>;

  if (!product) return <div>Producto no encontrado.</div>;

  // Verificación de stock (tallas)
  const validateStock = (stock: any[]) => {
    for (let talla of stock) {
      if (!talla.nombre || !talla.cantidad) {
        console.log("Cada talla debe tener un nombre y una cantidad.");
        return false;
      }
    }
    return true;
  };

  // Maneja cambios en los campos generales del producto (nombre, precio, descripción)
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "precioVenta" ? Number(value) : value,
    });
  };

  // Maneja cambios en las tallas (stock)
  const handleStockChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedStock = [...product.stock];
    updatedStock[index] = { ...updatedStock[index], [field]: value };
    setProduct({ ...product, stock: updatedStock });
  };

  // Maneja la acción de regresar
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveChanges = async () => {
    // Validar que las tallas sean correctas antes de guardar
    if (!validateStock(product.stock)) {
      alert("Por favor, complete todos los campos de tallas y cantidades.");
      return;
    }

    // Validar precio
    if (isNaN(product.precioVenta) || product.precioVenta <= 0) {
      alert("Por favor, ingrese un precio válido.");
      return;
    }

    try {
      // Enviar los datos a la API para actualizar el producto
      await axios.put(
        `http://localhost:3000/api/products/${productid}`,
        product,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Producto actualizado con éxito!");
      navigate("/products"); // Redirigir a la lista de productos o a otro lugar
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Hubo un error al actualizar el producto.");
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Title label="ACTUALIZAR PRODUCTO" />
      <EditProduct
        product={product}
        handleInputChange={handleInputChange}
        handleStockChange={handleStockChange}
      />

      <div className="actions">
        <div className="actions-container">
          <button className="cancel-button" onClick={handleGoBack}>
            Cancelar
          </button>
          <button className="save-button" onClick={handleSaveChanges}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
