import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { SalesCard } from "../../components/SalesCard";
import { Title } from "../../components/Title";
import { SortSelector } from "../../components/SortSelector";
import { getBills, getSales } from "../../api/service/bill.service";
import Modal from "../../components/share/Modal";
import { motion } from "framer-motion";
import "../../styles/components/addProduct.css";
import { getProducts } from "../../api/service/product.service";

interface SalesData {
  ventasHoy: number;
  ventasMensuales: number;
  ventasSemana: number;
  ventasTotales: number;
}

interface Bill {
  name: string;
  email: string;
  paymentMethod: string;
  date: string;
  hour: string;
  total: number;
}

interface Product {
  name: string;
  price: number;
  quantity: number;
  total: number;
  sizes: string[];
}

type sizes = {
  name: string;
  cantidad: string;
};

interface productList {
  name: string;
  price: number;
  sizes: sizes[];
}

export const Histories: React.FC = () => {
  const [dataSales, setDataSales] = useState<SalesData | null>(null);
  const [data, setData] = useState<Bill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Bill[]>(data);
  const [sortBy, setSortBy] = useState("Fecha de venta");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [selectedProducts1, setSelectedProducts1] = useState<Product[]>([]);

  const cardsData = [
    { label: "Ventas Totales", isHighlighted: true },
    { label: "Ventas mensuales" },
    { label: "Ventas Semanales" },
    { label: "Ventas de Hoy" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: SalesData = await getSales();
        const response: Bill[] = await getBills();

        const listProduct: productList[] = await getProducts();

        
        const ParseListProduct: Product[] = listProduct.map((list) => ({
          name: list.name,
          price: Number(list.price),
          quantity: 1,
          total: 0,
          sizes: list.sizes.map((size) => size.name),
        }));
        console.log(ParseListProduct);
        setDataSales(res);
        setFilteredData(response);
        setAvailableProducts(ParseListProduct);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      availableProducts.filter((product) =>
        product.name.toLowerCase().includes(productSearch)
      )
    );
  }, [productSearch, availableProducts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setProductSearch(query);
    setFilteredProducts(
      availableProducts.filter((product) =>
        product.name.toLowerCase().includes(query)
      )
    );
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

  const applySort = (dataToSort: Bill[], sortBy: string) => {
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
    setModalVisible(true);
  };
  const removeProduct = (index: number) => {
    setSelectedProducts1((prevProducts) =>
      prevProducts.filter((_, i) => i !== index)
    );
  };
  const addProduct = (product: Product) => {
    setSelectedProducts1((prev) => [
      ...prev,
      { ...product, quantity: 1, total: product.price },
    ]);
  };

  const updateQuantity = (index: number, quantity: number) => {
    setSelectedProducts1((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, quantity, total: p.price * quantity } : p
      )
    );
  };
  const updateSize = (index: number, newSize: string) => {
    setSelectedProducts1((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, size: newSize } : product
      )
    );
  };

  const calculateSubtotal = () =>
    selectedProducts1.reduce((sum, p) => sum + p.total, 0);

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
        <button onClick={() => setModalVisible1(true)} style={styles.button}>
          Crear Nueva Factura
        </button>
      </div>

      <div className="cards-container">
        {cardsData.map((card, index) => (
          <SalesCard
            key={index}
            label={card.label}
            amount={
              index === 0
                ? String(dataSales?.ventasTotales)
                : index === 1
                ? String(dataSales?.ventasMensuales)
                : index === 2
                ? String(dataSales?.ventasSemana)
                : String(dataSales?.ventasHoy)
            }
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
                      cursor: "pointer",
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
        onClose={() => setModalVisible(false)}
        products={selectedProducts1}
      />
      {modalVisible1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={styles.overlay}
        >
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            style={styles.modal}
          >
            {/* Modal de nueva factura */}

            <div className="modal-content">
              <button
                onClick={() => setModalVisible1(false)}
                style={{ width: 20 }}
              >
                X
              </button>
              <div className="flex justify-between mb-6">
                <h1 className="text-lg font-bold" style={{ margin: 0 }}>
                  Factura
                </h1>
                <div className="text-gray-700">
                  <div>Fecha: {new Date().toLocaleDateString()}</div>
                </div>
              </div>
              <h3>Seleccionar productos</h3>
              <div
                className="product-search"
                style={{ position: "relative", width: "100%" }}
              >
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Buscar productos"
                  style={{
                    padding: "8px",
                    borderRadius: "4px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />

                {productSearch && (
                  <motion.div
                    className="search-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute", // Posiciona los resultados debajo del input
                      top: "100%", // Asegura que se posicione debajo del input
                      left: 0,
                      backgroundColor: "white",
                      width: "100%",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 100,
                      maxHeight: "200px", // Para evitar que los resultados se expandan demasiado
                      overflowY: "auto", // Agrega scroll si hay demasiados resultados
                      marginTop: "4px", // Espacio entre el input y los resultados
                    }}
                  >
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) => (
                        <motion.div
                          key={index}
                          className="product-suggestion"
                          onClick={() => addProduct(product)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            padding: "10px",
                            cursor: "pointer",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          {product.name} - ${product.price}
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          padding: "10px",
                          fontStyle: "italic",
                          color: "#aaa",
                        }}
                      >
                        No hay resultados
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Muestra de productos seleccionados y subtotal */}
              <div className="invoice">
                <div className="mb-8">
                  <h2 className="text-lg font-bold mb-4" style={{ margin: 0 }}>
                    Factura para:
                  </h2>
                  <div className="text-gray-700 mb-2">Nombre del cliente</div>
                  <div
                    className="text-gray-700 mb-2"
                    style={{ marginBottom: 30 }}
                  >
                    test@gmail.com
                  </div>
                </div>
                <center>
                  <div
                    style={{
                      maxHeight: "200px", // Ajusta este valor según el espacio disponible
                      overflowY: "auto", // Permite el desplazamiento vertical
                      marginBottom: "16px", // Espaciado opcional
                    }}
                  >
                    <table
                      className="w-full mb-8"
                      style={{
                        borderCollapse: "collapse",
                        width: "100%",
                        border: "1px solid #ccc",
                      }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: "#f5f5f5" }}>
                          <th
                            className="text-left font-bold text-gray-700"
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Descripción
                          </th>
                          <th
                            className="text-right font-bold text-gray-700"
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Precio
                          </th>
                          <th
                            className="text-center font-bold text-gray-700"
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Cantidad
                          </th>
                          <th
                            className="text-center font-bold text-gray-700"
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Talla
                          </th>
                          <th
                            className="text-center font-bold text-gray-700"
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProducts1.map((product, index) => (
                          <tr key={index} style={{ border: "1px solid #ccc" }}>
                            <td
                              className="text-left text-gray-700"
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              {product.name}
                            </td>
                            <td
                              className="text-right text-gray-700"
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              ${(product.quantity * product.price).toFixed(2)}
                            </td>
                            <td
                              className="text-center"
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              <input
                                type="number"
                                value={product.quantity}
                                min="1"
                                onChange={(e) =>
                                  updateQuantity(index, Number(e.target.value))
                                }
                                className="border p-1 w-16"
                                style={{ textAlign: "center" }}
                              />
                            </td>
                            <td
                              className="text-center"
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              <select
                                value={product.sizes}
                                onChange={(e) =>
                                  updateSize(index, e.target.value)
                                }
                                className="border p-1"
                              >
                                {product.sizes.map((size, i) => (
                                  <option key={i} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td
                              className="text-center"
                              style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                              }}
                            >
                              <button
                                onClick={() => removeProduct(index)}
                                className="text-red-500 hover:text-red-700"
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{ backgroundColor: "#f5f5f5" }}>
                          <td
                            className="text-left font-bold text-gray-700"
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            Total
                          </td>
                          <td
                            className="text-right font-bold text-gray-700"
                            style={{
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            ${calculateSubtotal()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </center>
              </div>

              <div style={{ margin: 30 }}>
                <h4>Gran Total: ${calculateSubtotal()}</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  position: "absolute",
                  alignItems: "center",
                  right: 0,
                  bottom: 0,
                  marginRight: 10,
                  gap: 20,
                }}
              >
                <button
                  className="cancel-button"
                  onClick={() => setModalVisible1(false)}
                >
                  Cancelar
                </button>
                <button
                  className="save-button"
                  onClick={() => {
                    console.log(selectedProducts1);
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
const styles = {
  button: {
    padding: "8px 16px",
    cursor: "pointer",
    margin: "10px",
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
  },
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Increased opacity for better contrast
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999, // Ensure it's above other elements
  },
  modal: {
    padding: "20px",
    borderRadius: "8px",
    maxHeight: "100vh",
    height: "auto",
    textAlign: "center" as const,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "8px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  productList: {
    maxHeight: "120px", // Set max height
    overflowY: "auto", // Make it scrollable if content overflows
    marginBottom: "15px",
    fontSize: "14px",
  },
  product: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 0",
    cursor: "pointer",
  },
  addButton: {
    padding: "5px 10px",
    cursor: "pointer",

    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "13px",
  },
  selectedProducts: {
    maxHeight: "120px", // Set max height
    overflowY: "auto", // Make it scrollable if content overflows
    marginBottom: "15px",
    fontSize: "14px",
  },
  selectedProduct: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  quantityInput: {
    width: "40px",
    marginRight: "10px",
    fontSize: "14px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  summary: {
    marginTop: "15px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: "15px",
    padding: "8px 16px",
    cursor: "pointer",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
  },
};

export default Histories;
