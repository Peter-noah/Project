import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();  // Initialize router
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!token || !userData) {
      router.replace("/login"); // Redirect if not logged in
    } else {
      setUsername(userData.username); // Set the username from local storage
    }
  }, [router]);

  const handleGoShoppingClick = () => {
    // Add query parameter to trigger search
    router.push("/?triggerSearch=true");  // Navigates to the home page with search bar triggered
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    router.push("/login");  // Redirect to login page on logout
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
      {/* Profile Picture or Initials Avatar */}
      <Avatar
        alt="User Profile"
        src="/images/profile-placeholder.png"  // Placeholder profile picture
        sx={{ width: 120, height: 120, mb: 2 }}
      >
        {username ? username.charAt(0).toUpperCase() : "?"}  {/* Fallback to '?' */}
      </Avatar>

      {/* Welcome Message */}
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#333333" }}  // Darker gray text for readability
      >
        Welcome, {username || "User"}
      </Typography>

      {/* Title */}
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "#333333" }}  // Darker gray text for readability
      >
        PICKMAI
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: "#555555" }}  // Slightly lighter dark gray for subtitle
      >
        I am your smart shopping assistant
      </Typography>

      {/* Go Shopping Button */}
      <Button
        variant="contained"
        size="large"
        onClick={handleGoShoppingClick}
        sx={{
          mt: 2,  // Adds margin to the top of the button
          backgroundColor: "#A9A9A9",  // Medium gray button
          color: "#ffffff",  // White text for contrast
          "&:hover": {
            backgroundColor: "#7D7C7C",  // Darker gray on hover
          },
        }}
      >
        Go shopping
      </Button>

      {/* Logout Button */}
      <Button
        variant="outlined"
        size="large"
        onClick={handleLogout}
        sx={{
          mt: 2,  // Margin-top for spacing
          borderColor: "#333333",  // Dark gray border
          color: "#333333",  // Matching text color
          "&:hover": {
            backgroundColor: "#f5f5f5",  // Slightly lighter gray on hover
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
}