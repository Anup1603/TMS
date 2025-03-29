import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Snackbar,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "../axiosInstance";

function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const fetchUser = JSON.parse(localStorage.getItem("user")) || {};

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/users/${fetchUser._id}`);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmitPasswordChange = async () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Passwords don't match!",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Password must be at least 6 characters!",
      });
      return;
    }

    try {
      // Make API call to update password
      const response = await axios.put(`/api/users/${user._id}`, {
        password: passwordData.newPassword,
      });
      console.log(response);

      // Handle successful response
      setSnackbar({
        open: true,
        severity: "success",
        message: response.data.message || "Password updated successfully!",
      });

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordChange(false);
    } catch (error) {
      // Handle error response
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update password. Please try again.";

      setSnackbar({
        open: true,
        severity: "error",
        message: errorMessage,
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: "32px", right: "15px" }}>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: "#836df7",
            color: "white",
            "&:hover": { backgroundColor: "#6a5bbd" },
          }}
        >
          Log Out
        </Button>
      </div>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "600px",
          borderRadius: 2,
        }}
      >
        {/* User Profile Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: `${getRandomColor()}`,
              mb: 2,
              fontSize: "2rem",
            }}
          >
            {user.name?.charAt(0).toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h5" component="h1" gutterBottom>
            Account Settings
          </Typography>
        </Box>

        {/* User Details Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Personal Information
          </Typography>
          <TextField
            fullWidth
            label="User ID"
            value={user && user._id ? user._id.slice(-6).toUpperCase() : "N/A"}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Name"
            value={user.name || "N/A"}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={user.email || "N/A"}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Password Change Section */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Security
          </Typography>

          {!showPasswordChange ? (
            <Button
              variant="outlined"
              startIcon={<LockIcon />}
              sx={{
                borderColor: "#836df7",
                color: "#836df7",
                "&:hover": { borderColor: "#6a5bbd", color: "#6a5bbd" },
              }}
              onClick={() => setShowPasswordChange(true)}
            >
              Change Password
            </Button>
          ) : (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type={showPassword.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword("current")}
                        edge="end"
                      >
                        {showPassword.current ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type={showPassword.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword("new")}
                        edge="end"
                      >
                        {showPassword.new ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => toggleShowPassword("confirm")}
                        edge="end"
                      >
                        {showPassword.confirm ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#836df7",
                    color: "#836df7",
                    "&:hover": { borderColor: "#6a5bbd", color: "#6a5bbd" },
                  }}
                  onClick={() => setShowPasswordChange(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmitPasswordChange}
                  sx={{
                    backgroundColor: "#836df7",
                    color: "white",
                    "&:hover": { backgroundColor: "#6a5bbd" },
                  }}
                  fullWidth
                  disabled={
                    !passwordData.currentPassword ||
                    !passwordData.newPassword ||
                    !passwordData.confirmPassword
                  }
                >
                  Update Password
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Account;
