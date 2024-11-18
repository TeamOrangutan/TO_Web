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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSaveChanges = async () => {
    try {
      console.log(product);
      await axios.put(`http://localhost:3000/api/products/${productid}`, {
        nombre: product.name,
        descripcion: product.description,
        precioVenta: product.price,
      });
      alert("Producto actualizado con éxito!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Hubo un error al actualizar el producto.");
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <Title label="ACTUALIZAR PRODUCTO" />
      <EditProduct product={product} handleInputChange={handleInputChange} />

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
