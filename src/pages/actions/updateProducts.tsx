import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productData } from "../../data/products";
import "../../styles/pages/updateProduct.css";
import { Title } from "../../components/Title";
import { EditProduct } from "../../components/EditProduct";


function getDataById(id: number): productI | undefined {
  return productData.find((item) => item.id === id);
}

export const UpdateProducts: React.FC = () => {
  const navigate = useNavigate();
  const { productid } = useParams<{ productid: string }>();
  const [product, setProduct] = useState<productI | undefined>(undefined);
  const [count, setCounter] = useState(0);

  useEffect(() => {
    if (productid) {
      console.log("Product ID from URL:", productid); // Agregar este log
      const fetchedProduct = getDataById(Number(productid));
      setProduct(fetchedProduct);
    }
  }, [productid]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (product) {
      setProduct({
        ...product,
        [name]: name === "price" ? Number(value) : value,
      });
    }
  };

  const handleAddDetail = () => {
    if (product && count < 3) {
      const detalles = product.detalles || [];
      setProduct({ ...product, detalles: [...detalles, `Nuevo Detalle`] });
      setCounter(count + 1);
    }
  };

  const handleRemoveDetail = (index: number) => {
    if (product?.detalles) {
      const updatedDetalles = product.detalles.filter((_, i) => i !== index);
      setProduct({ ...product, detalles: updatedDetalles });
      setCounter(count - 1);
    }
  };

  const handleSaveChanges = () => {
    console.log("Producto actualizado:", product);
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div style={{ marginTop: "100px" }}>
      <Title label="ACTUALIZAR PRODUCTO" />
      <EditProduct
        product={product}
        handleInputChange={handleInputChange}
        handleAddDetail={handleAddDetail}
        handleRemoveDetail={handleRemoveDetail}
      />

      <div className="action-buttons">
        <button className="cancel-button" onClick={handleGoBack}>
          Cancelar
        </button>
        <button className="save-button" onClick={handleSaveChanges}>
          Guardar
        </button>
      </div>
    </div>
  );
};
