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
  const [sortCriteria, setSortCriteria] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null); 
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
      setProducts(data);
      sortProducts(sortCriteria);
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
      
      // Check if the item is already in the cart
      const itemExists = cart.some((item) => item.id === product.id);
      if (itemExists) {
        alert(`${product.Name} is already in your cart.`);
        return;
      }

      // Add product with unique ID
      cart.push({ ...product, id: `${product.Name}-${product.Shop}` });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.Name} has been added to your cart.`);
    }
  };

  // Add a product to favorites (new functionality)
  const handleAddToFavorites = async (product) => {
    const confirmed = window.confirm(`Add ${product.Name} to your favorites?`);
    if (confirmed) {
      try {
        const response = await fetch(`${backendUrl}/api/favorites/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",  // Ensure session cookies are sent
          body: JSON.stringify({
            product_name: product.Name,
            shop: product.Shop,
            price_thb: product["Price (THB)"],
            rating: product.Rating || 0,
            product_url: product.URL,
            image_url: product["Image URL"]
          })
        });
        const data = await response.json();
        if (response.ok) {
          alert(`${product.Name} has been added to your favorites.`);
        } else {
          alert(`Error: ${data.detail}`);
        }
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  // Handle sorting changes
  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setAnchorEl(null);
  };

  const handlePageChange = (event, value) => setCurrentPage(value);
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const navigateToCart = () => router.push("/cart");

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
              <Box>
                <Button
                  onClick={() => handleAddToCart(product)}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "20px",
                    padding: "8px 16px",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                    marginRight: 2,  // Spacing between buttons
                  }}
                >
                  Put in Cart
                </Button>
                <Button
                  onClick={() => handleAddToFavorites(product)}  // Add to favorites
                  sx={{
                    backgroundColor: "#e0f7fa",
                    borderRadius: "20px",
                    padding: "8px 16px",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#b2ebf2" },
                  }}
                >
                  Add to Favorites
                </Button>
              </Box>
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