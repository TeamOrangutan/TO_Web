import React, { useContext, useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { getProfile, updateUserData } from "../../Api/user/profile";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { PulseLoader } from "react-spinners";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { AuthContext } from "../../Auth/user/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Ajustes = () => {
  const [editable, setEditable] = useState(false);

  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    imagen: "",
    telefono: "",
    rol: "",
  });
  const [loading, setLoading] = useState(true);
  const { changeRole } = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Guarda el archivo
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl); // Muestra vista previa
    }
  };

  const getUser = async () => {
    try {
      const data = await getProfile();
      setFormData({
        nombres: data?.persona?.nombres ?? "",
        apellidos: data?.persona?.apellidos ?? "",
        correo: data?.correo ?? "",
        direccion: data?.persona?.direccion ?? "",
        rol: data?.rol?.descripcion ?? "",
        telefono: data?.persona?.telefono ?? "",
        imagen: data?.persona?.imagenPerfil ?? "",
      });
      setLoading(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(formData);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return;

    const formDataObject = {
      nombres: formData?.nombres ?? "",
      apellidos: formData?.apellidos ?? "",
      correo: formData?.correo ?? "",
      direccion: formData?.direccion ?? "",
      rol: formData?.rol ?? "",
      telefono: formData?.telefono ?? "",
      imagen: selectedFile,
    };

    try {
      const result = await updateUserData(formDataObject);
      console.log("Imagen actualizada", result);

      setSelectedFile(null);
      setImageUrl(null);
      showMessage("Imagen actualizada correctamente", "success");
      await getUser(); // Refresca datos
    } catch (error) {
      console.error("Error al subir imagen", error);
    }
  };
  const EmailSent = async (correo) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/forgot-password/`,
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

  const handleEditClick = () => {
    setEditable(!editable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  const navigate = useNavigate();

  const handleGoToStore = () => {
    changeRole(2);
    navigate("/home");
  };

  return (
    <>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        sx={{ width: "auto" }}
      >
        <TopBar selectedOption={"Configuración"} />

        <Box width={{ xs: "98vw", sm: "90%" }} mx="auto">
          <Box
            sx={{
              border: "1px solid rgb(229, 228, 233)",
              p: { xs: 1, sm: 3 },
              backgroundColor: "white",
            }}
          >
            <Box
              display="flex"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}
            >
              {" "}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PersonOutlineOutlinedIcon sx={{ color: "black" }} />
                Información Personal
              </Typography>
              <Box
                ml={{ xs: 0, sm: 38 }}
                mt={{ xs: 2, sm: 0 }}
                sx={{
                  borderRadius: 2,
                  p: 0.7,
                  color: "#222",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  display: "flex",
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": { background: "#f3f4f6" },
                  width: { xs: "100%", sm: "auto" },
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
                onClick={handleEditClick}
              >
                <Typography
                  sx={{ fontSize: 15, display: "flex", alignItems: "center" }}
                  fontWeight={500}
                >
                  <EditOutlinedIcon sx={{ fontSize: 15, mr: 1 }} />
                  {editable ? "Cancelar" : "Editar"}
                </Typography>
              </Box>
              <Box
                ml={{ xs: 0, sm: 2 }}
                mt={{ xs: 2, sm: 0 }}
                sx={{
                  borderRadius: 2,
                  p: 0.7,
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "#16a34a",
                  display: "flex",
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": { backgroundColor: "#15803d" },
                  width: { xs: "100%", sm: "auto" },
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
                onClick={handleGoToStore}
              >
                <Typography
                  sx={{ fontSize: 15, display: "flex", alignItems: "center" }}
                  fontWeight={400}
                >
                  <StorefrontOutlinedIcon sx={{ fontSize: 15, mr: 1 }} />
                  Ir a mi tienda
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mt: 2 }} />

            {loading ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                py={4}
              >
                <PulseLoader color="black" />
                <Typography variant="body2" mt={2}>
                  Cargando usuario...
                </Typography>
              </Box>
            ) : (
              <>
                <Box
                  display="flex"
                  gap={3}
                  mt={4}
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "center", sm: "flex-start" }}
                >
                  {" "}
                  {/* Avatar, icono y botón */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width={{ xs: "100%", sm: "auto" }}
                  >
                    <Box
                      position="relative"
                      sx={{ width: 130, height: 130, cursor: "pointer" }}
                      onClick={handleImageClick}
                    >
                      <Avatar
                        sx={{ width: 130, height: 130 }}
                        src={
                          imageUrl
                            ? imageUrl
                            : formData?.imagen
                            ? formData.imagen.startsWith("https://")
                              ? formData.imagen
                              : `http://localhost:3000/api/user/file/${formData.imagen}`
                            : undefined
                        }
                      >
                        {formData?.nombres?.[0]}
                      </Avatar>
                      <IconButton
                         sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "black",
                    color: "white",
                    border: "2px solid white",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                  size="small"
                      >
                        <PhotoCameraIcon fontSize="small" />
                      </IconButton>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </Box>

                    <Box sx={{ height: 40, mt: 1 }}>
                      {selectedFile && (
                        <Button
                          onClick={handleUploadImage}
                          sx={{
                            backgroundColor: "black",
                            color: "white",
                            textTransform: "none",
                            fontSize: "0.85rem",
                            px: 2,
                            "&:hover": { backgroundColor: "#222" },
                          }}
                          size="small"
                        >
                          Guardar imagen
                        </Button>
                      )}
                    </Box>
                  </Box>
                  {/* Datos personales */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    flex={1}
                    width={{ xs: "100%", sm: "auto" }}
                  >
                    <Box display="flex" gap={2}>
                      <Box flex={1}>
                        <Typography fontSize={15}>Nombres</Typography>
                        <TextField
                          value={formData?.nombres || ""}
                          size="small"
                          fullWidth
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nombres: e.target.value,
                            })
                          }
                          InputProps={{
                            disabled: !editable,
                          }}
                        />
                      </Box>

                      <Box flex={1}>
                        <Typography fontSize={15}>Apellidos</Typography>
                        <TextField
                          value={formData?.apellidos || ""}
                          fullWidth
                          size="small"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              apellidos: e.target.value,
                            })
                          }
                          InputProps={{
                            disabled: !editable,
                          }}
                        />
                      </Box>
                    </Box>

                    <Box>
                      <Typography fontSize={15}>Rol</Typography>
                      <TextField
                        value={formData?.rol || ""}
                        size="small"
                        fullWidth
                        InputProps={{
                          disabled: true,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ mt: 2 }} />

                {/* Contacto y dirección */}
                <Box mt={2}>
                  <Box display="flex" gap={3}>
                    <Box flex={1}>
                      <Typography
                        fontSize={15}
                        display="flex"
                        alignItems="center"
                        mb={0.5}
                      >
                        <EmailOutlinedIcon sx={{ color: "black", mr: 1 }} />
                        Email
                      </Typography>
                      <TextField
                        value={formData?.correo || ""}
                        fullWidth
                        size="small"
                        onChange={(e) =>
                          setFormData({ ...formData, correo: e.target.value })
                        }
                        InputProps={{ disabled: !editable }}
                        sx={{ mb: 2 }}
                      />
                    </Box>

                    <Box flex={1}>
                      <Typography
                        fontSize={15}
                        display="flex"
                        alignItems="center"
                        mb={0.5}
                      >
                        <LocalPhoneOutlinedIcon sx={{ mr: 1 }} />
                        Teléfono
                      </Typography>
                      <TextField
                        value={formData?.telefono || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, telefono: e.target.value })
                        }
                        fullWidth
                        size="small"
                        InputProps={{ disabled: !editable }}
                        sx={{ mb: 2 }}
                      />
                    </Box>
                  </Box>

                  <Typography
                    fontSize={15}
                    display="flex"
                    alignItems="center"
                    mb={0.5}
                  >
                    <LocationOnOutlinedIcon sx={{ mr: 1 }} />
                    Dirección
                  </Typography>
                  <TextField
                    value={formData?.direccion || ""}
                    fullWidth
                    size="small"
                    multiline
                    name="direccion"
                    minRows={3}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                    InputProps={{ disabled: !editable }}
                    sx={{ mb: 2 }}
                  />
                  {editable && (
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                        sx={{ backgroundColor: "black", textTransform: "none" }}
                      >
                        Guardar cambios
                      </Button>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>

          {/* Sección Seguridad */}
          <Box
            sx={{
              mt: 2,
              border: "1px solid rgb(229, 228, 233)",
              p: { xs: 1, sm: 3 },
              backgroundColor: "white",
            }}
          >
            <Typography variant="h6" display="flex" alignItems="center">
              <ShieldOutlinedIcon />
              Seguridad
            </Typography>

            <Box>
              <Typography>
                Haz click en el botón para cambiar tu contraseña
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black" }}
                  onClick={handleSendRecoveryEmail}
                >
                  Enviar correo de recuperación
                </Button>
              </Box>
            </Box>
          </Box>
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
    </>
  );
};

export default Ajustes;
