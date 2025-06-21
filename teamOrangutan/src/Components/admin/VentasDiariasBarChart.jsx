import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export const VentasDiariasBarChart = ({ ventasDiarias }) => {
  const fechas = ventasDiarias?.map((v) =>
    new Date(v.fecha).toLocaleDateString()
  );
  const totales = ventasDiarias?.map((v) => v.total || v.totalVentas);

  return (
    <BarChart
      xAxis={[{ data: fechas, scaleType: "band", label: "Fecha" }]}
      series={[{ data: totales, label: "Ventas Diarias ($)" }]}
      yAxis={[
        {
          label: "Monto ($)",
          tickLabelStyle: { fontSize: 12 },
        },
      ]}
      height={300}
    />
  );
};
