import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

export default function TransparentNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ❌ Ocultar Navbar em rotas públicas
  const hideNavbarOnRoutes = ["/login", "/register"];
  if (hideNavbarOnRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        backdropFilter: "none",
        color: "white",
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ justifyContent: "end" }}>

        <Box display="flex" alignItems="center" gap={2}>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            color="black"
            sx={{ mx: 1 }}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/users"
            underline="none"
            color="black"
            sx={{ mx: 1 }}
          >
            Users
          </Link>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
