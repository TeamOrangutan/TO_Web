import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grow,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../../assets/user/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../Api/user/authApi";

export const Register = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contrasena !== formData.confirmarContrasena) {
      showMessage("Las contraseñas no coinciden.", "error");

      return;
    }

    try {
      const data = await register(
        formData.nombres,
        formData.apellidos,
        formData.correo,
        formData.direccion,
        formData.contrasena
      );

      showMessage(data.message, "success");
    setTimeout(() => {
      navigate("/");
    }, 1500);
    } catch (error) {
      const mensaje =
        error?.response?.data?.error || "Error al registrar el usuario.";
      showMessage(mensaje, "error");
    }
  };

  return (
    <div>
      <Grow in={true} timeout={1000}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Box
            sx={{
              width: { xs: "90%", sm: 400 },
              p: { xs: 3, sm: 4 },
              textAlign: "center",
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo Primal Garage"
              sx={{
                position: "absolute",
                top: { xs: 16, sm: 22 },
                left: { xs: "50%", sm: 74 },
                transform: { xs: "translateX(-50%)", sm: "none" },
                width: { xs: 80, sm: 100 },
              }}
            />

            <Typography variant="h4" fontWeight="bold" color="gray.800" mb={2}>
              Crea una nueva cuenta
            </Typography>

            <Grow in={true} timeout={800}>
              <Box
                component="form"
                display="flex"
                flexDirection="column"
                gap={2}
                onSubmit={handleSubmit}
              >
                <TextField
                  label="Nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Correo electrónico"
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Confirmar contraseña"
                  type="password"
                  name="confirmarContrasena"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "black" }}
                >
                  Registrarse
                </Button>
              </Box>
            </Grow>
          </Box>
        </Box>
      </Grow>
      <Snackbar
        sx={{ mt: 8 }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={messageType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
