import primalGarageApi from "../primalGarageApi";

export const getBills = async () => {
  const data = await primalGarageApi.get("/invoices/");
  
  return data.data;
};


export const getSales = async () => {
  const data = await primalGarageApi.get("/invoices/Sales/");

  return data.data;
}