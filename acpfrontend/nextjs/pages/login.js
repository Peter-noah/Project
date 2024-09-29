import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";

export default function SimpleLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    // Basic client-side validation
    let valid = true;

    if (!email) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (valid) {
      // Redirect directly to the home page if both fields are valid
      window.location.href = "/home";
    }
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
          Log in
        </Typography>
        <Typography variant="h6" textAlign="center" color="textSecondary" mb={2}>
          PickMai
        </Typography>

        <Box component="form" onSubmit={handleSignIn} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Username or Email"
            type="text"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Please enter your email/username" : ""}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? "Please enter your password" : ""}
          />

          <Link
            href="/forgot-password"
            variant="body2"
            textAlign="right"
            sx={{ color: "#007BFF", cursor: "pointer" }}
          >
            Forgot Password?
          </Link>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
          >
            Sign In
          </Button>
        </Box>

        <Typography textAlign="center" mt={2}>
          Don't have an account?{" "}
          <Link href="/signup" variant="body2" sx={{ color: "#000000", fontWeight: "bold" }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}