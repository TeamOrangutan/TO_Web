import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Modal,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import CustomTypography from "../CustomTypography";
import { createInvoice } from "../../../Api/user/invoice";

export const ModalAddInvoice = ({
  handleClose,
  open,
  productos,
  addProductToInvoice,
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
  });

  // Maneja selección del checkbox
  const handleProductSelect = (productoPk) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.producto_pk === productoPk);

      if (exists) {
        return prev.filter((p) => p.producto_pk !== productoPk);
      } else {
        return [...prev, { producto_pk: productoPk, cantidad: 1 }];
      }
    });
  };

  // Maneja el cambio de cantidad para cada producto seleccionado
  const handleCantidadChange = (productoPk, nuevaCantidad) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.producto_pk === productoPk
          ? { ...p, cantidad: Number(nuevaCantidad) }
          : p
      )
    );
  };

  const handleSubmit = async () => {
    console.log(selectedProducts);

    // addProductToInvoice(selectedProducts);
    const response = await createInvoice(selectedProducts, cliente);
    console.log(response);

    handleClose();
    setSelectedProducts([]); // Reset después de guardar
  };

  const isSelected = (productoPk) =>
    selectedProducts.some((p) => p.producto_pk === productoPk);

  const getCantidad = (productoPk) => {
    const found = selectedProducts.find((p) => p.producto_pk === productoPk);
    return found?.cantidad || 1;
  };

  return (
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
      width: 500,
      maxHeight: "80vh", // Alto máximo del modal
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box sx={{display: 'flex', justifyContent: 'center', mb: 3}} >

      <Typography variant="h6" fontWeight='bold' >NUEVA FACTURA</Typography>
    </Box>

<Box sx={{display: 'flex', justifyContent: 'space-between'}} >

<Box sx={{ mb: 2 }}>
  <Typography fontWeight="bold" gutterBottom>
    Nombre
  </Typography>
  <TextField
    placeholder="Nombre"
    value={cliente.nombre}
    onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
    size="small"
    fullWidth
    InputProps={{ sx: { height: 40 } }}
  />
</Box>

<Box sx={{ mb: 2 }}>
  <Typography fontWeight="bold" gutterBottom>
    Apellido
  </Typography>
  <TextField
    placeholder="Apellido"
    value={cliente.apellido}
    onChange={(e) => setCliente({ ...cliente, apellido: e.target.value })}
    size="small"
    fullWidth
    InputProps={{ sx: { height: 40 } }}
  />
</Box>

</Box>

    {/* Contenido con scroll */}
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <CustomTypography text={"AGREGAR PRODUCTOS"} />
    </Box>
    <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
      <Grid container spacing={2}>
        {productos.map((producto) => (
          <Grid item xs={12} key={producto.id}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected(producto.id)}
                    onChange={() => handleProductSelect(producto.id)}
                  />
                }
                label={producto.name}
                sx={{ flex: 1 }}
              />
              <TextField
                type="number"
                size="small"
                label="Cantidad"
                disabled={!isSelected(producto.id)}
                value={getCantidad(producto.id)}
                onChange={(e) =>
                  handleCantidadChange(producto.id, e.target.value)
                }
                sx={{ width: 100 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>

    {/* Botones fijos abajo */}
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
      <Button variant="outlined" onClick={handleClose}>
        Cancelar
      </Button>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ ml: 2, backgroundColor: "black", color: "white" }}
      >
        Guardar
      </Button>
    </Box>
  </Box>
</Modal>

  );
};

export default ModalAddInvoice;
