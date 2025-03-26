import { Box, Typography, TextField, Button, Link } from "@mui/material";
import logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
     
    >
      <Box width={377} p={4} textAlign="center" bgcolor="white" borderRadius={2} boxShadow={3}>
        <Box component="img" src={logo} alt="Logo Primal Garage" sx={{ position: "absolute", top: 22, left: 74, width: 100 }} />
        
        <Typography variant="h4" fontWeight="bold" color="gray.800" mb={2}>
          Bienvenido a Primal Garage
        </Typography>
        <Typography variant="body2" color="gray.600" mb={4}>
          Colaboración eficiente y productiva. Todo en un solo lugar.
        </Typography>
        
        <Box component="form" display="flex" flexDirection="column" gap={2}>
          <TextField label="Correo" type="email" variant="outlined" fullWidth />
          <TextField label="Contraseña" type="password" variant="outlined" fullWidth />
          
          <Box textAlign="right">
            <Link href="#" color="primary" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
          
          <Button variant="contained" sx={{backgroundColor: 'black'}} onClick={handleNavigate}  fullWidth>
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;