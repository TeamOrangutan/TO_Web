import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";

export const ModalTallas = ({
  handleClose,
  open,
  settallas,
  agregarTallas,
}) => {
  const [selectedTalla, setselectedTalla] = useState([]);
  const [cantidades, setselectedCantidades] = useState(0);

  const [open2, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleChangeTalla = (event) => {
    setselectedTalla(event.target.value);
  };

  const handleChangeCantidades = (event) => {
    setselectedCantidades(event.target.value);
  };

  const handleSave = () => {
    const nuevaTalla = {
      name: selectedTalla,
      stock: parseInt(cantidades),
    };

    settallas((prevTallas) => {
      const tallasSeguras = Array.isArray(prevTallas) ? prevTallas : [];

      if (
        nuevaTalla.stock === "" ||
        isNaN(nuevaTalla.stock) ||
        nuevaTalla.stock <= 0
      ) {
        showMessage("Ingresa una cantidad válida mayor que 0.", "error");
        return tallasSeguras;
      }

      // Si la talla ya existe, reemplaza el stock
      const yaExiste = tallasSeguras.some(
        (talla) => talla.name === nuevaTalla.name
      );
      let nuevasTallas;
      if (yaExiste) {
        nuevasTallas = tallasSeguras.map((talla) =>
          talla.name === nuevaTalla.name ? nuevaTalla : talla
        );
        showMessage("Talla actualizada con éxito", "success");
      } else {
        nuevasTallas = [...tallasSeguras, nuevaTalla];
        agregarTallas(nuevaTalla);
        showMessage("Talla agregada con éxito", "success");
      }
      return nuevasTallas;
    });
    handleClose();
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);
  };

  return (
    <div>
      <Modal keepMounted open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 2,
            p: { xs: 2, sm: 4 },
            width: { xs: "95vw", sm: 400, md: 450 },
            maxWidth: 500,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Selección de Tallas y Cantidades
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Tallas
              </Typography>

              <FormControl fullWidth>
                <Box>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ fontSize: 17 }}
                  >
                    Tallas
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTalla}
                    onChange={handleChangeTalla}
                    sx={{ width: "100%", height: 40, mt: 1 }}
                    label="Tallas"
                  >
                    <MenuItem value={"Ninguna"}>Ninguna</MenuItem>
                    <MenuItem value={"XS"}>XS</MenuItem>
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                  </Select>
                </Box>
              </FormControl>
            </Box>

            <Box
              sx={{ width: { xs: "100%", sm: "50%" }, mt: { xs: 2, sm: 1 } }}
            >
              <Typography variant="subtitle1" sx={{ mb: 0 }}>
                Cantidades disponibles
              </Typography>

              <TextField
                type="number"
                variant="outlined"
                value={cantidades}
                onChange={handleChangeCantidades}
                sx={{
                  mt: 1,
                  width: "100%",
                  height: 35, // Ajusta la altura del TextField
                  "& .MuiOutlinedInput-root": {
                    height: 40, // Ajusta la altura de la caja de entrada
                    fontSize: "14px", // Reduce el tamaño del texto dentro del input
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: { xs: "center", sm: "right" },
              mt: 3,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: { sm: "flex-end" },
            }}
          >
            {" "}
            <Button variant="outlined" color="black" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: "black",
                color: "white",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Agregar
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        sx={{ mt: 8 }}
        open={open2}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={messageType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ModalTallas;
