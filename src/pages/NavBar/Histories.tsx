import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { SalesCard } from "../../components/SalesCard";
import { Title } from "../../components/Title";
import { SortSelector } from "../../components/SortSelector";
import { getBills, getSales } from "../../api/service/bill.service";
import Modal from "../../components/share/Modal";

export const Histories: React.FC = () => {
  const [dataSales, setDataSales] = useState<salesI>();
  const [data, setData] = useState<billI[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [sortBy, setSortBy] = useState("Fecha de venta");
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar el modal

  interface Product {
    name: string;
    price: number;
    quantity: number;
    total: number;
  }
  const cardsData = [
    { label: "Ventas Totales", isHighlighted: true },
    { label: "Ventas mensuales" },
    { label: "Ventas Semanales" },
    { label: "Ventas de Hoy" },
  ];
  const selectedProducts: Product[] = [
    { name: "NO QUIERE PRENDER", price: 10, quantity: 2, total: 20 },
    { name: "NO QUIERE PRENDER", price: 10, quantity: 2, total: 20 },
    { name: "NO QUIERE PRENDER", price: 10, quantity: 2, total: 20 },
    { name: "NO QUIERE PRENDER", price: 10, quantity: 2, total: 20 },
    { name: "NO QUIERE PRENDER", price: 10, quantity: 2, total: 20 },
    { name: "NO QUIERE PRENDER", price: 10, quantity: 2, total: 20 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: salesI = await getSales();
        const response: billI[] = await getBills();
        setDataSales(res);
        setFilteredData(response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.paymentMethod.toLowerCase().includes(query) ||
        item.date.includes(query) ||
        item.total.toString().includes(query)
    );
    setFilteredData(filtered);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    setFilteredData(applySort(filteredData, newSortBy));
  };

  const applySort = (dataToSort: typeof data, sortBy: string) => {
    switch (sortBy) {
      case "Fecha de venta":
        return [...dataToSort].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "Monto total":
        return [...dataToSort].sort((a, b) => b.total - a.total);
      case "Método de pago":
        return [...dataToSort].sort((a, b) =>
          a.paymentMethod.localeCompare(b.paymentMethod)
        );
      default:
        return dataToSort;
    }
  };

  const handleViewProducts = () => {
    setModalVisible(true); // Muestra el modal
  };

  return (
    <div className="histories-container">
      <Title label="HISTORIAL DE VENTAS" />

      <div className="histories-header">
        <SortSelector
          value={sortBy}
          onChange={handleSortChange}
          options={[
            { label: "Fecha de venta" },
            { label: "Monto total" },
            { label: "Método de pago" },
          ]}
        />
        <div className="search-container">
          <CiSearch className="search-icon" />
          <input
            type="text"
            placeholder={"Buscar en el historial"}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="cards-container">
        {cardsData.map((card, index) => (
          <SalesCard
            key={index}
            label={card.label}
            amount={String(dataSales?.ventasHoy)}
            isHighlighted={card.isHighlighted}
          />
        ))}
      </div>

      <table className="histories-table">
        <thead>
          <tr>
            {[
              "NOMBRE",
              "CORREO",
              "MÉTODO DE PAGO",
              "PRODUCTOS",
              "FECHA",
              "HORA",
              "TOTAL",
            ].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.paymentMethod}</td>
                <td>
                  <button
                    onClick={() => handleViewProducts()}
                    style={{
                      all: "unset",
                      background: "none",
                      cursor: "pointer"
                    }}
                  >
                    Ver todos
                  </button>
                </td>
                <td>{item.date}</td>
                <td>{item.hour}</td>
                <td>${item.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de productos */}
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)} // Cerrar el modal
        products={selectedProducts} // Pasar los productos seleccionados
      />
    </div>
  );
};
