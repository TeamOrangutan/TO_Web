import { Box, Typography, TextField, Button, Link } from "@mui/material";
import logo from "../../../assets/user/logo2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/user/context/AuthContext";
import useLogin from "../../../hooks/useLogin";

export const LoginPage = () => {
  const { userData, handleChange, handleSubmit } = useLogin();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        width={377}
        p={4}
        textAlign="center"
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo Primal Garage"
          sx={{ position: "absolute", top: 22, left: 74, width: 100 }}
        />

        <Typography variant="h4" fontWeight="bold" color="gray.800" mb={2}>
          Bienvenido a Primal Garage
        </Typography>
        <Typography variant="body2" color="gray.600" mb={4}>
          Colaboración eficiente y productiva. Todo en un solo lugar.
        </Typography>

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Correo"
            type="email"
            name="correo"
            variant="outlined"
            fullWidth
            value={userData.correo}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            type="password"
            name="contrasena"
            variant="outlined"
            fullWidth
            value={userData.contrasena}
            onChange={handleChange}
          />

          <Box textAlign="right">
            <Link href="#" color="primary" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>

          <Button
            variant="contained"
            sx={{ backgroundColor: "black" }}
            type="submit"
            fullWidth
          >
            Iniciar sesión
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
