import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <Box textAlign="center" p={4}>
      <Typography variant="h6" gutterBottom>
        Hello World, this is Page 2
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go Back
      </Button>

      {/* Wrapping the second button inside the same Box */}
      <Box mt={2}>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          You pressed me {count} times
        </Button>
      </Box>
    </Box>
  );
}
