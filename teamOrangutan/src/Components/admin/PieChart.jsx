import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

// Puedes definir los colores aquí o recibirlos por props
export const PRODUCT_COLORS = [
  "#36A2EB", // azul
  "#FF6384", // rojo
  "#9966FF", // morado
  "#FFCE56", // amarillo
  "#4BC0C0", // verde agua
  "#FF9F40", // naranja
  "#8DD1E1", // celeste
  "#D4A6C8", // lila
  "#C9CBCF", // gris
  "#B5E7A0", // verde claro
];

export const PieChartProductos = ({
  productosAnalisis,
  colors = PRODUCT_COLORS,
}) => {
  if (!Array.isArray(productosAnalisis)) {
    return <div>No hay datos de productos para mostrar.</div>;
  }

  const data = productosAnalisis.map((producto, index) => ({
    id: index,
    value: producto.porcentaje,
    label: producto.nombreProducto,
    color: colors[index % colors.length], // asigna color por índice
  }));

  return (
    <PieChart
      series={[
        {
          data,
          arcLabel: (item) => `${item.value.toFixed(2)}%`,
          arcLabelMinAngle: 35,
          arcLabelRadius: "50%",
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          // Asigna los colores a los segmentos
          color: colors,
        },
      ]}
      width={200}
      height={200}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
          fill: "white",
        },
      }}
      legend={{
        direction: "row",
        position: { vertical: "bottom", horizontal: "middle" },
      }}
    />
  );
};
