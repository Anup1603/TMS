import { Box, Typography } from "@mui/material";
import React from "react";

function Tenant() {
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
        <Typography>Tenants Management Page</Typography>
      </Box>
    </>
  );
}

export default Tenant;
