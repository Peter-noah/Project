import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

export default function ResultPage({ products }) {
  const router = useRouter();
  const { query } = router.query;
  const [sortAnchor, setSortAnchor] = useState(null);
  const [sortMethod, setSortMethod] = useState("Price ↓");
  const [resultsCount, setResultsCount] = useState(products.length); // Dynamic count based on products data

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
    router.push("/cart");
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
          onClick={handleSortClick}
          sx={{
            color: "#808080", // Gray text
            "&:hover": {
              backgroundColor: "transparent", // No background on hover
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
          <MenuItem onClick={() => handleSortClose("Number in stock")}>Number in stock</MenuItem>
          <MenuItem onClick={() => handleSortClose("Overall value")}>Overall value</MenuItem>
        </Menu>
      </Box>

      {/* Product list with larger width */}
      <Box mb={3} sx={{ maxWidth: "1200px", margin: "0 auto" }}> {/* Increased max width to 1200px */}
        {products.map((product, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              mb: 2,
              p: 2,
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "100%", // Use full width within the maxWidth
              justifyContent: "space-between", // Align items to both sides (text to left, price to right)
            }}
          >
            {/* Product Image or Placeholder */}
            <CardMedia
              component="img"
              sx={{
                width: 100, // Increase image size to match larger product list
                height: 100,
                objectFit: "cover",
                borderRadius: "8px",
                backgroundColor: product.image ? "transparent" : "#f0f0f0",
              }}
              image={product.image || ""}
              alt={product.title || "No Image"}
            />

            {/* Product Details */}
            <CardContent sx={{ flexGrow: 1, paddingLeft: "16px" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{product.title || "Product Title"}</Typography>
              <Typography variant="body2" color="textSecondary">
                By {product.seller || "Unknown Seller"}
              </Typography>
            </CardContent>

            {/* Price and See More Button */}
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {product.price ? `$${product.price}` : "Price not available"}
              </Typography>
              <Link href={product.link || "#"} passHref>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#f0f0f0", // Light gray background
                    color: "#000000", // Black text
                    borderColor: "#000000", // Black outline
                    mt: 1, // Space between price and button
                    "&:hover": {
                      backgroundColor: "#e0e0e0", // Slightly darker gray on hover
                    },
                  }}
                >
                  See more
                </Button>
              </Link>
            </Box>
          </Card>
        ))}
      </Box>

      {/* My Cart Button */}
      <Box position="fixed" bottom={16} left={16} display="flex" flexDirection="column" alignItems="center">
        <IconButton
          onClick={handleCartClick}
          sx={{
            backgroundColor: "#ff4081", // Pink background (matching navigation bar)
            borderRadius: "50%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#e91e63", // Darker pink on hover
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

// Sample data that you can replace with your API or imported data
ResultPage.defaultProps = {
  products: [
    {
      title: "Bayern Munich 24/25 home jersey (Shopee)",
      seller: "MajpaiFootballShop",
      price: 71.99,
      image: "/path/to/image1.jpg",
      link: "/product/1",
    },
    {
      title: "Bayern 23/24 Oktoberfest Edition (Shopee)",
      seller: "ChokunChooseJersey",
      price: 75.99,
      image: "/path/to/image2.jpg",
      link: "/product/2",
    },
    {
      title: "Bayern Munich 2024-25 3rd jersey (Lazada)",
      seller: "MarineMeeShirt",
      price: 76.99,
      image: "/path/to/image3.jpg",
      link: "/product/3",
    },
  ],
};
