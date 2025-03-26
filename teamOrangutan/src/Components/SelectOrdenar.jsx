import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function SelectOrdenar() {
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div  >
     
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-controlled-open-select-label">Ordenar por</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{height: 41, mt: 1, borderRadius: 0}}
        >
          
          <MenuItem value={10}>Ninguno</MenuItem>
          <MenuItem value={10}>Fecha</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
