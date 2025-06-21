import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  last_login: Date;
  status: "online" | "offline";
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const url = "http://localhost:3000";

  useEffect(() => {
    const getUsersInfo = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${url}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsersInfo();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 2,
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "#1e2a40",
            textAlign: "center",
            mb: 4,
          }}
        >
          Registered Users
        </Typography>

        <Paper
          elevation={5}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(to right, #1d8cf8, #3358f4)",
              color: "#fff",
              px: 4,
              py: 2.5,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Users Table
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Last Login</strong></TableCell>
                  <TableCell align="center" ><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={5}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Skeleton variant="circular" width={40} height={40} />
                          <Box width="100%">
                            <Skeleton width="40%" height={20} />
                            <Skeleton width="60%" height={15} />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  users.map((user, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                          />
                          <Box>
                            <Typography fontWeight="bold">{user.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold" color="text.primary">
                          {user.role}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status.toUpperCase()}
                          color={user.status === "online" ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="text" size="small" sx={{ color: "#1d8cf8" }}>
                          Edit
                        </Button>
                        <Button variant="text" size="small" sx={{ color: "#f44336" }}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}
