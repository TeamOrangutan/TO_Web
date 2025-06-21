import {
  Alert,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers, updateStateUser } from "../../Api/user/users";
import { PulseLoader } from "react-spinners";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalDetallesUser from "./ModalDetallesUser";
import { getRoleStyles } from "../../utils/getRoleStyles";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const USD_TO_CORDOBAS = 36.77;

export const TableUsers = ({ Users, loading, reload }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [modalAbierto, setModalAbierto] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setOpen(true);
  };

  const handleVerDetallesUser = () => {
    setModalAbierto(true);
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleUpdateState = async (estado, userId) => {
    try {
      const data = await updateStateUser(estado, userId);
      console.log(data);

      showMessage(
        `Usuario ${
          estado === "Activo" ? "restaurado" : "eliminado"
        } correctamente`,
        "success"
      );
      reload();
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

console.log(selectedUser);


  return (
    <>
      <Box
        sx={{
          border: "2px solid #F1EEFD",
          transition: "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
          backgroundColor: "white",
          mt: 5,
          p: 3,
        }}
      >
        <Typography fontWeight="bold" fontSize={22}>
          Lista de Usuarios ({Users.usuarios.length})
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Usuario</strong>
              </TableCell>
              <TableCell>
                <strong>Contacto</strong>
              </TableCell>
              <TableCell>
                <strong>Rol</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
              <TableCell>
                <strong>Actividad</strong>
              </TableCell>
              <TableCell>
                <strong>Compras</strong>
              </TableCell>
              <TableCell>
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    py={4}
                  >
                    <PulseLoader color="black" />
                    <Typography variant="body2" mt={2}>
                      Cargando usuarios...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : Users.usuarios && Users.usuarios.length > 0 ? (
              Users.usuarios.map((user) => (
                <TableRow key={user.persona_pk}>
                  <TableCell>
                    <Box display="flex" gap={1} alignItems="center">
                      <Avatar
                        src={
                          user.imagenPerfil
                            ? user.imagenPerfil.startsWith("https://")
                              ? user.imagenPerfil
                              : `http://localhost:3000/api/user/file/${user.imagenPerfil}`
                            : undefined
                        }
                      />
                      <span>
                        {user.nombres} {user.apellidos}
                      </span>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <span>{user.correo}</span>
                      <span>{user.telefono}</span>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        ...getRoleStyles(user.rol),
                        borderRadius: 8,
                        px: 1.5,
                        py: 0.5,
                        display: "inline-block",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {user.rol}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Box
                      sx={{
                        ...getRoleStyles(
                          user.estado === "Activo" ? "Admin" : user.rol
                        ),
                        borderRadius: 8,
                        px: 1.5,
                        py: 0.5,
                        display: "inline-block",
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {user.estado}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <span>{user.cantidadOrdenes} órdenes</span>
                    </Box>{" "}
                  </TableCell>{" "}
                  <TableCell>
                    $ {user.montoTotalOrdenes} (C${" "}
                    {(user.montoTotalOrdenes * USD_TO_CORDOBAS).toFixed(2)})
                  </TableCell>{" "}
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay usuarios para mostrar.
                </TableCell>
              </TableRow>
            )}
            {
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleVerDetallesUser()}>
                  <RemoveRedEyeOutlinedIcon
                    sx={{ color: "black", mr: 1, fontSize: 20 }}
                  />
                  <Typography>Ver detalles</Typography>
                </MenuItem>
                {selectedUser && selectedUser.estado === "Inactivo" ? (
                  <MenuItem
                    sx={{
                      color: "#166534",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => handleUpdateState("Activo", selectedUser.persona_pk)}
                  >
                    <RestoreOutlinedIcon
                      sx={{ color: "#166534", mr: 1, fontSize: 20 }}
                    />
                    <Typography color="#166534">Restaurar Usuario</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem
                    sx={{ color: "red", display: "flex", alignItems: "center" }}
                    onClick={() => handleUpdateState("Inactivo", selectedUser.persona_pk)}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{ color: "red", mr: 1, fontSize: 20 }}
                    />
                    <Typography>Eliminar Usuario</Typography>
                  </MenuItem>
                )}
              </Menu>
            }
            <ModalDetallesUser
              open={modalAbierto}
              onClose={() => setModalAbierto(false)}
              user={selectedUser}
              loading={loading}
              reload={reload}
            />
          </TableBody>
        </Table>
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

export default TableUsers;
