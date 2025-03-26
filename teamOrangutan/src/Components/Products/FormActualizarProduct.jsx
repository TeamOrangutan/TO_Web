import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ImageProductActualizar from "./ImageProductActualizar";
import { useNavigate } from "react-router-dom";

export const FormActualizarProduct = () => {
    const navigate =useNavigate()

    const handleBack = () => {
         navigate('/products')
     }
 
  const [estado, setEstado] = useState("");

  const handleChange = (event) => {
    setEstado(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          px: 10,
          mt: 5,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 0, right: 0, left: 500 }}>
          <Typography variant="h4">NO QUIERE PRENDER</Typography>
          <TextField
            name="preciodeVenta"
            // value={formData.preciodeVenta}
            // onChange={handleInputChange}
            type="number"
            variant="standard"
            InputProps={{
              startAdornment: (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    mr: 0.5,
                  }}
                >
                  C$
                </Typography>
              ),
              disableUnderline: true,
              sx: {
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "left",
                width: "160px",
                mt: 3,
              },
            }}
            sx={{
              background: "transparent",
              border: "none",
              "& input": {
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "24px",
              },
            }}
          />
          <Box sx={{ width: 790, mt: 3 }}>
            <Typography>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
              unde placeat asperiores hic, impedit perferendis voluptatibus
              officia voluptatum harum alias, repellat, quae magnam aliquid
              ratione? Alias assumenda tempore error officia?
            </Typography>
          </Box>
          <Box mt={1} sx={{ display: "flex", gap: 6, mt: 5 }}>
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={estado}
                label="estado"
                onChange={handleChange}
              >
                <MenuItem value={"agotado"}>Agotado</MenuItem>
                <MenuItem value={"disponible"}>Disponible</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <Box sx={{}}>
                <InputLabel id="demo-simple-select-label" sx={{ fontSize: 17 }}>
                  Talla
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ width: 130 }}
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
        </Box>
            <ImageProductActualizar/>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mr: 5 }}>
          <Button variant="outlined" color="black" onClick={handleBack} >
            Cerrar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ ml: 2, backgroundColor: "black", color: "white" }}
            onClick={handleBack}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormActualizarProduct;
