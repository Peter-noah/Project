import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/router";

export default function AuthPage() {
  const [identifier, setIdentifier] = useState(""); // Username or email
  const [password_hash, setPasswordHash] = useState("");
  const [identifierError, setIdentifierError] = useState(false);
  const [passwordHashError, setPasswordHashError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.replace("/home"); // Redirect if already logged in
    }
  }, [router]);

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
      setPasswordHashError(true);
      isValid = false;
    } else {
      setPasswordHashError(false);
    }

    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    // Validate input fields
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
          identifier: identifier,    // Username or email
          password_hash: password_hash, // Raw password
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }
  
      const data = await response.json();
  
      // Store auth token and user data
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data));
  
      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
  
      // Redirect after success
      setTimeout(() => {
        router.replace("/home");
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
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
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
            label="Password"
            type="password"
            fullWidth
            value={password_hash}
            onChange={(e) => setPasswordHash(e.target.value)}
            error={passwordHashError}
            helperText={passwordHashError ? "Please enter your password" : ""}
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