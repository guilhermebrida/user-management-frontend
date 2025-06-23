import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  TextField,
  Typography,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  last_login: Date;
  status: "online" | "offline";
}

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");

  const url = "http://localhost:3000";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(`${url}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        });
      } catch (err) {
        console.error("Failed to fetch user", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${url}/users/${user.id}`,
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDialogOpen(true); 
    } catch (err) {
      console.error("Failed to update user", err);
      setError("Error updating user.");
    } finally {
      setSaving(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/users"); 
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return <Typography>{error || "User not found."}</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={4} sx={{ borderRadius: 4, p: 4 }}>
        <Box display="flex" flexDirection="row" gap={4}>
          <Box display="flex" flexDirection="column" alignItems="center" width="30%">
            <Avatar
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
              sx={{ width: 100, height: 100 }}
            />
            <Chip
              label={user.status}
              color={user.status === "online" ? "success" : "default"}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold">
              Edit User
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />

            <TextField
              fullWidth
              name="role"
              label="Role"
              value={formData.role}
              onChange={handleChange}
              margin="normal"
            />

            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>User Updated</DialogTitle>
        <DialogContent>
          <Typography>The user's information has been successfully updated.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
