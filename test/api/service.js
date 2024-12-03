import axios from "axios";

const primalGarageApi = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getBills = async () => {
  const data = await primalGarageApi.get("/invoices/");

  console.log(data.data);
};

const main = async () => {
    const data = await getBills();

    console.log(data)
}

main()