import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h6" gutterBottom>
        Hello World, this is Page 1
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go Back
      </Button>
      
      <Box mt={4}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['Item Availability'] }]}
          series={[{ data: [4] }, { data: [1] }, { data: [2] }, {data: [3]}]}
          width={600}
          height={300}
        />
      </Box>
    </Box>
  );
}