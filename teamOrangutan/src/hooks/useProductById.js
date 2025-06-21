import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProuductById } from "../Api/user/productsApi";

const useProductById = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await getProuductById(id);
        setProduct(data);
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);


  console.log("hola");
  

  return { product, loading, error}

};

export default useProductById
