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

      const yaExiste = tallasSeguras.some(
        (talla) => talla.name === nuevaTalla.name
      );
      if (yaExiste) {
        showMessage("Ya existe una talla con ese nombre", "error");
        return tallasSeguras;
      }

      if (
        nuevaTalla.stock === "" ||
        isNaN(nuevaTalla.stock) ||
        nuevaTalla.stock <= 0
      ) {
        showMessage("Ingresa una cantidad válida mayor que 0.", "error");
        return tallasSeguras;
      }

      const nuevasTallas = [...tallasSeguras, nuevaTalla];
      agregarTallas(nuevaTalla);
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
            p: 4,
            width: 450, // Ajuste de ancho para mejor visualización
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Selección de Tallas y Cantidades
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ width: "50%" }}>
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
                    sx={{ width: 130, height: 40, mt: 1 }}
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

            <Box sx={{ width: "70%", mt: 1 }}>
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
                  height: 35, // Ajusta la altura del TextField
                  "& .MuiOutlinedInput-root": {
                    height: 40, // Ajusta la altura de la caja de entrada
                    fontSize: "14px", // Reduce el tamaño del texto dentro del input
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button variant="outlined" color="black" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ ml: 2, backgroundColor: "black", color: "white" }}
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
