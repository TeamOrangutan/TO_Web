import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
import { useSpring, animated } from "@react-spring/web";

export default function CardsHistorial({ ventas }) {
  const [ventasTotalesAnim, setVentasTotalesAnim] = React.useState(0);
  const [ventasMensualesAnim, setVentasMensualesAnim] = React.useState(0);
  const [ventasSemanaAnim, setVentasSemanaAnim] = React.useState(0);
  const [ventasHoyAnim, setVentasHoyAnim] = React.useState(0);

  const animVentasTotales = useSpring({ number: Number(ventasTotalesAnim), from: { number: 0 } });
  const animVentasMensuales = useSpring({ number: Number(ventasMensualesAnim), from: { number: 0 } });
  const animVentasSemana = useSpring({ number: Number(ventasSemanaAnim), from: { number: 0 } });
  const animVentasHoy = useSpring({ number: Number(ventasHoyAnim), from: { number: 0 } });

  React.useEffect(() => {
    setVentasTotalesAnim(ventas.ventasTotales);
    setVentasMensualesAnim(ventas.ventasMensuales);
    setVentasSemanaAnim(ventas.ventasSemana);
    setVentasHoyAnim(ventas.ventasHoy);
  }, [ventas]);

  return (
    <Box sx={{ display: "flex", ml: 29, gap: 3, mt: 4 }}>
      <Card sx={{ width: 201, height: 120, backgroundColor: "black", borderRadius: 0 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom sx={{ color: "white", fontSize: 20 }}>
              Ventas totales
            </Typography>
            <BarChartIcon sx={{ fontSize: 30, ml: 1, color: "white", mb: 1 }} />
          </Box>

          <animated.div>
            <Typography sx={{ color: "white", fontWeight: "bold", fontSize: 26 }}>
              $ <animated.span>{animVentasTotales.number.to(n => n.toFixed(2))}</animated.span>
            </Typography>
          </animated.div>
        </CardContent>
      </Card>

      <Card sx={{ width: 237, height: 120, backgroundColor: "#D9D9D9", borderRadius: 0 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom sx={{ color: "black", fontSize: 20 }}>
              Ventas mensuales
            </Typography>
            <CalendarMonthIcon sx={{ fontSize: 30, ml: 1, color: "#DDDDD", mb: 1 }} />
          </Box>

          <animated.div>
            <Typography sx={{ color: "black", fontWeight: "bold", fontSize: 26 }}>
              $ <animated.span>{animVentasMensuales.number.to(n => n.toFixed(2))}</animated.span>
            </Typography>
          </animated.div>
        </CardContent>
      </Card>

      <Card sx={{ width: 237, height: 120, backgroundColor: "#D9D9D9", borderRadius: 0 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom sx={{ color: "#DDDDD", fontSize: 20 }}>
              Ventas semanales
            </Typography>
            <DateRangeIcon sx={{ fontSize: 30, ml: 1, color: "#DDDDD", mb: 1 }} />
          </Box>
          <Typography sx={{ color: "black", fontWeight: "bold", fontSize: 26 }}>
            $ <animated.span>{animVentasSemana.number.to(n => n.toFixed(0))}</animated.span>
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ width: 198, height: 120, backgroundColor: "#D9D9D9", borderRadius: 0 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom sx={{ color: "#DDDDD", fontSize: 20 }}>
              Ventas de hoy
            </Typography>
            <EventIcon sx={{ fontSize: 30, ml: 1, color: "#DDDDD", mb: 1 }} />
          </Box>
          <Typography sx={{ color: "black", fontWeight: "bold", fontSize: 26 }}>
            $ <animated.span>{animVentasHoy.number.to(n => n.toFixed(2))}</animated.span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
