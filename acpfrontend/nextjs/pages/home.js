import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useRouter } from "next/router";  // Import useRouter for navigation

export default function HomePage() {
  const router = useRouter();  // Initialize router

  const handleGoShoppingClick = () => {
    // Redirect to the search page or focus the search bar in the NavigationBar
    router.push("/");  // Navigates to the home page, where the search bar is located
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"  // Light gray background
    >
      {/* Profile Picture */}
      <Avatar
        alt="User Profile"
        src="/images/profile-placeholder.png" // Placeholder profile picture
        sx={{ width: 120, height: 120, mb: 2 }}
      />

      {/* Welcome Message */}
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#333333" }}  /* Darker gray text for readability */
      >
        Welcome, User
      </Typography>

      {/* Title */}
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#333333" }}  /* Darker gray text for readability */
      >
        PICKMAI
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "#555555" }}  /* Slightly lighter dark gray for subtitle */
      >
        Your smart shopping assistant
      </Typography>

      {/* Go Shopping Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleGoShoppingClick}
        sx={{
          mt: 2,  // Adds margin to the top of the button
          backgroundColor: "#A9A9A9",  // Medium gray button
          color: "#ffffff",  // White text on the button for contrast
          "&:hover": {
            backgroundColor: "#7D7C7C",  // Darker gray on hover for contrast
          },
        }}
      >
        Go shopping
      </Button>
    </Box>
  );
}
