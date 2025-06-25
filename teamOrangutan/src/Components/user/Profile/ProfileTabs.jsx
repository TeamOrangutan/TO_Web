import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { TabPanel } from "./TabPanel";
import { updateUserData } from "../../../Api/user/profile";
import Orders from "./Orders";
import { getAllOrdenes } from "../../../Api/user/ordenes";

export const ProfileTabs = ({ user }) => {
  const [value, setValue] = useState(0);
  const [editable, setEditable] = useState(false);

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    imagen: "",
    telefono: "",
  });

  const [ordenes, setOrdenes] = useState([]);
  const [ordenesLoaded, setOrdenesLoaded] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // "success" | "error" | "info" | "warning"

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);
  };

  const fetchOrdenes = async () => {
    setOrdenesLoaded(true);
    try {
      const data = await getAllOrdenes();
      setOrdenes(data.ordenes);
    } catch (error) {
      throw error;
    }
    setOrdenesLoaded(false);
  };

  useEffect(() => {
    if (!ordenesLoaded) {
      fetchOrdenes();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        nombres: user?.persona?.nombres ?? "",
        apellidos: user?.persona?.apellidos ?? "",
        correo: user?.correo ?? "",
        direccion: user?.persona?.direccion ?? "",
        imagen: user?.persona?.imagenPerfil ?? "",
        telefono: user?.telefono ?? "",
      });
    }
  }, [user]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", formData);

    if (!/^\d{8}$/.test(formData.telefono)) {
      showMessage("El teléfono debe tener exactamente 8 números.", "error");
      return;
    }

    try {
      const data = await updateUserData(formData);
      console.log(data);
      showMessage("Usuario actualizado correctamente", "success");
      setEditable(false);
    } catch (error) {
      showMessage(error.message, "error");
      console.error("Error al actualizar:", error.message);
    }
  };

  const EmailSent = async (correo) => {
    try {
      const response = await fetch(
        `https://toapiteamorangutan-production.up.railway.app/api/auth/forgot-password/`,
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

  const handleSendRecoveryEmail = async () => {
    if (!formData.correo) {
      showMessage("Por favor ingresa tu correo", "error");
      return;
    }

    const success = await EmailSent(formData.correo);

    if (success) {
      showMessage(
        "Se te ha enviado un correo electrónico para cambiar la contraseña",
        "success"
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Perfil Tabs"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mb: 2,
          "& .MuiTab-root": {
            border: "1px solid #DEDEDE",
            flex: 1,
            textTransform: "none",
            backgroundColor: "#F0F0F0",
            fontSize: 16,
            color: "gray",
          },
          "& .Mui-selected": {
            color: "rgb(2, 2, 2)",
            backgroundColor: "white",
          },
          "& .MuiTabs-indicator": {
            height: 2,
            backgroundColor: "#DEDEDE",
          },
        }}
      >
        <Tab label="Perfil" />
        <Tab label="Mis compras" />
        <Tab label="Seguridad" />
      </Tabs>

      {/* Tab Content */}
      <TabPanel value={value} index={0}>
        <Typography variant="h6">Información personal</Typography>
        <Typography variant="body2" color="text.secondary">
          Actualiza tu información personal y dirección
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <Box display="flex" gap={2}>
              <Box width="100%">
                <Typography>Nombres</Typography>
                <TextField
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  disabled={!editable}
                  fullWidth
                />
              </Box>
              <Box width="100%">
                <Typography>Apellidos</Typography>
                <TextField
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  disabled={!editable}
                  fullWidth
                />
              </Box>
            </Box>

            <Box mt={2} display="flex" gap={2}>
              <Box flex={1}>
                <Typography>Correo electrónico</Typography>
                <TextField
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  disabled={!editable}
                  fullWidth
                />
              </Box>
              <Box flex={1}>
                <Typography>Teléfono</Typography>
                <TextField
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  disabled={!editable}
                  fullWidth
                />
              </Box>
            </Box>
            <Box mt={2}>
              <Typography>Dirección</Typography>
              <TextField
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                disabled={!editable}
                fullWidth
              />
            </Box>

            <Box mt={2}>
              <Button variant="outlined" onClick={handleEditClick}>
                {editable ? "Cancelar" : "Editar"}
              </Button>

              {editable && (
                <Button
                  type="submit"
                  sx={{ ml: 2 }}
                  variant="outlined"
                  color="primary"
                >
                  Guardar
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h6">Compras</Typography>
        <Typography variant="body2">
          Consulta el historial de tus compras.
        </Typography>
        <Box mt={2}>
          <Orders ordenes={ordenes} ordenesLoaded={ordenesLoaded} />
        </Box>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h6">Seguridad</Typography>

        <Box>
          <Typography>
            Haz click en el boton para cambiar tu contraseña
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "black" }}
              onClick={handleSendRecoveryEmail}
              type="submit"
            >
              Enviar correo de recuperación
            </Button>
          </Box>
        </Box>
      </TabPanel>
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
  );
};
export default ProfileTabs;
