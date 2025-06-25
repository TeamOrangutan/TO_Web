import { MenuOpen } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import logo from "../../assets/user/logo2.png";
import { useContext, useState } from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/user/context/AuthContext";
import { useTheme } from "@mui/material";

const menuGroups = [
  {
    title: "VENTAS",
    items: [{ icon: <ShoppingCartOutlinedIcon />, label: "Órdenes de compra" }],
  },
  {
    title: "INVENTARIO",
    items: [{ icon: <WidgetsOutlinedIcon />, label: "Productos" }],
  },
  {
    title: "USUARIOS",
    items: [{ icon: <PeopleAltOutlinedIcon />, label: "Ver usuarios" }],
  },
  {
    title: "CONFIGURACION",
    items: [{ icon: <SettingsOutlinedIcon />, label: "Ajustes" }],
  },
  {
    title: "",
    items: [
      {
        icon: <LogoutOutlinedIcon />,
        label: "Cerrar sesión",
        logout: true,
      },
    ],
  },
];

export const SideBar = ({ selectedOption, setSelectedOption }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // Sidebar content (para usar en Drawer y en desktop)
  const sidebarContent = (
    <Box
      width={collapsed ? { xs: 70, sm: 120 } : { xs: 180, sm: 330 }}
      minWidth={collapsed ? { xs: 70, sm: 120 } : { xs: 70, sm: 210 }}
      maxWidth={collapsed ? { xs: 70, sm: 120 } : { xs: 180, sm: 210 }}
      bgcolor="white"
      height="100vh"
      p={2}
      sx={{
        transition: "width 0.2s ease, min-width 0.2s ease, max-width 0.2s ease",
        overflowX: "hidden",
        borderRight: "1px solid #F1EEFD",
        flexShrink: 0,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <Box
          onClick={() => setCollapsed(!collapsed)}
          component="img"
          src={logo}
          alt="Logo Primal Garage"
          sx={{
            cursor: "pointer",
            width: collapsed ? 50 : 80,
            height: collapsed ? 30 : 50,
            transition: "width 0.3s, height 0.3s",
            ml: collapsed ? 0 : 2,
          }}
        />

        {!collapsed && !isMobile && (
          <IconButton sx={{ ml: 2 }} onClick={() => setCollapsed(!collapsed)}>
            <MenuOpen />
          </IconButton>
        )}
      </Box>

      <List>
        <Tooltip title={collapsed ? "Dashboard" : ""} placement="right">
          <ListItem
            button
            sx={{
              cursor: "pointer",
              py: 0.8,
              borderRadius: 2,
              justifyContent: collapsed ? "center" : "flex-start",
              bgcolor: selectedOption === "Dashboard" ? "black" : "white",
              color: selectedOption === "Dashboard" ? "white" : "black",
              "&:hover": {
                bgcolor: selectedOption === "Dashboard" ? "#26282B" : "#D9D9D9",
              },
              "& .MuiListItemIcon-root": {
                color: selectedOption === "Dashboard" ? "white" : "gray",
              },
            }}
            onClick={() => {
              setSelectedOption("Dashboard");
              if (isMobile) setDrawerOpen(false);
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <BarChartIcon />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{ fontSize: 14 }}
              />
            )}
          </ListItem>
        </Tooltip>
      </List>

      <List>
        <List>
          {menuGroups.map((group, groupIndex) => (
            <Box key={groupIndex} mb={2}>
              {!collapsed && group.title && (
                <Typography
                  variant="caption"
                  sx={{
                    pl: 2,
                    pb: 1,
                    display: "block",
                    color: "#888",
                    fontWeight: "bold",
                  }}
                >
                  {group.title}
                </Typography>
              )}
              {group.items.map((item, index) => (
                <Tooltip
                  key={index}
                  title={collapsed ? item.label : ""}
                  placement="right"
                >
                  <ListItem
                    button
                    sx={{
                      cursor: "pointer",
                      py: 0.8,
                      pt: 1,
                      borderRadius: 2,
                      transition: "all 0.2s ease",
                      bgcolor:
                        selectedOption === item.label && !item.logout
                          ? "black"
                          : "white",
                      color: item.logout
                        ? "#dc2626"
                        : selectedOption === item.label && !item.logout
                        ? "white"
                        : "black",
                      justifyContent: collapsed ? "center" : "flex-start",
                      "&:hover": {
                        bgcolor: item.logout
                          ? "#fee2e2"
                          : selectedOption === item.label && !item.logout
                          ? "#26282B"
                          : "#D9D9D9",
                      },
                      "& .MuiListItemIcon-root": {
                        color: item.logout
                          ? "#dc2626"
                          : selectedOption === item.label && !item.logout
                          ? "white"
                          : "gray",
                        minWidth: "unset",
                        mr: collapsed ? 0 : 1.5,
                        display: "flex",
                        justifyContent: "center",
                      },
                    }}
                    onClick={() => {
                      item.logout
                        ? handleLogout()
                        : setSelectedOption(item.label);
                      if (isMobile) setDrawerOpen(false);
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: item.logout ? 600 : undefined,
                        }}
                      />
                    )}
                  </ListItem>
                </Tooltip>
              ))}
              <Divider sx={{ my: 1 }} />
            </Box>
          ))}
        </List>
      </List>
    </Box>
  );

  // En mobile, usa Drawer
  if (isMobile) {
    return (
      <>
        <IconButton
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1301,
            bgcolor: "white",
            border: "1px solid #eee",
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuOpen />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 220,
              maxWidth: "80vw",
              bgcolor: "white",
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </>
    );
  }

  return sidebarContent;
};

export default SideBar;
