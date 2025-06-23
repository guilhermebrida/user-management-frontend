import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const id = payload?.sub;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${url}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        console.error("Error loading user", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    if ((newPassword || confirmPassword) && newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      await axios.put(
        `${url}/users/${id}/profile`,
        {
          name,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Profile updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Update failed:", err);
      setMessage(err?.response?.data?.message || "Error updating profile.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 2,
        background: "linear-gradient(135deg, #f0f0f0, #e3f2fd)",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ borderRadius: 4, p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Edit Your Profile
          </Typography>

          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              <TextField label="Name" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)}/>
              <TextField label="Email" fullWidth margin="normal" value={email} disabled/>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight="bold">
                Change Password (optional)
              </Typography>
              <TextField label="Current Password" type="password" fullWidth margin="normal" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
              <TextField label="New Password" type="password" fullWidth margin="normal" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
              <TextField label="Confirm New Password" type="password" fullWidth margin="normal" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

              {message && (
                <Typography color={message.includes("successfully") ? "green" : "error"} mt={2}>
                  {message}
                </Typography>
              )}

              <Box mt={3}>
                <Button variant="contained" fullWidth onClick={handleUpdate}>
                  Save Changes
                </Button>
                <Button variant="text" color="inherit" fullWidth sx={{ mt: 1 }} onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
