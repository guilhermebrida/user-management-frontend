import React from "react";
import { AppBar, Toolbar, Button, Typography, Box, Link} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

export default function TransparentNavbar() {
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
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          MeuSite
        </Typography>
        <Box >
          {/* <Button sx={{ color: "white", textTransform: "none", mx: 1 }}>Home</Button>
          <Button sx={{ color: "white", textTransform: "none", mx: 1 }}>Algorithms</Button>
          <Button sx={{ color: "white", textTransform: "none", mx: 1 }}>Contato</Button>
          <Button sx={{ color: "white", textTransform: "none", mx: 1 }}><GitHubIcon fontSize="smal" sx={{marginRight:1}}/> Github</Button> */}
          <Link component={RouterLink} to="/" underline="none" color="white" mx={1}>Home</Link>
          <Link component={RouterLink} to="/users" underline="none" color="white" mx={1}>Users</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
