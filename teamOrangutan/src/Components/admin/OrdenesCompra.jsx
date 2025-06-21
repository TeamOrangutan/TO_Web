import { Box, Grid, Paper, Typography } from "@mui/material";
import TopBar from "./TopBar";
import { getResumeOrdenes } from "../../Api/user/ordenes";
import { useEffect, useState } from "react";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useSpring, animated } from "@react-spring/web";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { getStats } from "../../Api/user/stats";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import TableOrders from "./TableOrders";
export const OrdenesCompra = () => {
  const [Orders, setOrders] = useState([]);
  const [Stats, setStats] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getResumeOrdenes();
        const data2 = await getStats();
        setStats(data2.data);
        setOrders(data.data);
      } catch (error) {
        console.error("Error :", error);
      }
    };
    fetchOrders();
  }, []);

  console.log(Stats);

  const completadas = Orders.filter((o) => o.estado === "COMPLETED").length;
  const falladas = Orders.filter((o) => o.estado === "FAILED").length;

  const TotalOrdenessAnim = useSpring({
    number: Number(Orders.length) || 0,
    from: { number: 0 },
  });
  const TotalCompletadasAnim = useSpring({
    number: Number(completadas) || 0,
    from: { number: 0 },
  });
  const TotalFalladas = useSpring({
    number: Number(falladas) || 0,
    from: { number: 0 },
  });
  const ventasTotalesAnim = useSpring({
    number: Number(Stats.ventasTotales) || 0,
    from: { number: 0 },
  });

  const resumenStats = [
    {
      label: "Total Ordenes",
      value: TotalOrdenessAnim.number,
      icon: <LocalGroceryStoreOutlinedIcon fontSize="large" />,
    },
    {
      label: "Completadas",
      value: TotalCompletadasAnim.number,
      icon: <CheckCircleOutlinedIcon fontSize="large" />,
    },
    {
      label: "Falladas",
      value: TotalFalladas.number,
      icon: <AccessTimeOutlinedIcon fontSize="large" />,
    },
    {
      label: "Ingresos Totales",
      value: ventasTotalesAnim.number,
      icon: <SavingsOutlinedIcon fontSize="large" />,
    },
  ];

  return (
    <Box flex={1} display="flex" flexDirection="column" sx={{width: "auto"}}>
      {/* TopBar */}
      <TopBar selectedOption={"Órdenes de compra"} />

      {/* Contenido */}
      <Box bgcolor="#F9FAFB" px={3} py={0} mt={0}>
        <Grid container spacing={2}>
          {resumenStats.map((venta, index) => (
            <Grid 
            item xs={12} md={3} key={index}>
              <Paper
                
                sx={{
                  p: 2,
                  border: "1px solid #F1EEFD",
                  transition:
                    "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {venta.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      <animated.span>
                                {venta.value.to((n) =>
                               venta.label === "Ingresos Totales"
                                ?  `${n.toFixed(2)} $`
                                :
                                n.toFixed(0)
                             )}
                              
                              </animated.span>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      p: 1.2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {venta.icon}
                  </Box>

                </Box>
              </Paper>
            </Grid>
          ))}
          <TableOrders   />
        </Grid>
      </Box>
    </Box>
  );
};
