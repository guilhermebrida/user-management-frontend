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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  last_login: Date;
  status: "online" | "offline";
}

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);
  const url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getUsersInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") {
        navigate("/");
        return;
      }

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
  }, [navigate]);

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    setDeleting(true);
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${url}/users/${userToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(false);
    }
  };

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
                  <TableCell align="center"><strong>Actions</strong></TableCell>
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
                        <Button
                          variant="text"
                          size="small"
                          sx={{ color: "#1d8cf8" }}
                          onClick={() => navigate(`/users/edit/${user.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ color: "#f44336" }}
                          onClick={() => setUserToDelete(user)}
                        >
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

      <Dialog open={!!userToDelete} onClose={() => setUserToDelete(null)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{" "}
            <strong>{userToDelete?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserToDelete(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteUser}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
