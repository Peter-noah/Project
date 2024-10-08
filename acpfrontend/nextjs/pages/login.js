import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

export default function AuthPage() {
  const [identifier, setIdentifier] = useState(""); // Combined username/email
  const [password_hash, setpassword_hash] = useState("");
  const [identifierError, setIdentifierError] = useState(false);
  const [password_hashError, setpassword_hashError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!identifier.trim()) {
      setIdentifierError(true);
      isValid = false;
    } else {
      setIdentifierError(false);
    }

    if (!password_hash) {
      setpassword_hashError(true);
      isValid = false;
    } else {
      setpassword_hashError(false);
    }

    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: identifier, // Use 'identifier' instead of separate username/email
          password_hash: password_hash, // Send raw password_hash
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      // Assuming the response contains user data or tokens
      const data = await response.json();
      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Redirect to the home page after a short delay to allow users to see the success message
      setTimeout(() => {
        window.location.href = "/home";
      }, 1500);
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
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
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          Log In
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="textSecondary"
          mb={3}
        >
          PickMai
        </Typography>

        <Box
          component="form"
          onSubmit={handleLoginSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Username or Email"
            type="text"
            fullWidth
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            error={identifierError}
            helperText={
              identifierError ? "Please enter your username or email" : ""
            }
          />

          <TextField
            label="password"
            type="password"
            fullWidth
            value={password_hash}
            onChange={(e) => setpassword_hash(e.target.value)}
            error={password_hashError}
            helperText={password_hashError ? "Please enter your password_hash" : ""}
          />

          <Link
            href="/forgot-password"
            variant="body2"
            textAlign="right"
            sx={{ color: "#007BFF", cursor: "pointer", alignSelf: "flex-end" }}
          >
            Forgot password?
          </Link>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#000000",
              "&:hover": { backgroundColor: "#333333" },
              textTransform: "none",
              padding: "10px",
              fontSize: "16px",
            }}
          >
            Sign In
          </Button>
        </Box>

        <Typography textAlign="center" mt={3}>
          Don't have an account?{" "}
          <Link
            href="/signup"
            variant="body2"
            sx={{ color: "#000000", fontWeight: "bold" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}