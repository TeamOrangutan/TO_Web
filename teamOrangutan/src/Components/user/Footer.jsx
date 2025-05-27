import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <>
      <Box sx={{ py: 3, textAlign: "center", backgroundColor: "black", mt:20 }}>
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} Team orangutan. Todos los derechos
          reservados.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
