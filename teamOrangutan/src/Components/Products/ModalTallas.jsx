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
} from "@mui/material";

export const ModalTallas = ({ handleClose, open }) => {
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
                sx={{
                  mt: 1,
                  height: 35, // Ajusta la altura del TextField
                  "& .MuiOutlinedInput-root": {
                    height: 40, // Ajusta la altura de la caja de entrada
                    fontSize: "14px", // Reduce el tamaño del texto dentro del input
                 
                  },
                }}
                value={0}
              />
            </Box>
          </Box>

          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button variant="outlined" color="black" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ ml: 2, backgroundColor: "black", color: "white" }}
            >
              Agregar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalTallas;
