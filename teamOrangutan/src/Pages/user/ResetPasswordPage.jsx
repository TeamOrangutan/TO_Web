import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Grow,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import logo from "../..../../../assets/user/logo2.png";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showMessage("Las contraseñas no coinciden", "error");

      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al cambiar contraseña");
      }

      showMessage(
        "Contraseña cambiada correctamente. Por favor, inicia sesión.",
        "success"
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));

      navigate("/");
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  return (
    <Grow in={true} timeout={1000}>
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
          {/* <Navbar /> */}
          <Typography variant="h4" fontWeight="bold" color="gray.800" mb={2}>
            Restablecer Contraseña
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={2}
            onSubmit={handleSubmit}
          >
            <TextField
              placeholder="Nueva contraseña"
              type="password"
              name="correo"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <TextField
              type="password"
              placeholder="Confirma nueva contraseña"
              value={confirmPassword}
              variant="outlined"
              fullWidth
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "black" }}
              type="submit"
              fullWidth
            >
              Iniciar sesión
            </Button>{" "}
          </Box>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Box>
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
      </Box>
    </Grow>
  );
}
