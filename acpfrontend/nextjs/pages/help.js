import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function HelpPage() {
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
          Help & Support
        </Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary">
          Welcome to the Help page. How can we assist you today?
        </Typography>
        <Typography variant="body2" textAlign="center" color="textSecondary" mt={2}>
          More information and FAQs will be added here.
        </Typography>
      </Paper>
    </Box>
  );
}