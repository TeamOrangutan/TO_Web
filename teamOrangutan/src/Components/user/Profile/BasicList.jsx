import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DraftsIcon from "@mui/icons-material/Drafts";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { AuthContext } from "../../../Auth/user/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function BasicList() {
  const { isAuthenticated, loginUser, logoutUser, user } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/"); // O donde quieras redirigir
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItemButton>
          </ListItem>

          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutOutlinedIcon sx={{ color: "red" }} />
              </ListItemIcon>
              <ListItemText primary="Cerrar session" sx={{ color: "red" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
