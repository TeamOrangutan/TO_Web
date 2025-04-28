import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function SelectOrdenarHistorial({ order, setorder, handleOpen, open }) {
  const handleChange = (event) => {
    setorder(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-controlled-open-select-label">Ordenar por</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={order}
          label="Order"
          onChange={handleChange}
          sx={{ height: 41, mt: 1, borderRadius: 0 }}
        >
          <MenuItem value="">Ninguno</MenuItem>
          <MenuItem value="Fecha">Fecha</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ height: 40, mt: 2, ml: 4, backgroundColor: "black" }}
        onClick={handleOpen}
      >
        Nueva Factura
      </Button>
    </div>
  );
}
