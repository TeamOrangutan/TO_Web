// src/pages/Histories.tsx
import React, { useState } from "react";

import "../../styles/pages/histories.css";
import data from "../../data/data.json";
import { SalesCard } from "../../components/SalesCard";
import { Title } from "../../components/Title";
import { CiSearch } from "react-icons/ci";
import { SortSelector } from "../../components/SortSelector"; 

export const Histories: React.FC = () => {
  const cardsData = [
    { label: "Ventas Totales", amount: "$ 00,000.00", isHighlighted: true },
    { label: "Ventas mensuales", amount: "$ 00,000.00" },
    { label: "Ventas Semanales", amount: "$ 00,000.00" },
    { label: "Ventas de Hoy", amount: "$ 00,000.00" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [sortBy, setSortBy] = useState("Fecha de venta");

  const option = [
    {
      label: "Fecha de venta"
    }, 
    {
      label: "Monto total"
    }, 
    {
      label: "Método de pago"
    }, 
  ]

  // Manejar búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar datos por búsqueda y aplicar el filtro actual
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.paymentMethod.toLowerCase().includes(query) ||
        item.date.includes(query) ||
        item.total.toString().includes(query)
    );

    setFilteredData(applySort(filtered, sortBy));
  };

  // Manejar cambio en el criterio de ordenación
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);

    // Aplicar el nuevo criterio de ordenación
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

  return (
    <div className="histories-container">
      <Title label="HISTORIAL DE VENTAS" />

      <div className="histories-header">
        <SortSelector value={sortBy} onChange={handleSortChange} options={option}/>

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
            amount={card.amount}
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
                  <a href="#">Ver todos</a>
                </td>
                <td>{item.date}</td>
                <td>${item.total.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
