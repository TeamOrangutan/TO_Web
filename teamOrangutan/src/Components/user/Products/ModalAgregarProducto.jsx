import { useState } from "react";
import useForm from "../../../hooks/useForm";
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Divider,
} from "@mui/material";
import CustomTypography from "../CustomTypography";
import AddIcon from "@mui/icons-material/Add";
import ModalTallas from "./ModalTallas";
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { PulseLoader } from "react-spinners";

export const ModalComponent = ({
  style,
  handleClose,
  open,
  onProductAdded,
}) => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    agregarTallasForm,
    setFormData,
  } = useForm({ onProductAdded });
  const [mainPreview, setMainPreview] = useState(null);
  const [additionalImagePreview, setAdditionalImagePreview] = useState(null);
  const [openTallas, setOpenTallas] = useState(false);
  const [tallas, settallas] = useState([]);
  const [loading, setLoading] = useState(false);

  const agregarTallas = (nuevasTallas) => {
    settallas((prevTallas) => {
      const updateTallas = [...prevTallas, nuevasTallas];
      agregarTallasForm(nuevasTallas);
      console.log("tallas  ", tallas);
      return updateTallas;
    });
  };

  const handleRemoveTallas = (nombre) => {
    settallas((prevTallas) => {
      const newTallas = prevTallas.filter((talla) => talla.name !== nombre);
      agregarTallasForm(newTallas);
      return newTallas;
    });
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMainPreview(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        images: [prevData.images[0], file],
      }));
    }
  };

  const handleAdditionalImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAdditionalImagePreview(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        images: [prevData.images[1], file],
      }));
    }
  };

  console.log("tallas123");
  console.log(tallas);

  return (
    <div>
      <LoadingOverlayWrapper
        active={loading}
        spinner={<PulseLoader color="#fff" size={20} />}
        styles={{
          overlay: (base) => ({
            ...base,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }),
          content: (base) => ({
            ...base,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }),
        }}
      >
        <Modal keepMounted open={open} onClose={handleClose}>
          <Box sx={style}>
            <Box sx={{ display: "flex" }}>
              <Typography variant={"h5"} fontWeight="bold" color="#111827">
                Agregar Nuevo Producto
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 15, mt: 0.5 }} color="#6B7280">
              Completa la información del producto
            </Typography>

            <Box mt={2}>
              <Divider />
            </Box>
            <form onSubmit={(e) => handleSubmit(e, setLoading)}>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Box
                  sx={{
                    width: "40%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box sx={{ alignSelf: "flex-start", mb: 1 }}>
                    <Typography
                      color="#374151"
                      sx={{ fontSize: "14px", fontWeight: 500 }}
                    >
                      Imagen del Producto
                    </Typography>
                  </Box>{" "}
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      width: "100%",
                      height: 500,
                      backgroundColor: "white",
                      fontSize: "80px",
                      color: "black",
                      border: "2px dashed #9CA3AF",
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      "&:hover": {
                        border: "2px dashed rgb(112, 112, 112)",
                      },
                    }}
                  >
                    {mainPreview ? (
                      <img
                        src={mainPreview}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <>
                        <ImageOutlinedIcon
                          sx={{ fontSize: 40, color: "#6B7280" }}
                        />
                        <Typography variant="body2" sx={{ color: "#6B7280" }}>
                          Subir imagen
                        </Typography>
                      </>
                    )}
                    <input
                      type="file"
                      name="imagenes"
                      onChange={handleMainImageChange}
                      hidden
                    />
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      mt: 2,
                      alignSelf: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        mb: 2,
                      }}
                    >
                      Imagen Adicionales
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      width: "40%",
                      height: "30%",
                      backgroundColor: "white",
                      fontSize: "80px",
                      color: "black",
                      border: "2px dashed #9CA3AF",
                      padding: 0,
                    }}
                  >
                    {additionalImagePreview ? (
                      <img
                        src={additionalImagePreview}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <AddIcon sx={{ color: "#9CA3AF" }} />
                    )}
                    <input
                      type="file"
                      name="productImage"
                      onChange={handleAdditionalImageChange}
                      hidden
                    />
                  </Button>
                </Box>
                <Box sx={{ width: "50%", mt: 0.5, ml: 7 }}>
                  <Typography
                    sx={{ fontWeight: "bold", color: "#111827", fontSize: 18 }}
                  >
                    Información Básica
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      color: "#374151",
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    Nombre del producto
                  </Typography>
                  <TextField
                    placeholder="Eje: Camiseta blanca básica"
                    variant="outlined"
                    name="nombre"
                    value={formData.name}
                    onChange={handleInputChange}
                    sx={{ mt: 1, width: 400 }}
                    size="small"
                  />
                  <Typography
                    sx={{
                      mt: 2,
                      color: "#374151",
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    Descripcion del producto
                  </Typography>
                  <TextField
                    placeholder="Describe las características del producto"
                    variant="outlined"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    sx={{ mt: 1, width: 400 }}
                    multiline
                    rows={4}
                  />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#111827",
                      fontSize: 18,
                      mt: 2,
                    }}
                  >
                    Precios
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 10,
                      mt: 2,
                    }}
                  >
                    <Box>
                      <Typography>Precio de venta</Typography>

                      <TextField
                        name="precioVenta"
                        value={formData.precioVenta}
                        onChange={handleInputChange}
                        type="number"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <Typography
                              sx={{
                                fontSize: "15px",
                                mr: 0.5,
                                color: "gray",
                              }}
                            >
                              C$
                            </Typography>
                          ),
                          sx: {
                            fontSize: "17px",
                            textAlign: "left",
                            width: "160px",
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography>Precio de fabricación</Typography>

                      <TextField
                        name="precioFabricacion"
                        value={formData.precioFabricacion}
                        onChange={handleInputChange}
                        type="number"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <Typography
                              sx={{
                                fontSize: "15px",
                                mr: 0.5,
                                color: "gray",
                              }}
                            >
                              C$
                            </Typography>
                          ),
                          sx: {
                            fontSize: "17px",
                            textAlign: "left",
                            width: "160px",
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography>Tallas disponibles:</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1.5,
                        mt: 1,
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          color: "black",
                          border: "1px solid black",
                          height: 32,
                          minWidth: 32,
                          borderRadius: 1,
                        }}
                        onClick={() => setOpenTallas(true)}
                      >
                        <AddIcon fontSize="small" />
                      </Button>

                      {/* Lista de tallas */}
                      {tallas.length > 0 ? (
                        tallas.map((talla) => (
                          <Box
                            key={talla.nombre}
                            sx={{
                              color: "white",
                              border: "1px solid black",
                              height: 32,
                              minWidth: 140,
                              borderRadius: 6,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              backgroundColor: "black",
                              borderColor: "white",
                              px: 1.5,
                            }}
                          >
                            <Button
                              sx={{
                                position: "absolute",
                                top: 5,
                                right: 2,
                                minWidth: 20,
                                minHeight: 20,
                                padding: 0,
                                color: "white",
                                fontSize: 14,
                              }}
                              onClick={() => handleRemoveTallas(talla.name)}
                            >
                              <CloseIcon sx={{ fontSize: 15 }} />
                            </Button>

                            <Typography sx={{ mr: 1 }}>{talla.name}</Typography>
                            <Typography sx={{ mr: 1 }}>•</Typography>
                            <Typography>{talla.stock} unids</Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography>No hay tallas agregadas</Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="outlined" color="black" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleClose}
                  sx={{ ml: 2, backgroundColor: "black", color: "white" }}
                >
                  Guardar
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>

        <ModalTallas
          handleClose={() => setOpenTallas(false)}
          open={openTallas}
          settallas={settallas}
          agregarTallas={agregarTallas}
        />
      </LoadingOverlayWrapper>
    </div>
  );
};

export default ModalComponent;
