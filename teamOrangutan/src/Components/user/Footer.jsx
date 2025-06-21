import { Box, Typography, IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X"; // Este ícono no existe por defecto
// Así que usaremos Twitter y lo personalizamos visualmente
import TwitterIcon from "@mui/icons-material/Twitter";

export const Footer = () => {
  return (
    <>
      <Box sx={{ py: 3, textAlign: "center", backgroundColor: "black", mt: 20 }}>
        {/* Íconos */}
        <Box sx={{ mb: 1 }}>
          <IconButton
            href="https://www.instagram.com/kaiz_orangutan/"
            target="_blank"
            rel="noopener"
            sx={{ color: "white" }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            href="https://www.facebook.com/KaizOrangutan"
            target="_blank"
            rel="noopener"
            sx={{ color: "white" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://x.com/Kaiz_orangutan"
            target="_blank"
            rel="noopener"
            sx={{ color: "white" }}
          >
            <TwitterIcon sx={{ transform: "scaleX(-1)" }} /> 
          </IconButton>
        </Box>

        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} Team Orangután. Todos los derechos reservados.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
