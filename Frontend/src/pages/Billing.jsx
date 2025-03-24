import { Box, Typography } from "@mui/material";
import React from "react";

function Billing() {
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
