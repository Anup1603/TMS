import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { keyframes } from "@emotion/react";

// Keyframes for up-and-down animation
const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const AuthPage = () => {
  const theme = useTheme();
  const { authMode } = useParams(); // Get authMode from URL
  const navigate = useNavigate(); // For programmatic navigation
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check for mobile view
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    // Navigate to the other form
    navigate(`/auth/${authMode === "register" ? "login" : "register"}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row", // Stack vertically on mobile
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 4,
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Logo in the Top-Left Corner */}
      <Box
        sx={{
          position: "absolute",
          top: 16, // Professional margin from the top
          left: 16, // Professional margin from the left
          zIndex: 1, // Ensure the logo is above other elements
        }}
      >
        <Link to="/">
          <img
            src="/Logo3.webp" // Replace with your logo image URL
            alt="TMS Portal Logo"
            style={{
              width: "70px", // Adjust size as needed
              height: "auto",
              borderRadius: 50, // Add border radius for a modern look
            }}
          />
        </Link>
      </Box>

      {/* Left Section: Images */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // Needed for absolute positioning of child elements
          marginRight: isMobile ? 0 : 4, // Remove margin on mobile
          marginBottom: isMobile ? 4 : 0, // Add margin at the bottom on mobile
        }}
      >
        {/* First Image (Centered Vertically) */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "600px", // Adjust as needed
            marginTop: "10%",
            animation: `${floatAnimation} 3s ease-in-out infinite`, // Add animation
          }}
        >
          <img
            src="/LandingPageImg3.jpg" // Replace with your image URL
            alt="Main"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 16, // Add border radius for a modern look
              marginLeft: "-20%", // Adjust top margin as needed
            }}
          />

          {/* Second Image Container (Top-Right Corner of First Image) */}
          <Box
            sx={{
              position: "absolute",
              top: "-55%",
              right: "-30%",
              width: "80%", // Adjust size as needed
              height: "80%",
              transform: "translate(25%, -25%)", // Adjust positioning
              animation: `${floatAnimation} 3s ease-in-out infinite`, // Add animation
            }}
          >
            {/* First Image in Container (Left Half) */}
            <img
              src="/LandingPageImg2.jpg" // Replace with your image URL
              alt="Left"
              style={{
                width: "50%",
                height: "100%",
                borderRadius: 8, // Add border radius for a modern look
              }}
            />

            {/* Second and Third Images in Container (Right Half) */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1, // Add spacing between images
              }}
            >
              <img
                src="/LandingPageImg.jpg" // Replace with your image URL
                alt="Top Right"
                style={{
                  width: "100%",
                  height: "50%",
                  borderRadius: 8, // Add border radius for a modern look
                }}
              />
              <img
                src="/LandingPageImg3.jpg" // Replace with your image URL
                alt="Bottom Right"
                style={{
                  width: "100%",
                  height: "50%",
                  borderRadius: 8, // Add border radius for a modern look
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Section: Forms */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          maxWidth: "600px", // Limit form width
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {authMode === "register" ? "Register" : "Login"}
        </Typography>
        <Box
          component="form"
          sx={{
            width: isMobile ? "100%" : "70%", // Full width on mobile, half on desktop
            display: "flex",
            flexDirection: "column",
            gap: 2, // Add spacing between form fields
          }}
        >
          {authMode === "register" ? (
            <>
              <TextField label="Name" fullWidth required />
              <TextField label="Email" type="email" fullWidth required />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          ) : (
            <>
              <TextField label="Email" type="email" fullWidth required />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#836df7",
              "&:hover": { backgroundColor: "#6a5bbd" },
            }}
          >
            {authMode === "register" ? "Register" : "Login"}
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {authMode === "register"
            ? "Already have an account? "
            : "Don't have an account? "}
          <Button
            onClick={toggleForm}
            sx={{
              textTransform: "none",
              color: "#836df7",
              "&:hover": { color: "#6a5bbd" },
            }}
          >
            {authMode === "register" ? "Login here" : "Register here"}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthPage;
