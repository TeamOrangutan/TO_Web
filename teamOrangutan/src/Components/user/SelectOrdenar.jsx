import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function SelectOrdenar({order, setorder}) {
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setorder(event.target.value);
    console.log(order)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div  >
     
      <FormControl sx={{ m: 1, width: 270 }}>
        <InputLabel id="demo-controlled-open-select-label">Ordenar por</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={order}
          label="Order"
          onChange={handleChange}
          sx={{height: 41, mt: 1, borderRadius: 0}}
        >
          
          <MenuItem value="">Ninguno</MenuItem>
          <MenuItem value="Fecha">Fecha</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
