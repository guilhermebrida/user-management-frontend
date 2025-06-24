import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Chip,
  Divider,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  last_login: Date;
  created_at: Date;
  status: "online" | "offline";
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_URL; 

  useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.sub;

      try {
        const response = await axios.get(`${url}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading || !user) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Paper elevation={4} sx={{ borderRadius: 4, p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              alignItems: ["center", "flex-start"],
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: ["100%", "30%"],
              }}
            >
              <Skeleton variant="circular" width={100} height={100} />
              <Skeleton variant="text" width={120} height={30} sx={{ mt: 2 }} />
              <Skeleton variant="text" width={180} height={20} />
              <Skeleton variant="rectangular" width={60} height={24} sx={{ mt: 1, borderRadius: 1 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width={160} height={40} />
              <Divider sx={{ mb: 2 }} />
              <Skeleton variant="text" width="40%" height={25} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="60%" height={25} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="40%" height={25} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="60%" height={25} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="40%" height={25} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="60%" height={25} />
              <Box mt={4}>
                <Skeleton variant="rectangular" width={120} height={36} />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ borderRadius: 4, p: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "row"],
              alignItems: ["center", "flex-start"],
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: ["100%", "30%"],
              }}
            >
              <Avatar
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h6" mt={2}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              <Chip
                label={user.status}
                color={user.status === "online" ? "success" : "default"}
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                User Profile
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box mb={2}>
                <Typography variant="subtitle2">Role</Typography>
                <Typography variant="body1" fontWeight="medium">
                  {user.role}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2">Last Login</Typography>
                <Typography variant="body1">
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "-"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Account Created</Typography>
                <Typography variant="body1">
                  {new Date(user.created_at).toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
              <Box mt={4}>
                <Button variant="contained" color="primary" onClick={()=> window.location.href = "/users/edit/profile"}>
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
