import { Box, Button, Container, TextField, Typography, Tabs, Tab, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const url = "http://localhost:3000"
  const [mode, setMode] = useState<"register" | "login">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [email, setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');

  const backgroudImage = "https://wallpapercave.com/wp/wp3327108.jpg";


    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      console.log(email)
  };

      const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      console.log(password)
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password
      });

      console.log(response);
      const token = response.data.access_token;
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Usuário logado com role:", payload.role);
      if (payload.role == 'admin'){
        window.location.href = "/users"
      }
      if (payload.role == 'user'){
        window.location.href = "/"
      }
      
    } catch (err) {
      console.error("Erro no login", err);
    }
  };

  return (
    <Box 
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(87deg, #11cdef 0%, #1171ef 100%)",
      }}
    >
      <Container disableGutters
        sx={{
          margin: 0,
          height: "540px",
          width: "900px",
          display: "flex",
          flexDirection: "row",
          borderRadius: 3,
          boxShadow: 4,
          overflow: "hidden",
          padding: 0,
        }}
      >
        <Box
          sx={{
            flex: 0.5,
            backgroundImage: `url(${backgroudImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: 0
          }}
        />
        <Box
          sx={{
            flex: 0.5,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(247, 250, 252)"
          }}
        >
          <Box display={"flex"} justifyContent={"center" } alignItems={"center"}>
            <Tabs
              value={mode}
              onChange={(e, newValue) => setMode(newValue)}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab value="login" label="LOGIN" />
              <Tab value="register" label="REGISTER" />
            </Tabs>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              gap: 2
            }}
          >
            {mode === 'login' ? (
              <>
                <Typography variant="h3" gutterBottom sx={{ color: "#12325c" }}>
                  Sign In
                </Typography>
                <TextField fullWidth placeholder="Email" variant="outlined" size="small" onChange={handleChangeEmail} value={email} sx={{ width: "350px" }} />
                <TextField fullWidth placeholder="Senha" type="password" variant="outlined" size="small" onChange={handleChangePass} value={password} sx={{ width: "350px" }} />
                <Button size="small" onClick={handleSubmit} sx={{ bgcolor: "#12325c", color: "#ffffff", mt: 1 }} >
                  Sign in
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h3" gutterBottom sx={{ color: "#12325c" }}>
                  Register
                </Typography>
                <TextField label="Full Name" fullWidth size="small" sx={{ width: "350px" }} />
                <TextField label="Email Address" fullWidth size="small" sx={{ width: "350px" }} />
                {/* <TextField label="Mobile Number" fullWidth size="small" sx={{ width: "350px" }} /> */}
                <TextField label="Set Password" type="password" fullWidth size="small" sx={{ width: "350px" }} />
                <Button size="small" sx={{ bgcolor: "#12325c", color: "#ffffff", mt: 1 }} >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

