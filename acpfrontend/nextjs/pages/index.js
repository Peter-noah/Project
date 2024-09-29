import { Box, Typography, Button } from "@mui/material";
import Head from "next/head";

export default function Home() {
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
      >
        {/* Reduced gap between PICKMAI and the subtitle */}
        <Typography variant="h1" fontWeight="bold" gutterBottom={false}>
          PICKMAI
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ marginBottom: "1.5rem" }}>
          Your smart shopping assistant
        </Typography>

        <Box mt={2} display="flex" gap={2}>
          {/* Log In Button */}
          <Button
            variant="outlined"
            size="large"
            href="/login"
            sx={{
              width: 120,
              borderColor: "black",
              color: "black",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Log in
          </Button>

          {/* Sign Up Button */}
          <Button
            variant="contained"
            size="large"
            href="/signup"
            sx={{
              width: 120,
              bgcolor: "black",
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