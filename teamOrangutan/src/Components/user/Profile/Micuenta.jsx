import Navbar from "../Navbar/Navbar";
import {
  Avatar,
  Box,
  Divider,
  Grow,
  IconButton,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import BasicList from "./BasicList";
import ProfileTabs from "./ProfileTabs";
import { getProfile, updateUserData } from "../../../Api/user/profile";
import { useContext, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useRef } from "react";
import { AuthContext } from "../../../Auth/user/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
export const Micuenta = () => {
  const [loading, setLoading] = useState(false);
  const [user2, setuser] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Nuevo estado

  const { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

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

  const userProfile = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setuser(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logoutUser();
        navigate("/");
      }
      console.log(error);

      console.error("Error al cargar la información del usuario", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  console.log("user2")
  console.log(user2)

  const handleUploadImage = async () => {
    setLoading(true);

    if (!selectedFile) return;

    const formDataObject = {
      nombres: user2.persona.nombres,
      apellidos: user2.persona.apellidos,
      direccion: user2.persona.direccion,
      correo: user2.correo,
      imagen: selectedFile,
    };

    try {
      const result = await updateUserData(formDataObject);
      console.log("Imagen actualizada", result);

      setSelectedFile(null);
      setImageUrl(null);

      await userProfile(); // Refresca datos
    } catch (error) {
      console.error("Error al subir imagen", error);
    }finally {
      setLoading(false);
    }
  };

  const imagen = user2?.persona?.imagenPerfil;

  const url = imagen?.startsWith("http")
    ? imagen
    : `http://localhost:3000/api/user/file/${imagen}`;

  return (
    <div>
      <Navbar />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <BarLoader speedMultiplier={1} />
        </Box>
      ) : (
        <Grow in={true} timeout={1000}>
          <Box
            sx={{
              mt: { xs: 10, sm: 11 },
              px: { xs: 2, sm: 5 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: 28, sm: 40 },
                mb: 3,
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {" "}
              Mi cuenta
            </Typography>

            {user2 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                }}
              >
                {" "}
                <Box
                  sx={{
                    border: "1px solid #EBEBEB",
                    maxWidth: { md: "300px" }, 
                    height: "60%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <Box
                    position="relative"
                    display="inline-block"
                    mb={2}
                    sx={{ cursor: "pointer" }}
                    onClick={handleImageClick}
                  >
                    <Avatar
                      src={imageUrl || url || imagen}
                      alt="Foto de perfil"
                      sx={{
                        width: 120,
                        height: 120,
                        border: "4px solid white",
                        boxShadow: 3,
                      }}
                    />
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

                  {selectedFile && (
                    <Box sx={{ mt: 1 }}>
                      <button
                        onClick={handleUploadImage}
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Guardar imagen
                      </button>
                    </Box>
                  )}

                  <Typography fontWeight="bold">
                    {user2.persona.nombres} {user2.persona.apellidos}
                  </Typography>
                  <Typography color="text.secondary">{user2.correo}</Typography>
                  <Divider
                    sx={{ my: 2, width: "100%", borderColor: "#EBEBEB" }}
                  />
                  <BasicList />
                </Box>
                <ProfileTabs user={user2} />
              </Box>
            )}
            <Footer />
          </Box>
        </Grow>
      )}
    </div>
  );
};
export default Micuenta;
