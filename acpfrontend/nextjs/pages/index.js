import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button } from "@mui/material";
import Head from "next/head";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Check for the auth token to determine if the user is logged in
    const token = localStorage.getItem("authToken");

    // If a token exists, redirect to the home page and prevent back navigation
    if (token) {
      router.replace("/home");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>PICKMAI - Your smart shopping assistant</title>
      </Head>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
        bgcolor="white"
        textAlign="center"  // Centering text
      >
        {/* Title with larger font size */}
        <Typography 
          variant="h1" 
          fontWeight="bold" 
          gutterBottom={false} 
          sx={{ fontSize: '6rem' }}  // Increased to 6rem
        >
          PICKMAI
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ marginBottom: "2rem", fontSize: '1.25rem' }}  // Subtitle stays the same
        >
          Your smart shopping assistant
        </Typography>

        {/* Button Group */}
        <Box mt={2} display="flex" gap={2}>
          <Button
            variant="outlined"
            size="large"
            href="/login"
            sx={{
              width: 120,
              height: 48,  // Adjusted for button height
              borderColor: "black",
              color: "black",
              fontWeight: 'bold',
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Log in
          </Button>

          <Button
            variant="contained"
            size="large"
            href="/signup"
            sx={{
              width: 120,
              height: 48,  // Adjusted for button height
              bgcolor: "black",
              color: "white",
              fontWeight: 'bold',
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </>
  );
}