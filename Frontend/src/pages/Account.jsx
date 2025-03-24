import { Box, Typography } from "@mui/material";
import React from "react";

function Account() {
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
        <Typography>Account Page</Typography>
      </Box>
    </>
  );
}

export default Account;
