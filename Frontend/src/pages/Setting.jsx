import { Box, Typography } from "@mui/material";
import React from "react";

function Setting() {
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
        <Typography>Settings Page</Typography>
      </Box>
    </>
  );
}

export default Setting;
