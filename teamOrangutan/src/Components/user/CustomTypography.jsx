import { Divider, Typography } from "@mui/material";

const CustomTypography = ({text}) => {
  return (
    <Typography variant="h6" fontWeight={"bold"}>
      {text}
      <Divider
        sx={{
          height: "10px",
          width: "30%", // Controla el tamaño de la línea
          borderColor: "black", // Color de la línea
          marginLeft: "70px", // Espacio entre el título y la línea
        }}
      />
    </Typography>
  );
};

export default CustomTypography;
