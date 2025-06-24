import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
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

  const hideNavbarOnRoutes = ["/login", "/register"];
  if (hideNavbarOnRoutes.includes(location.pathname)) {
    return null;
  }

  const token = localStorage.getItem("token");
  let role = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch {
      role = null;
    }
  }

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{ backgroundColor: "transparent", boxShadow: "none", backdropFilter: "none", color: "black", zIndex: 1300,}}
    >
      <Toolbar sx={{ justifyContent: "end" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Link component={RouterLink} to="/" underline="none" color="black" sx={{ mx: 1 }} >
            Home
          </Link>

          {role === "admin" && (
            <Link component={RouterLink} to="/users" underline="none" color="black" sx={{ mx: 1 }}>
              Users
            </Link>
          )}

          <Button variant="outlined" color="error" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
