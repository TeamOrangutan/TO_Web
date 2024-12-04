import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/pages/updateProduct.css";
import { Title } from "../../components/Title";
import { EditProduct } from "../../components/EditProduct";

interface Product {
  map(arg0: (product: any) => { nombre: any; }): unknown;
  name: string;
  description: string;
  price: number;
  stock: { nombre: string; cantidad: number }[];
  imagenes: string[];
  estado: string;
}

export const UpdateProducts: React.FC = () => {
  const navigate = useNavigate();
  const { productid } = useParams<{ productid: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
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

  const validateStock = (stock: any[]) => {
    for (let talla of stock) {
      if (!talla.nombre || !talla.cantidad) {
        console.log("Cada talla debe tener un nombre y una cantidad.");
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? Number(value) : value, // Corregir nombre de campo
    });
  };

  const handleStockChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedStock = [...product.stock];
    updatedStock[index] = { ...updatedStock[index], [field]: value };
    setProduct({ ...product, stock: updatedStock });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveChanges = async () => {
    if (!validateStock(product.stock)) {
      alert("Por favor, complete todos los campos de tallas y cantidades.");
      return;
    }

    if (isNaN(product.price) || product.price <= 0) {
      alert("Por favor, ingrese un precio válido.");
      return;
    }

    try {
      const FormatProduct = {
        nombre: product.name,
        descripcion: product.description,
        precioVenta: product.price,
        tallas: product.stock
      };

      console.log(FormatProduct);
      await axios.put(
        `http://localhost:3000/api/products/${productid}`,
        FormatProduct,
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
