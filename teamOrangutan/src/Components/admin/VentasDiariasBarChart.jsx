import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme, useMediaQuery, Box, Typography } from "@mui/material";

export const VentasDiariasBarChart = ({ ventasDiarias }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


if (!ventasDiarias || ventasDiarias.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          py: 4,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No hay datos de ventas diarias disponibles.
        </Typography>
      </Box>
    );
  }

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