// ModalEditarProduct.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ModalTallas from "../user/Products/ModalTallas";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { getProuductById, updateProduct } from "../../Api/user/productsApi";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { PulseLoader } from "react-spinners";

export const ModalEditarProduct = ({
  handleClose,
  open,
  product,
  onProductAdded,
  showMessage,
}) => {
  const [mainPreview, setMainPreview] = useState(null);
  const [additionalImagePreview, setAdditionalImagePreview] = useState(null);
  const [openTallas, setOpenTallas] = useState(false);
  const [tallas, setTallas] = useState([]);
  const [formData, setProduct] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [initialTallas, setInitialTallas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const refreshProduct = async () => {
      try {
        const updatedProduct = await getProuductById(product.id);
        const tallasValidas = (updatedProduct?.tallas || []).filter(
          (t) => t.stock > 0
        );
        setProduct({
          ...updatedProduct,
          estado: tallasValidas.length > 0 ? "Disponible" : "Agotado",
        });
        setTallas(tallasValidas);
        setInitialTallas(JSON.stringify(tallasValidas)); // Guardar tallas originales
      } catch (error) {
        console.error("Error:", error);
      }
    };
    refreshProduct();
  }, [product]);

  const actualizarEstado = (tallasActualizadas) => {
    const estadoNuevo =
      tallasActualizadas.length > 0 ? "Disponible" : "Agotado";
    setProduct((prev) => ({
      ...prev,
      estado: estadoNuevo,
    }));
  };

  const agregarTallasForm = (nuevasTallas) => {
    const tallasFiltradas = nuevasTallas.filter((t) => t.stock > 0);
    setProduct((prev) => ({
      ...prev,
      tallas: tallasFiltradas,
      estado: tallasFiltradas.length > 0 ? "Disponible" : "Agotado",
    }));
  };

  const agregarTallas = (nuevaTalla) => {
    setTallas((prev) => {
      // Busca si la talla ya existe
      const existe = prev.some((t) => t.name === nuevaTalla.name);
      let nuevasTallas;
      if (existe) {
        // Si existe, reemplaza el stock por el nuevo valor
        nuevasTallas = prev.map((t) =>
          t.name === nuevaTalla.name ? { ...t, stock: nuevaTalla.stock } : t
        );
      } else {
        // Si no existe, la agrega
        nuevasTallas = [...prev, nuevaTalla];
      }
      // Solo deja tallas con stock > 0
      const tallasFiltradas = nuevasTallas.filter((t) => t.stock > 0);
      agregarTallasForm(tallasFiltradas);
      return tallasFiltradas;
    });
  };

  const handleRemoveTallas = (nombre) => {
    setTallas((prev) => {
      const nuevas = prev.filter((t) => t.name !== nombre);
      agregarTallasForm(nuevas);
      return nuevas;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      await updateProduct(product.id, formData);
      showMessage("Producto actualizado", "success");
      onProductAdded();
      handleClose(); // <-- Cierra el modal después de actualizar
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
    setLoading(false)

  };

  useEffect(() => {
    if (formData.path instanceof File) {
      setMainPreview(URL.createObjectURL(formData.path));
    } else if (typeof formData.path === "string") {
      setMainPreview(formData.path);
    } else {
      setMainPreview(null);
    }

    if (formData.hoverPath instanceof File) {
      setAdditionalImagePreview(URL.createObjectURL(formData.hoverPath));
    } else if (typeof formData.hoverPath === "string") {
      setAdditionalImagePreview(formData.hoverPath);
    } else {
      setAdditionalImagePreview(null);
    }
  }, [formData]);

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMainPreview(URL.createObjectURL(file));
      setProduct((prev) => ({
        ...prev,
        path: file,
      }));
    }
  };

  const handleAdditionalImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAdditionalImagePreview(URL.createObjectURL(file));
      setProduct((prev) => ({
        ...prev,
        hoverPath: file,
      }));
    }
  };

  // Nueva función para manejar el cierre con advertencia
  const handleCloseWithWarning = () => {
    if (JSON.stringify(tallas) !== initialTallas) {
      setShowWarning(true);
    } else {
      setTallas(JSON.parse(initialTallas)); // <-- Restaurar tallas originales
      handleClose();
    }
  };

  // Confirmar cierre y descartar cambios
  const confirmClose = () => {
    setShowWarning(false);
    setTallas(JSON.parse(initialTallas)); // <-- Restaurar tallas originales
    handleClose();
  };

  // Cancelar cierre
  const cancelClose = () => {
    setShowWarning(false);
  };

  return (
    <>
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
        <Modal keepMounted open={open} onClose={handleCloseWithWarning}>
          <Box
            sx={{
              position: "absolute",
              top: "49%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 2,
              p: 4,
              width: { xs: "90%", sm: 600, md: 750, lg: 850 },
              borderRadius: 3,
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <Typography variant={"h5"} fontWeight="bold" color="#111827">
              Editar Producto
            </Typography>
            <Typography sx={{ fontSize: 15, mt: 0.5 }} color="#6B7280">
              Completa la información del producto
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <form onSubmit={handleSubmit}>
              <Box 
           sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  mt: 2,
                  gap: { xs: 3, md: 0 },
                }}
              >
                
                <Box
                  sx={{
                    width: { xs: "100%", md: "40%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography
                    color="#374151"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      alignSelf: "flex-start",
                    }}
                  >
                    Imagen del Producto
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                       width: "100%",
                      height: { xs: 200, sm: 300, md: 500 },
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
                  <Typography sx={{ alignSelf: "flex-start", mt: 2 }}>
                    Imagen Adicional
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                     sx={{
                      width: { xs: "100%", sm: "60%", md: "40%" },
                      height: { xs: 80, sm: 120, md: "30%" },
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

                {/* Datos del producto */}
                <Box
 sx={{
                    width: { xs: "100%", md: "50%" },
                    mt: 0.5,
                    ml: { xs: 0, md: 7 },
                  }}                 >
                  <Typography fontWeight="bold" color="#111827" fontSize={18}>
                    Información Básica
                  </Typography>
                  <Typography mt={2} color="#374151" fontSize={15}>
                    Nombre del producto
                  </Typography>
                  <TextField
                    placeholder="Ej: Camiseta blanca básica"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                    sx={{ mt: 1, width: { xs: "100%", sm: 400 } }}
                  />
                  <Typography mt={2} color="#374151" fontSize={15}>
                    Descripción
                  </Typography>
                  <TextField
                    placeholder="Describe las características del producto"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mt: 1, width: { xs: "100%", sm: 400 } }}
                  />
                  <Typography
                    fontWeight="bold"
                    color="#111827"
                    fontSize={18}
                    mt={2}
                  >
                    Precios
                  </Typography>
                  <Box
 sx={{
                      display: "flex",
                      gap: { xs: 2, md: 10 },
                      mt: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}                   >
                    <TextField
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      type="number"
                      label="Precio de venta"
                      size="small"
                    />
                    {/* <TextField
                      name="precioFabricacion"
                      value={formData.precioFabricacion || ""}
                      onChange={handleInputChange}
                      type="number"
                      label="Precio de fabricación"
                      size="small"
                    /> */}
                  </Box>

                  {/* Tallas */}
                  <Typography mt={2}>Tallas disponibles:</Typography>
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
                      }}
                      onClick={() => setOpenTallas(true)}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                    {tallas.length > 0 ? (
                      tallas.map((talla) => (
                        <Box
                          key={talla.name}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 1,
                            px: 1.5,
                          }}
                        >
                          <Typography>
                            {talla.name} • {talla.stock} unids
                          </Typography>
                          <CloseIcon
                            sx={{ fontSize: 15, cursor: "pointer" }}
                            onClick={() => handleRemoveTallas(talla.name)}
                          />
                        </Box>
                      ))
                    ) : (
                      <Typography>No hay tallas agregadas</Typography>
                    )}
                  </Box>

                  <Typography mt={2}>Estado:</Typography>
                  <FormControl size="small" fullWidth sx={{ mt: 1 }}>
                    <Select
                      name="estado"
                      value={formData.estado || ""}
                      disabled
                      displayEmpty
                    >
                      <MenuItem value="Disponible">Disponible</MenuItem>
                      <MenuItem value="Agotado">Agotado</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="outlined" onClick={handleCloseWithWarning}>
                  Cerrar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ ml: 2, backgroundColor: "black", color: "white" }}
                >
                  Actualizar
                </Button>
              </Box>
            </form>

            <ModalTallas
              handleClose={() => setOpenTallas(false)}
              open={openTallas}
              settallas={setTallas}
              agregarTallas={agregarTallas}
            />
          </Box>
        </Modal>
        <Dialog open={showWarning} onClose={cancelClose}>
          <DialogTitle>Advertencia</DialogTitle>
          <DialogContent>
            Tienes cambios de tallas no guardados. ¿Seguro que quieres salir sin
            guardar?
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelClose}>Cancelar</Button>
            <Button onClick={confirmClose} color="error">
              Salir sin guardar
            </Button>
          </DialogActions>
        </Dialog>
      </LoadingOverlayWrapper>
    </>
  );
};

export default ModalEditarProduct;
