import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h6" gutterBottom>
        This is your cart. Dumbass.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go Back
      </Button>
    </Box>
  );
}