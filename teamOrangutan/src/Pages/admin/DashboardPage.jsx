import { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Grow,
  Button,
  Modal,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { WelcomeScreen } from "../../Components/admin/WelcomeScreen";
import { getProfile } from "../../Api/user/profile";
import SideBar from "../../Components/admin/SideBar";
import { generarReporte, getStats } from "../../Api/user/stats";
import { VentasDiariasBarChart } from "../../Components/admin/VentasDiariasBarChart";
import TableOrders from "../../Components/admin/TableOrders";
import { OrdenesCompra } from "../../Components/admin/OrdenesCompra";
import TopBar from "../../Components/admin/TopBar";
import { useSpring, animated } from "@react-spring/web";
import { GestionProductos } from "../../Components/admin/GestionProductos";
import ModalPdf from "../../Components/admin/ModalPdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import GestionUsuarios from "../../Components/admin/GestionUsuarios";
import Ajustes from "../../Components/admin/Ajustes";

export const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [stats, setStats] = useState({});
  const [selectedOption, setSelectedOption] = useState("Dashboard");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [loadingReporte, setLoadingReporte] = useState(false);
  const [reporteQuincenal, setreporteQuincenal] = useState(null);

  const pdfRef = useRef();
  const pieChartRef = useRef();
  const barChartRef = useRef();

  const handlePrintPDF = async () => {
    // 1. Captura los gráficos como imágenes
    const pieChartNode = pieChartRef.current;
    const barChartNode = barChartRef.current;

    // Guarda los gráficos originales
    const originalPie = pieChartNode.innerHTML;
    const originalBar = barChartNode.innerHTML;

    // Captura imágenes
    const pieCanvas = await html2canvas(pieChartNode, {
      scale: 2,
      useCORS: true,
    });
    const pieImg = pieCanvas.toDataURL("image/png");
    const barCanvas = await html2canvas(barChartNode, {
      scale: 2,
      useCORS: true,
    });
    const barImg = barCanvas.toDataURL("image/png");

    // 2. Reemplaza los gráficos por imágenes en el DOM
    pieChartNode.innerHTML = `<img src="${pieImg}" style="width:100%;" />`;
    barChartNode.innerHTML = `<img src="${barImg}" style="width:100%;" />`;

    // 3. Genera el PDF con el reporte completo (incluyendo las imágenes)
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    await doc.html(pdfRef.current, {
      callback: function (doc) {
        doc.save(`reporte-${reporteQuincenal?.codigo || "sin-folio"}.pdf`);
      },
      margin: [20, 20, 20, 20],
      autoPaging: "text",
      x: 0,
      y: 0,
      html2canvas: {
        scale: 0.6,
      },
    });

    // 4. Restaura los gráficos originales en el DOM
    pieChartNode.innerHTML = originalPie;
    barChartNode.innerHTML = originalBar;
  };
  const ventasDiariasAnim = useSpring({
    number: Number(stats.totalDiario) || 0,
    from: { number: 0 },
  });
  const ventasSemanalesAnim = useSpring({
    number: Number(stats.totalSemanal) || 0,
    from: { number: 0 },
  });
  const ventasMensualesAnim = useSpring({
    number: Number(stats.totalMensual) || 0,
    from: { number: 0 },
  });
  const ventasTotalesAnim = useSpring({
    number: Number(stats.ventasTotales) || 0,
    from: { number: 0 },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser(data);

        const hasVisited = localStorage.getItem("hasVisitedDashboard");
        if (!hasVisited) {
          setShowWelcome(true);
          localStorage.setItem("hasVisitedDashboard", "true");
        }
      } catch (error) {
        console.error("Error cargando el perfil:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data.data);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };

    fetchUser();
    fetchStats();
  }, []);

  const handleGenerarReporte = async () => {
    setModalAbierto(true);

    if (reporteQuincenal) {
      setLoadingReporte(false);
      return;
    }
    setLoadingReporte(true);

    try {
      const data = await generarReporte();
      setreporteQuincenal(data);
    } catch (error) {
      return console.error("Error al generar reporte:", error);
    }
    setLoadingReporte(false);
  };

  if (!user) return null;

  if (showWelcome) {
    return (
      <WelcomeScreen
        onFinish={() => setShowWelcome(false)}
        adminName={user.persona.nombres}
      />
    );
  }

  const resumenStats = [
    {
      label: "Ventas Diarias",
      value: ventasDiariasAnim.number,
      icon: <CalendarTodayIcon fontSize="large" />,
    },
    {
      label: "Ventas Semanales",
      value: ventasSemanalesAnim.number,
      icon: <DateRangeIcon fontSize="large" />,
    },
    {
      label: "Ventas Mensuales",
      value: ventasMensualesAnim.number,
      icon: <BarChartIcon fontSize="large" />,
    },
    {
      label: "Ventas Totales",
      value: ventasTotalesAnim.number,
      icon: <MonetizationOnIcon fontSize="large" />,
    },
  ];

  return (
    <Box>
      <Grow in timeout={1000}>
        <Box display="flex">
          <SideBar
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <Box
            flexGrow={1}
            p={{ xs: 1, sm: 3 }}
            bgcolor="#F9FAFB"
            sx={{
              width: { xs: "100vw", md: "50%" },
              marginX: "auto",
              minHeight: "100vh",
              boxSizing: "border-box",
              overflowX: "hidden",
            }}
          >
            {selectedOption === "Dashboard" && (
              <>
                <Grid container spacing={2}>
                  {/* {resumenStats.map((venta, index) => (
                    <Grid item xs={12} md={3} key={index}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          border: "2px solid #F1EEFD",
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
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                            >
                              {venta.label}
                            </Typography>
                            <Typography variant="h5" fontWeight="bold">
                              <animated.span>
                                {venta.value.to((n) => `${n.toFixed(2)} $`)}
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
                  ))} */}

                  {stats.ventasDiarias && (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography variant="h6" gutterBottom>
                Ventas Diarias (últimos días)
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-end" },
                }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  sx={{
                    mb: 2,
                    backgroundColor: "#007aff",
                    color: "#fff",
                    width: { xs: "100%", sm: "auto" },
                  }}
                  onClick={() => handleGenerarReporte()}
                >
                  <DescriptionOutlinedIcon sx={{ mr: 1 }} /> Generar
                  reporte (15 dias)
                </Button>
              </Box>
              <VentasDiariasBarChart ventasDiarias={stats.ventasDiarias} />
            </Paper>
          </Grid>
        )}
                </Grid>
                <TableOrders />

                <ModalPdf
                  open={modalAbierto}
                  onClose={() => setModalAbierto(false)}
                  reporteQuincenal={reporteQuincenal}
                  loading={loadingReporte}
                  pdfRef={pdfRef}
                  onPrint={handlePrintPDF}
                  pieChartRef={pieChartRef}
                  barChartRef={barChartRef}
                />
              </>
            )}
            {selectedOption === "Órdenes de compra" && <OrdenesCompra />}

            {selectedOption === "Productos" && <GestionProductos />}
            {selectedOption === "Ver usuarios" && <GestionUsuarios />}
            {selectedOption === "Ajustes" && <Ajustes />}
          </Box>
        </Box>
      </Grow>
    </Box>
  );
};

export default DashboardPage;
