import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Billing() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!(token && storedUser)) {
      navigate("/"); // Redirect to homepage if not logged in
    }
  }, [navigate]);

  return (
    <>
      <Box
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography>Billing Management Page</Typography>
      </Box>
    </>
  );
}

export default Billing;
