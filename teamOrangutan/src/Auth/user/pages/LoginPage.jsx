import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grow,
  Snackbar,
  Alert,
} from "@mui/material";
import logo from "../../../assets/user/logo2.png";

import useLogin from "../../../hooks/useLogin";
import { useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { userData, handleChange, handleSubmit } = useLogin();

  const { loginUser } = useContext(AuthContext);

  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;


    try {
    const response = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      if (data.error) {
        showMessage(data.error, "error");
        return;
      }
      localStorage.setItem("cart", data.carritoId);

      loginUser(data.token, data.userId, data.rol);
    } catch (error) {
      throw error;
    }
  };

  const EmailSent = async (correo) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar el correo");
      }

      // Si todo salió bien, devolvemos un valor que indique éxito
      return true;
    } catch (error) {
      showMessage(error.message, "error");
      return false;
    }
  };

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);
  };

  const handleSendRecoveryEmail = async () => {
    if (!email) {
      showMessage("Por favor ingresa tu correo", "error");
      return;
    }

    const success = await EmailSent(email);

    if (success) {
      setEmailSent(true); // Solo si no hubo errores
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
              Bienvenido a Primal Garage
            </Typography>
            <Typography variant="body2" color="gray.600" mb={4}>
              Donde el arte y la moda se encuentran.{" "}
            </Typography>
            {/* Formulario de Login */}
            <Grow in={!forgotPassword && !emailSent} timeout={800}>
              <Box
                component="form"
                display={!forgotPassword && !emailSent ? "flex" : "none"}
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
                  <Link
                    href="#"
                    color="primary"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      setForgotPassword(true);
                    }}
                  >
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

                <Button
                  variant="outlined"
                  size="small"
                  sx={{ color: "black", borderColor: "black", mt: -1 }}
                  fullWidth
                  onClick={() => navigate("/register")}
                >
                  Crear cuenta
                </Button>

                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => console.log("Login Failed")}
                />
              </Box>
            </Grow>

            {/* Formulario de Recuperación */}
            <Grow in={forgotPassword && !emailSent} timeout={500}>
              <Box
                display={forgotPassword && !emailSent ? "flex" : "none"}
                flexDirection="column"
                gap={2}
              >
                <Typography variant="body1" mb={2}>
                  Ingresa tu correo para recuperar tu contraseña
                </Typography>
                <TextField
                  label="Correo"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black" }}
                  onClick={handleSendRecoveryEmail}
                  fullWidth
                  type="submit"
                >
                  Enviar correo de recuperación
                </Button>
                <Box textAlign="right" mt={2}>
                  <Link
                    href="#"
                    color="primary"
                    variant="body2"
                    onClick={(e) => {
                      e.preventDefault();
                      setForgotPassword(false);
                      setEmailSent(false);
                    }}
                  >
                    Volver al login
                  </Link>
                </Box>
              </Box>
            </Grow>

            {/* Mensaje de correo enviado */}
            <Grow in={emailSent} timeout={500}>
              <Box display={emailSent ? "block" : "none"}>
                <Typography
                  variant="body1"
                  color="black"
                  mb={4}
                  fontWeight={400}
                  fontSize={20}
                >
                  Se ha enviado un correo electrónico para recuperar tu
                  contraseña. Revisa tu bandeja de entrada.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black" }}
                  onClick={() => {
                    setForgotPassword(false);
                    setEmailSent(false);
                    setEmail("");
                  }}
                  fullWidth
                >
                  Volver al login
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

export default LoginPage;
