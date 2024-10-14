import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  Pagination,
  Menu,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";

export default function ResultPage() {
  const router = useRouter();
  const { query } = router.query;

  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(""); // Default empty (initial "Choose Sorting")
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null); // Controls the menu dropdown
  const productsPerPage = 10;

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Fetch products based on the query and sort criteria
  useEffect(() => {
    if (query) fetchProducts(query);
  }, [query]);

  // Re-sort products whenever the sort criteria changes
  useEffect(() => {
    if (products.length > 0) sortProducts(sortCriteria);
  }, [sortCriteria]);

  // Fetch products from the backend
  const fetchProducts = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${backendUrl}/search?query=${searchQuery}&criteria=${sortCriteria || "price_asc"}`
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      setProducts(data); // Store products in state
      sortProducts(sortCriteria); // Sort them immediately
    } catch (error) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Sorting logic
  const sortProducts = (criteria) => {
    const sorted = [...products].sort((a, b) => {
      if (criteria === "price_asc") return a["Price (THB)"] - b["Price (THB)"];
      if (criteria === "price_desc") return b["Price (THB)"] - a["Price (THB)"];
      if (criteria === "rating_asc") return a.Rating - b.Rating;
      if (criteria === "rating_desc") return b.Rating - a.Rating;
      return 0;
    });
    setSortedProducts(sorted);
  };

  // Add a product to the cart (with localStorage)
  const handleAddToCart = (product) => {
    const confirmed = window.confirm(`Add ${product.Name} to the cart?`);
    if (confirmed) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.Name} has been added to your cart.`);
    }
  };

  // Handle sorting changes
  const handleSortChange = (criteria) => {
    setSortCriteria(criteria); // Set the chosen sort criteria
    setAnchorEl(null); // Close the menu
  };

  const handlePageChange = (event, value) => setCurrentPage(value); // Handle pagination

  const openMenu = (event) => setAnchorEl(event.currentTarget); // Open menu
  const closeMenu = () => setAnchorEl(null); // Close menu
  const navigateToCart = () => router.push("/cart"); // Navigate to the cart page

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) return <Box textAlign="center" mt={10}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={4} sx={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          Search Results for: {query}
        </Typography>
        <Button variant="outlined" onClick={openMenu}>
          {sortCriteria ? `Sort by ${sortCriteria.replace("_", " ").toUpperCase()}` : "Choose Sorting"}
        </Button>
      </Stack>
      <Typography variant="subtitle1" gutterBottom>
        {products.length} results
      </Typography>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={() => handleSortChange("price_asc")}>Price: Low to High</MenuItem>
        <MenuItem onClick={() => handleSortChange("price_desc")}>Price: High to Low</MenuItem>
        <MenuItem onClick={() => handleSortChange("rating_desc")}>Rating: High to Low</MenuItem>
        <MenuItem onClick={() => handleSortChange("rating_asc")}>Rating: Low to High</MenuItem>
      </Menu>

      {currentProducts.map((product, index) => (
        <Card key={index} sx={{ display: "flex", mb: 2, padding: 2, alignItems: "center" }}>
          <CardMedia
            component="img"
            image={product["Image URL"]}
            alt={product.Name}
            sx={{ width: 100, height: 100, objectFit: "contain", marginRight: 2 }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{product.Name}</Typography>
            <Typography variant="subtitle2" gutterBottom>From {product.Shop}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Button
                onClick={() => handleAddToCart(product)}
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                Put in Cart
              </Button>
              <Box textAlign="right">
                <Typography variant="body1">{product.Rating}/5 ★</Typography>
                <Typography variant="h6">{product["Price (THB)"].toFixed(2)} THB</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Pagination
        count={Math.ceil(sortedProducts.length / productsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />

      <Button
        variant="contained"
        onClick={navigateToCart}
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          borderRadius: "50%",
          width: 60,
          height: 60,
          backgroundColor: "#FA86C4",
          color: "#FFFFFF",
        }}
      >
        🛒
      </Button>
    </Box>
  );
}