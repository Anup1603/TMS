import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

// Keyframes for up-and-down animation
const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check for mobile view
  const navigate = useNavigate(); // For programmatic navigation

  // State for progress loader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      navigate("/dashboard/property"); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  // Handle button click with loader
  const handleButtonClick = (path) => {
    setLoading(true); // Show loader
    setTimeout(() => {
      navigate(path); // Navigate after 500ms
    }, 300);
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
        overflow: "hidden", // Prevent overflow
        position: "relative", // Needed for absolute positioning of the logo
      }}
    >
      {/* Progress Loader */}
      {loading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            // Ensure loader is above other elements
          }}
        />
      )}

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
              animation: `${floatAnimation} 2s ease-in-out infinite`, // Add animation
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

      {/* Right Section: Buttons */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            zIndex: 1,
          }}
        >
          Welcome to Our Tenant Management Portal
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: 4, color: "text.secondary" }}
        >
          A comprehensive Tenant Management Portal enabling seamless property
          and tenant management with efficient tracking, automation, and secure
          access.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Stack buttons vertically on mobile
            gap: 2, // Add spacing between buttons
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#836df7",
              color: "white",
              "&:hover": { backgroundColor: "#6a5bbd" },
            }}
            onClick={() => handleButtonClick("/auth/register")}
          >
            Register
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#836df7",
              color: "#836df7",
              "&:hover": { borderColor: "#6a5bbd", color: "#6a5bbd" },
            }}
            onClick={() => handleButtonClick("/auth/login")}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
