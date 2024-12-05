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

export const getProducts = async () => {
  try {
    const response = await primalGarageApi.get('/products/list');

    return response.data;

  } catch (err) {
    console.error("Error fetching data");
    throw err;
  }
};


export const saveInvoice = async (product: productBillSave[]) => {
  try {

    const parseProduct = product.map((product) => ({
      producto_pk: product.producto_pk,
      cantidad: product.cantidad,
    }));
    
    const DataProductSend = {
      productos: parseProduct,
    };
    
    const response = await primalGarageApi.post('/invoices/', DataProductSend);
    console.log(response)
  } catch (err) {
    console.error("Error to create invoice");
    throw err;
  }
}