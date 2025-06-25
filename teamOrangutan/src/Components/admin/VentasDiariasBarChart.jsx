import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme, useMediaQuery, Box } from "@mui/material";

export const VentasDiariasBarChart = ({ ventasDiarias }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fechas = ventasDiarias?.map((v) =>
    new Date(v.fecha).toLocaleDateString()
  );
  const totales = ventasDiarias?.map((v) => v.total || v.totalVentas);

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <BarChart
        xAxis={[{ data: fechas, scaleType: "band", label: "Fecha" }]}
        series={[{ data: totales, label: "Ventas Diarias ($)" }]}
        yAxis={[
          {
            label: "Monto ($)",
            tickLabelStyle: { fontSize: 12 },
          },
        ]}
        height={isMobile ? 220 : 300}
        width={isMobile ? Math.max(400, fechas.length * 60) : undefined}
      />
    </Box>
  );
};