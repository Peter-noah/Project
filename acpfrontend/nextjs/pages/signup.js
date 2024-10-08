//import React, { useState } from "react";
//import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";
//
//export default function SignUp() {
//  const [name, setName] = useState("");
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [confirmPassword, setConfirmPassword] = useState("");
//  const [nameError, setNameError] = useState(false);
//  const [emailError, setEmailError] = useState(false);
//  const [passwordError, setPasswordError] = useState(false);
//  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
//  const [errorMessage, setErrorMessage] = useState("");
//  const [openSnackbar, setOpenSnackbar] = useState(false);
//  const [snackbarMessage, setSnackbarMessage] = useState('');
//  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//
//  // Client-side navigation after successful signup
//  const redirectToLogin = () => {
//    // Ensure window is accessed only in the browser
//    if (typeof window !== 'undefined') {
//      window.location.href = "/login";
//    }
//  };
//
//  const handleSubmit = async(e) => {
//    e.preventDefault();
//    setErrorMessage("");
//
//    // Basic validation
//    if (!name) {
//      setNameError(true);
//      setErrorMessage("Full name is required.");
//      return;
//    } else {
//      setNameError(false);
//    }
//
//    if (!/\S+@\S+\.\S+/.test(email)) {
//      setEmailError(true);
//      setErrorMessage("Please enter a valid email address.");
//      return;
//    } else {
//      setEmailError(false);
//    }
//
//    if (password.length < 6) {
//      setPasswordError(true);
//      setErrorMessage("Password must be at least 6 characters long.");
//      return;
//    } else {
//      setPasswordError(false);
//    }
//
//    if (password !== confirmPassword) {
//      setConfirmPasswordError(true);
//      setErrorMessage("Passwords do not match.");
//      return;
//    } else {
//      setConfirmPasswordError(false);
//    }
//
//    // Log the form values (can be replaced with actual sign-up logic)
//    //console.log("Name:", name);
//    //console.log("Email:", email);
//    //console.log("Password:", password);
//    try {
//      const response = await fetch('/api/users/create', {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//        },
//        body: JSON.stringify({
//          username: name,
//          email: email,
//          password_hash: password,
//        }),
//      });
// 
// 
//      if (!response.ok) {
//        const errorData = await response.json();
//        throw new Error(errorData.detail || 'Registration failed');
//      }
// 
// 
//      const data = await response.json();
//      setSnackbarMessage('Registration successful!');
//      setSnackbarSeverity('success');
//      setOpenSnackbar(true);
//      // Redirect after successful registration
//      redirectToLogin();
//    }catch (error) {
//      setSnackbarMessage(error.message);
//      setSnackbarSeverity('error');
//      setOpenSnackbar(true);
//    }
//  };  
//
//  return (
//    <Box
//      display="flex"
//      justifyContent="center"
//      alignItems="center"
//      minHeight="100vh"
//      bgcolor="#f9f9f9"
//    >
//      <Paper elevation={3} sx={{ padding: 4, width: 360 }}>
//        <Typography variant="h3" textAlign="center" fontWeight="bold">
//          Register
//        </Typography>
//        <Typography variant="h6" textAlign="center" color="textSecondary" mb={2}>
//          PickMai
//        </Typography>
//
//        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
//          <TextField
//            label="Username"
//            type="text"
//            fullWidth
//            value={name}
//            onChange={(e) => setName(e.target.value)}
//            error={nameError}
//            helperText={nameError ? errorMessage : ""}
//          />
//
//          <TextField
//            label="Email"
//            type="email"
//            fullWidth
//            value={email}
//            onChange={(e) => setEmail(e.target.value)}
//            error={emailError}
//            helperText={emailError ? errorMessage : ""}
//          />
//
//          <TextField
//            label="Password"
//            type="password"
//            fullWidth
//            value={password}
//            onChange={(e) => setPassword(e.target.value)}
//            error={passwordError}
//            helperText={passwordError ? errorMessage : ""}
//          />
//
//          <TextField
//            label="Confirm Password"
//            type="password"
//            fullWidth
//            value={confirmPassword}
//            onChange={(e) => setConfirmPassword(e.target.value)}
//            error={confirmPasswordError}
//            helperText={confirmPasswordError ? errorMessage : ""}
//          />
//
//          <Button
//            type="submit"
//            variant="contained"
//            fullWidth
//            sx={{ backgroundColor: "#000000", "&:hover": { backgroundColor: "#333333" } }}
//          >
//            Sign Up
//          </Button>
//        </Box>
//
//        <Typography textAlign="center" mt={2}>
//          Already have an account?{" "}
//          <Link href="/login" variant="body2" sx={{ color: "#000000", fontWeight: "bold" }}>
//            Sign in
//          </Link>
//        </Typography>
//      </Paper>
//    </Box>
//  );
//}
import React, { useState } from "react";
//import { TextField, Button, Grid, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { Box, Button, Snackbar, TextField, Typography, Link, Paper, Alert} from "@mui/material";

export default function AuthPage() {
 const [loginEmail, setLoginEmail] = useState('');
 const [loginPassword, setLoginPassword] = useState('');
 const [registerName, setRegisterName] = useState('');
 const [registerEmail, setRegisterEmail] = useState('');
 const [registerPassword, setRegisterPassword] = useState('');
 const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
 const [nameError, setNameError] = useState(false);
 const [emailError, setEmailError] = useState(false);
 const [passwordError, setPasswordError] = useState(false);
 const [confirmPasswordError, setConfirmPasswordError] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");
 const [openSnackbar, setOpenSnackbar] = useState(false);
 const [snackbarMessage, setSnackbarMessage] = useState('');
 const [snackbarSeverity, setSnackbarSeverity] = useState('success');


 const handleSnackbarClose = () => {
   setOpenSnackbar(false);
 };

 const handleRegisterSubmit = async (e) => {
   e.preventDefault();
   if (registerPassword !== registerConfirmPassword) {
     setSnackbarMessage('Passwords do not match');
     setSnackbarSeverity('error');
     setOpenSnackbar(true);
     return;
   }


   try {
     const response = await fetch('/api/users/create', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         username: registerName,
         email: registerEmail,
         password_hash: registerPassword,
       }),
     });


     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.detail || 'Registration failed');
     }


     const data = await response.json();
     setSnackbarMessage('Registration successful!');
     setSnackbarSeverity('success');
     setOpenSnackbar(true);
     // Handle successful registration (e.g., redirect)
   } catch (error) {
     setSnackbarMessage(error.message);
     setSnackbarSeverity('error');
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
          Register
        </Typography>
        <Typography variant="h6" textAlign="center" color="textSecondary" mb={2}>
          PickMai
        </Typography>

        <Box component="form" onSubmit={handleRegisterSubmit} display="flex" flexDirection="column" gap={2}>
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
