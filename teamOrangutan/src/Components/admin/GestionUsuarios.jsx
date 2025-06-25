import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import TopBar from "./TopBar";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import TableUsers from "./TableUsers";
import { useEffect, useState } from "react";
import { getUsers } from "../../Api/user/users";

export const GestionUsuarios = () => {
  const [loading, setLoading] = useState(false);
  const [Users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filtroRol, setFiltroRol] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Activo");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    getAllUsers();
  }, [reload]);

  const filteredUsers = {
    ...Users,
    usuarios: Users.usuarios
      ? Users.usuarios.filter((user) => {
          const searchMatch =
            `${user.nombres} ${user.apellidos}`
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            (user.correo &&
              user.correo.toLowerCase().includes(search.toLowerCase()));

          const rolMatch =
            filtroRol === "Todos" ||
            (user.rol && user.rol === filtroRol);

          const estadoMatch =
            filtroEstado === "Todos" ||
            (user.estado && user.estado === filtroEstado);

          return searchMatch && rolMatch && estadoMatch;
        })
      : [],
  };

  return (
    <>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        sx={{ width: "auto" }}
      >
        <TopBar selectedOption={"Gestión de Usuarios"} />

        <Box bgcolor="#F9FAFB" px={3} py={0} mt={0}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            mt={3}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <TextField
              label="Buscar por nombre o email"
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: { xs: "100%", sm: 300, md: 400 },
                backgroundColor: "white",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl size="small" sx={{ width: { xs: "100%", sm: 200 } }}>
              <InputLabel id="rol-select-label">Rol</InputLabel>
              <Select
                labelId="rol-select-label"
                id="rol-select"
                label="Rol"
                value={filtroRol}
                sx={{ backgroundColor: "white" }}
                onChange={(e) => setFiltroRol(e.target.value)}
                input={<OutlinedInput label="Rol" />}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ width: { xs: "100%", sm: 200 } }}>
              <InputLabel id="estado-select-label">Estado</InputLabel>
              <Select
                labelId="estado-select-label"
                id="estado-select"
                label="Estado"
                value={filtroEstado}
                sx={{ backgroundColor: "white" }}
                onChange={(e) => setFiltroEstado(e.target.value)}
                input={<OutlinedInput label="Estado" />}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TableUsers
            Users={filteredUsers}
            reload={() => setReload((r) => !r)}
            loading={loading}
          />
        </Box>
      </Box>
    </>
  );
};

export default GestionUsuarios;