import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");

    // Basic validation
    if (!name) {
      setNameError(true);
      setErrorMessage("Full name is required.");
      return;
    } else {
      setNameError(false);
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setErrorMessage("Please enter a valid email address.");
      return;
    } else {
      setEmailError(false);
    }

    if (password.length < 6) {
      setPasswordError(true);
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    } else {
      setPasswordError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setErrorMessage("Passwords do not match.");
      return;
    } else {
      setConfirmPasswordError(false);
    }

    // Log the form values (can be replaced with actual sign-up logic)
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // On successful signup, redirect to login page
    window.location.href = "/login";
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
          Register
        </Typography>
        <Typography variant="h6" textAlign="center" color="textSecondary" mb={2}>
          PickMai
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? errorMessage : ""}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? errorMessage : ""}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? errorMessage : ""}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? errorMessage : ""}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link href="/login" variant="body2" sx={{ color: "#000000", fontWeight: "bold" }}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}