import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { InputAdornment, OutlinedInput, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export default function SelectOrdenar({ order, setorder, filtroNombre, setFiltroNombre }) {
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setorder(event.target.value);
  };

  return (
    <div>
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
      </Stack>
    </div>
  );
}