import React, { useState } from "react";
import { 
  Box, 
  Button, 
  Snackbar, 
  TextField, 
  Typography, 
  Link, 
  Paper, 
  Alert 
} from "@mui/material";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!registerName) {
      setNameError(true);
      setErrorMessage("Username is required.");
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      setEmailError(true);
      setErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (registerPassword.length < 6) {
      setPasswordError(true);
      setErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (registerPassword !== registerConfirmPassword) {
      setConfirmPasswordError(true);
      setErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
    }

    return isValid;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      setSnackbarMessage("Please fix the errors and try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerName,
          email: registerEmail,
          password_hash: registerPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Signup failed");
      }

      // Show success message and redirect to login page
      setSnackbarMessage("Signup successful! Redirecting to login...");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        router.push("/login"); // Redirect to login page after 2 seconds
      }, 2000);
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
        <Typography variant="h3" textAlign="center" fontWeight="bold">
          Sign Up
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="textSecondary"
          mb={2}
        >
          PickMai
        </Typography>

        <Box
          component="form"
          onSubmit={handleRegisterSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Username"
            type="text"
            fullWidth
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            error={nameError}
            helperText={nameError ? errorMessage : ""}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? errorMessage : ""}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? errorMessage : ""}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={registerConfirmPassword}
            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? errorMessage : ""}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#000000",
              "&:hover": { backgroundColor: "#333333" },
            }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link
            href="/login"
            variant="body2"
            sx={{ color: "#000000", fontWeight: "bold" }}
          >
            Sign In
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