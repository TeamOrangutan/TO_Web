import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventIcon from '@mui/icons-material/Event';
export default function CardsHistorial() {
  return (
    <Box sx={{ display: "flex", ml: 29, gap: 3, mt: 2 }}>
      <Card sx={{ width: 201, height: 120, backgroundColor: "black", borderRadius: 0,          

      }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom sx={{ color: "white", fontSize: 20 }}>
              Ventas totales
            </Typography>
            <BarChartIcon sx={{ fontSize: 30, ml: 1, color: "white", mb: 1 }} />
          </Box>

          <Typography sx={{ color: "white", fontWeight: "bold", fontSize: 26 }}>
            $ 00,000.00
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: 237, height: 120, backgroundColor: "#D9D9D9", borderRadius: 0  }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom sx={{ color: "black", fontSize: 20 }}>
              Ventas mensuales
            </Typography>
            <CalendarMonthIcon sx={{ fontSize: 30, ml: 1, color: "#DDDDD", mb: 1 }} />
          </Box>

          <Typography sx={{ color: "black", fontWeight: "bold", fontSize: 26 }}>
            $ 00,000.00
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: 237, height: 120, backgroundColor: "#D9D9D9" , borderRadius: 0 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom sx={{ color: "#DDDDD", fontSize: 20 }}>
              Ventas semanales
            </Typography>
            <DateRangeIcon sx={{ fontSize: 30, ml: 1, color: "#DDDDD", mb: 1 }} />
          </Box>

          <Typography sx={{ color: "black", fontWeight: "bold", fontSize: 26 }}>
            $ 00,000.00
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: 198, height: 120, backgroundColor: "#D9D9D9", borderRadius: 0  }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography gutterBottom sx={{ color: "#DDDDD", fontSize: 20 }}>
              Ventas de hoy
            </Typography>
            <EventIcon sx={{ fontSize: 30, ml: 1, color: "#DDDDD", mb: 1 }} />
          </Box>

          <Typography sx={{ color: "black", fontWeight: "bold", fontSize: 26 }}>
            $ 00,000.00
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
