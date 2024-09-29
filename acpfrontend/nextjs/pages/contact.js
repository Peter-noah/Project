import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function ContactPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Paper elevation={3} sx={{ padding: 4, width: '80%', maxWidth: 600 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
          Contact Us
        </Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary">
          Have questions? We'd love to hear from you.
        </Typography>
        <Typography variant="body2" textAlign="center" color="textSecondary" mt={2}>
          You can reach us via email or phone. More details will be added soon.
        </Typography>
      </Paper>
    </Box>
  );
}