import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Shopping cart icon
import Link from "next/link";

export default function ResultPage() {
  const router = useRouter();
  const { query } = router.query; // Get the search query from URL
  const [sortAnchor, setSortAnchor] = useState(null); // For sorting menu
  const [sortMethod, setSortMethod] = useState("Price ↓");
  const [resultsCount, setResultsCount] = useState(22); // Placeholder for results count

  const handleSortClick = (event) => {
    setSortAnchor(event.currentTarget);
  };

  const handleSortClose = (method) => {
    setSortAnchor(null);
    if (method) {
      setSortMethod(method);
    }
  };

  const handleCartClick = () => {
    router.push("/cart"); // Navigate to cart.js
  };

  return (
    <Box p={4}>
      {/* Dynamic Title based on search query */}
      <Typography variant="h4" gutterBottom>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          {query ? `${query}` : "Search Results"}
        </Link>
      </Typography>

      {/* Dynamic results count */}
      <Typography variant="body2" color="textSecondary">
        {resultsCount} results
      </Typography>

      {/* Sort by Price button */}
      <Box display="flex" justifyContent="flex-end" mt={2} mb={3}>
        <Button
          variant="outlined"
          onClick={handleSortClick}
          sx={{
            borderColor: "#000000", // Black outline
            color: "#000000", // Black text
            "&:hover": {
              backgroundColor: "#f5f5f5", // Lighter background on hover
            },
          }}
        >
          Sort by {sortMethod}
        </Button>
        <Menu
          anchorEl={sortAnchor}
          open={Boolean(sortAnchor)}
          onClose={() => handleSortClose(null)}
        >
          <MenuItem onClick={() => handleSortClose("Price ↑")}>Price ↑</MenuItem>
          <MenuItem onClick={() => handleSortClose("Price ↓")}>Price ↓</MenuItem>
          <MenuItem onClick={() => handleSortClose("Rating")}>Rating</MenuItem>
          <MenuItem onClick={() => handleSortClose("Number in stock")}>
            Number in stock
          </MenuItem>
          <MenuItem onClick={() => handleSortClose("Overall value")}>
            Overall value
          </MenuItem>
        </Menu>
      </Box>

      {/* Placeholder for product list */}
      <Box mb={3}>
        {/* Products would be rendered here */}
        <Typography variant="body1" color="textSecondary">
          Product list will be displayed here.
        </Typography>
      </Box>

      {/* My Cart Button */}
      <Box position="fixed" bottom={16} left={16} display="flex" flexDirection="column" alignItems="center">
        <IconButton
          onClick={handleCartClick}
          sx={{
            backgroundColor: "#1976d2", // Blue background
            borderRadius: "50%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#1565c0", // Darker blue on hover
            },
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 30, color: "#ffffff" }} /> {/* White icon */}
        </IconButton>
        <Typography variant="caption" sx={{ marginTop: "8px", color: "#000000" }}>
          My Cart
        </Typography>
      </Box>
    </Box>
  );
}