import { Box, Typography } from "@mui/material";
import React from "react";

function Property() {
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
        <Typography>Property Management Page</Typography>
      </Box>
    </>
  );
}

export default Property;
