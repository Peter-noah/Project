import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setErrorMessage("Please enter a valid email address.");
      return;
    } else {
      setEmailError(false);
    }

    // Handle password reset logic here
    console.log("Password reset email sent to:", email);
    setSuccessMessage("A password reset link has been sent to your email.");

    // Redirect to login page after success message
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
        <Typography variant="h3" textAlign="center" fontWeight="bold">
          Forgot Password
        </Typography>
        <Typography variant="h6" textAlign="center" color="textSecondary" mb={2}>
          PickMai
        </Typography>

        {successMessage && (
          <Typography color="primary" textAlign="center" mb={2}>
            {successMessage}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? errorMessage : ""}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
          >
            Send Reset Link
          </Button>
        </Box>

        <Typography textAlign="center" mt={2}>
          <Link href="/login" variant="body2" sx={{ color: "#000000", fontWeight: "bold" }}>
            Back to login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}