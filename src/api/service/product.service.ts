import primalGarageApi from "../primalGarageApi";

export const getProductsWithUpdatedPaths = async () => {
  try {
    const response = await primalGarageApi.get("/products");
    return response.data.map((product: any) => ({
      ...product,
      path: `http://localhost:3000/api/products/file/${product.path}`,
      hoverPath: `http://localhost:3000/api/products/file/${product.hoverPath}`,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
