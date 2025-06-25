import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getRoleStyles } from "../../utils/getRoleStyles";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
export const ModalDetallesUser = ({ open, onClose, user, loading }) => {
  console.log(user);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "98vw", sm: 600 },
          maxWidth: "98vw",
          borderRadius: 3,
          m: { xs: 1, sm: "auto" },
        },
      }}
    >
      <DialogTitle fontWeight={700}>
        Detalles del Usuario
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 1,
            top: 1,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          gap={2}
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-start" }}
        >
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={
              user?.imagenPerfil
                ? user?.imagenPerfil.startsWith("https://")
                  ? user?.imagenPerfil
                  : `http://localhost:3000/api/user/file/${user?.imagenPerfil}`
                : undefined
            }
          />
          <Box>
            <Typography fontSize={22} fontWeight="500">
              {user?.nombres} {user?.apellidos}{" "}
            </Typography>
            <Typography>{user?.correo}</Typography>
            <Box display="flex" gap={2} mt={1} flexWrap="wrap">
              <Typography>
                <Box
                  sx={{
                    ...getRoleStyles(user?.rol),
                    borderRadius: 8,
                    px: 1.5,
                    py: 0.5,
                    display: "inline-block",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {user?.rol}
                </Box>
              </Typography>
              <Typography>
                <Box
                  sx={{
                    ...getRoleStyles(
                      user?.estado === "Activo" ? "Admin" : user?.rol
                    ),
                    borderRadius: 8,
                    px: 1.5,
                    py: 0.5,
                    display: "inline-block",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {user?.estado}
                </Box>{" "}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          gap={4}
          mt={3}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box flex={1}>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
              Información de contacto
            </Typography>
            <Box mt={1}>
              <Typography fontSize={14}>
                <EmailOutlinedIcon
                  sx={{
                    color: "gray",
                    verticalAlign: "middle",
                    mr: 1,
                    fontSize: 18,
                  }}
                />
                {user?.correo}
              </Typography>
              <Typography fontSize={15}>
                <LocalPhoneOutlinedIcon
                  sx={{
                    color: "gray",
                    verticalAlign: "middle",
                    mr: 1,
                    fontSize: 18,
                  }}
                />
                {user?.telefono}
              </Typography>
              <Typography fontSize={15}>
                <PlaceOutlinedIcon
                  sx={{
                    color: "gray",
                    verticalAlign: "middle",
                    mr: 1,
                    fontSize: 18,
                  }}
                />
                {user?.direccion}
              </Typography>
            </Box>
          </Box>
          <Box flex={1}>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
              Actividad
            </Typography>
            <Typography fontSize={15} mt={1} display="flex" alignItems="center">
              <CalendarTodayOutlinedIcon
                sx={{
                  color: "gray",
                  mr: 1,
                  fontSize: 18,
                }}
              />
              Última acceso:{" "}
              {user?.ultimoAcceso
                ? new Date(user.ultimoAcceso).toLocaleDateString()
                : "Sin datos"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              border: "1px solid rgb(225, 218, 255)",
              p: 3,
              borderRadius: 2,
              width: { xs: "100%", sm: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Box display="flex" justifyContent="center">
                <Typography fontSize="2rem" fontWeight="bold" color="#16a34a">
                  {user?.cantidadOrdenes}
                </Typography>
              </Box>
              <Typography color="gray">Órdenes totales</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid rgb(225, 218, 255)",
              p: 3,
              borderRadius: 2,
              width: { xs: "100%", sm: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#2563eb",
                }}
              >
                $ {user?.montoTotalOrdenes}
              </Typography>
              <Typography color="gray">Total Gastado</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDetallesUser;
