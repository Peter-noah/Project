import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      {/* Profile Picture */}
      <Avatar
        alt="User Profile"
        src="/images/profile-placeholder.png" // Placeholder profile picture
        sx={{ width: 120, height: 120, mb: 2 }}
      />

      {/* Welcome Message */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Welcome, User
      </Typography>

      {/* Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        PICKMAI
      </Typography>

      {/* Subtitle */}
      <Typography variant="h6" color="textSecondary">
        Your smart shopping assistant
      </Typography>
    </Box>
  );
}