import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!token || !userData) {
      router.replace("/login"); // Redirect to login if not authenticated
    } else {
      fetchWishlists();
    }
  }, [router]);

  // Fetch user's wishlist
  const fetchWishlists = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/favorites/`, {
        credentials: "include",
      });
      const data = await response.json();
      setWishlists(data.favorites || []);
    } catch (error) {
      setError("Error fetching wishlists.");
    } finally {
      setLoading(false);
    }
  };

  // Remove product from wishlist
  const removeFromWishlists = async (product_name) => {
    try {
      await fetch(`${backendUrl}/api/favorites/remove/${product_name}`, {
        method: "DELETE",
        credentials: "include",
      });
      setWishlists((prevWishlists) =>
        prevWishlists.filter((item) => item.product_name !== product_name)
      );
    } catch (error) {
      console.error("Error removing from wishlists:", error);
    }
  };

  const handleAddToCart = async (product) => {
    const confirmed = window.confirm(`Add ${product.product_name} to the cart?`);
    if (confirmed) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the item is already in the cart
      const itemExists = cart.some((item) => item.product_name === product.product_name);
      if (itemExists) {
        alert(`${product.product_name} is already in your cart.`);
        return;
      }

      // Add product to the cart
      cart.push({
        Name: product.product_name,
        Shop: product.shop,
        "Price (THB)": product.price_thb,
        Rating: product.rating,
        "Image URL": product.image_url,
        URL: product.product_url, // Ensure product_url is included
        id: `${product.product_name}-${product.shop}`, // unique id
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      // Remove from wishlists after adding to cart (send product_name in the request body)
      try {
        const response = await fetch(`${backendUrl}/api/favorites/add_to_cart_and_remove`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ product_name: product.product_name }), // Send the product name in the request body
        });

        if (response.ok) {
          // Remove it from the local state as well
          setWishlists((prevWishlists) =>
            prevWishlists.filter((item) => item.product_name !== product.product_name)
          );
          alert(`${product.product_name} has been added to your cart and removed from wishlists.`);
        } else {
          const data = await response.json();
          alert(`Error: ${data.detail}`);
        }
      } catch (error) {
        console.error("Error removing from wishlists:", error);
      }
    }
  };

  if (loading) return <Box textAlign="center"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box p={4} sx={{ maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>
      {wishlists.length === 0 ? (
        <Typography variant="h6">You have no items in your wishlist yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {wishlists.map((product, index) => (
            <Card key={index} sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                image={product.image_url}
                alt={product.product_name}
                sx={{ width: 100, height: 100, objectFit: "contain", marginRight: 2 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{product.product_name}</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  From {product.shop}
                </Typography>
                <Box display="flex" justifyContent="space-between">
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
                    Add to Cart
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => removeFromWishlists(product.product_name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
      <Button variant="contained" sx={{ mt: 4 }} onClick={() => router.push("/cart")}>
        Visit Cart
      </Button>
    </Box>
  );
}