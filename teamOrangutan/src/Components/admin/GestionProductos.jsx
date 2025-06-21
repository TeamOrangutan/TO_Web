import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useSpring, animated } from "@react-spring/web";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { resumenInvetario } from "../../Api/user/productsApi";
import FilterListIcon from "@mui/icons-material/FilterList";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SortIcon from "@mui/icons-material/Sort";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ListProducts from "./ListProducts";
import SearchIcon from "@mui/icons-material/Search";
import useModal from "../../hooks/useModal";
import ModalAgregarProducto from "../../Components/user/Products/ModalAgregarProducto";

const style = {
  position: "absolute",
  top: "49%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  width: { xs: "90%", sm: 600, md: 750, lg: 850 },
  borderRadius: 3,
  maxHeight: "85vh",
  overflowY: "auto",
};

export const GestionProductos = () => {
  const { open2, handleClose2, handleOpen2 } = useModal();
  const [refreshProducts, setRefreshProducts] = useState(false);

  const handleProductAdded = () => {
    setRefreshProducts((prev) => !prev);
  };
  const [Stats, setStats] = useState([]);
  const [filtroEstado, setfiltroEstado] = useState("Todos");
  const [order, setorder] = useState("Ninguno");
  const [open, setOpen] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");

  const handleChange = (event) => {
    setorder(event.target.value);
    console.log(order);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await resumenInvetario();
        setStats(data);
      } catch (error) {
        console.error("Error :", error);
      }
    };
    fetch();
  }, []);

  console.log(Stats);

  const TotalProductsAnim = useSpring({
    number: Number(Stats.totalProductos) || 0,
    from: { number: 0 },
  });
  const TotalDisponiblesAnim = useSpring({
    number: Number(Stats.disponibles) || 0,
    from: { number: 0 },
  });
  const TotalAgotadosAnim = useSpring({
    number: Number(Stats.agotados) || 0,
    from: { number: 0 },
  });
  //   const ventasTotalesAnim = useSpring({
  //     number: Number(Stats.ventasTotales) || 0,
  //     from: { number: 0 },
  //   });

  const resumenStats = [
    {
      label: "Total Productos",
      value: TotalProductsAnim.number,
      icon: <Inventory2OutlinedIcon fontSize="large" />,
    },
    {
      label: "Disponibles",
      value: TotalDisponiblesAnim.number,
      icon: <CheckCircleOutlinedIcon fontSize="large" />,
    },
    {
      label: "Agotados",
      value: TotalAgotadosAnim.number,
      icon: <ErrorOutlineOutlinedIcon fontSize="large" />,
    },
    // {
    //   label: "Valor inventario",
    //   value: TotalFalladas.number,
    //   icon: <MonetizationOnIcon fontSize="large" />,
    // },
  ];

  return (
    <Box flex={1} display="flex" flexDirection="column">
      {/* TopBar */}
      <TopBar selectedOption={"Productos"} />

      {/* Contenido */}
      <Box bgcolor="#F9FAFB" px={3} py={0} mt={0}>
        <Grid container spacing={2}>
          {resumenStats.map((venta, index) => (
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
                    <Typography variant="subtitle2" color="textSecondary">
                      {venta.label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      <animated.span>
                        {venta.value.to((n) => n.toFixed(0))}
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
        </Grid>
        <Box
          sx={{
            border: "2px solid #F1EEFD",
            mt: 5,
            p: 3,
            backgroundColor: "white",
          }}
        >
          <Typography fontWeight="bold" variant="h5">
            Inventario de productos
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "end", mr: 10 }}>
            <Button
              variant="contained"
              sx={{
                height: 40,
                mt: { xs: 0, sm: 2 },
                backgroundColor: "black",
              }}
              onClick={handleOpen2}
            >
              Añadir Producto
            </Button>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mt={3}
            alignItems="center"
          >
            <TextField
              label="Buscar producto"
              variant="outlined"
              size="small"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              sx={{ width: 400 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl size="small" sx={{ width: 270 }}>
              <InputLabel id="ordenar-select-label">Ordenar por</InputLabel>
              <Select
                labelId="ordenar-select-label"
                id="ordenar-select"
                value={order}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    label="Ordenar por"
                    startAdornment={
                      <InputAdornment position="start">
                        <CalendarMonthOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    }
                  />
                }
              >
                <MenuItem value="Ninguno">Ninguno</MenuItem>
                <MenuItem value="Fecha">Fecha</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel id="estado-select-label">Estado</InputLabel>
              <Select
                labelId="estado-select-label"
                id="estado-select"
                label="Estado"
                defaultValue="Todos"
                value={filtroEstado}
                onChange={(e) => setfiltroEstado(e.target.value)}
                input={
                  <OutlinedInput
                    label="Estado"
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterAltOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    }
                  />
                }
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="Disponible">Disponible</MenuItem>
                <MenuItem value="Agotado">Agotado</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <ListProducts
            filtroEstado={filtroEstado}
            filtroNombre={filtroNombre}
            order={order}
            refresh={refreshProducts}
            onProductAdded={handleProductAdded}
          />
        </Box>
        <ModalAgregarProducto
          style={style}
          open={open2}
          onProductAdded={handleProductAdded}
          handleClose={handleClose2}
          handleOpen={handleOpen2}
        />
      </Box>
    </Box>
  );
};
