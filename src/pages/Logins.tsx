import { Box, Button, Container, TextField, Typography, Tabs, Tab, CircularProgress} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import backgroudImage from "../assets/wp3327108.webp"

export default function Login() {
  const url = process.env.REACT_APP_API_URL;
  const [mode, setMode] = useState<"register" | "login">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerName, setRegisterName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // const backgroudImage = "https://wallpapercave.com/wp/wp3327108.jpg";

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeRegisterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterName(e.target.value);
  };

  const handleChangeRegisterEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterEmail(e.target.value);
  };

  const handleChangeRegisterPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterPassword(e.target.value);
  };


  useEffect(() => {
    const checkIfLoggedIn = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));

          if (payload.role === "admin") {
            window.location.href = "/users";
          } else if (payload.role === "user") {
            window.location.href = "/";
          }
        } catch (err) {
          console.error("Invalid token", err);
          localStorage.removeItem("token"); 
        }
      }
    };

    checkIfLoggedIn();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role === "admin") {
        window.location.href = "/users";
      } else if (payload.role === "user") {
        window.location.href = "/";
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setErrorMsg("Incorrect email or password.");
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await axios.post(`${url}/auth/register`, {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        role: "user",
      });

      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setMode("login");
    } catch (error: any) {
      if (error.response) {
        setErrorMsg(error.response.data.message || "Registration failed.");
      } else {
        setErrorMsg("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
      <Container
        disableGutters
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
            padding: 0,
          }}
        />
        <Box
          sx={{
            flex: 0.5,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(247, 250, 252)",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Tabs
              value={mode}
              onChange={(e, newValue) => {
                setMode(newValue);
                setErrorMsg("");
              }}
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
              gap: 2,
            }}
          >
            {mode === "login" ? (
              <>
                <Typography variant="h3" gutterBottom sx={{ color: "#12325c" }}>
                  Sign In
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  size="small"
                  onChange={handleChangeEmail}
                  value={email}
                  sx={{ width: "350px" }}
                />
                <TextField
                  fullWidth
                  placeholder="Senha"
                  type="password"
                  variant="outlined"
                  size="small"
                  onChange={handleChangePass}
                  value={password}
                  sx={{ width: "350px" }}
                />

                {errorMsg && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {errorMsg}
                  </Typography>
                )}

                <Button size="small" onClick={handleSubmit} sx={{ bgcolor: "#12325c", color: "#ffffff", mt: 1 }} disabled={loading} >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h3" gutterBottom sx={{ color: "#12325c" }} >
                  Register
                </Typography>
                <TextField
                  placeholder="Full Name"
                  fullWidth
                  size="small"
                  sx={{ width: "350px" }}
                  onChange={handleChangeRegisterName}
                  value={registerName}
                />
                <TextField
                  placeholder="Email Address"
                  fullWidth
                  size="small"
                  sx={{ width: "350px" }}
                  onChange={handleChangeRegisterEmail}
                  value={registerEmail}
                />
                <TextField
                  placeholder="Set Password"
                  type="password"
                  fullWidth
                  size="small"
                  sx={{ width: "350px" }}
                  onChange={handleChangeRegisterPass}
                  value={registerPassword}
                />

                <Button size="small" sx={{ bgcolor: "#12325c", color: "#ffffff", mt: 1 }} onClick={handleRegister} disabled={loading} >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Register"
                  )}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
