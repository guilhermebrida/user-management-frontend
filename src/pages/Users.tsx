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
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  last_login: Date;
  status: 'online' | 'offline';
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
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
        console.error("Erro ao buscar usuários:", error);
      }
    };

    getUsersInfo();
  }, []);


  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Authors Table
        </Typography>

        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Box
            sx={{
              background: "linear-gradient(to right, #1d8cf8, #3358f4)",
              color: "#fff",
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="h6">Authors Table</Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>NAME</strong></TableCell>
                  <TableCell><strong>ROLE</strong></TableCell>
                  <TableCell><strong>STATUS</strong></TableCell>
                  <TableCell><strong>LAST LOGIN</strong></TableCell>
                  <TableCell><strong>ACTION</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box>
                          <Typography fontWeight="bold">{user.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">{user.role}</Typography>
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
                        ? new Date(user.last_login).toLocaleString('pt-BR', {
                            timeZone: 'America/Sao_Paulo',
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })
                        : '-'}
                    </TableCell>
                    <TableCell>
                      <Button variant="text" size="small">Edit</Button>
                      <Button variant="text" size="small">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
}
