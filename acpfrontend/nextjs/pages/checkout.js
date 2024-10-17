import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Stack, 
  Alert 
} from "@mui/material";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [checkoutError, setCheckoutError] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Load cart and check if user is authenticated
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const authToken = localStorage.getItem("authToken");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (authToken && userData) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setIsLoggedIn(false);
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]);

  const handleFinish = async () => {
    setCheckoutError(null);

    if (!isLoggedIn) {
      setCheckoutError("You must be logged in to complete the checkout.");
      return;
    }

    const formattedCart = cart.map(item => ({
      product_name: item.Name,
      shop: item.Shop,
      price_thb: item["Price (THB)"],
      rating: item.Rating || 0,
      product_url: item.URL || "", // Default to empty string if URL is missing
      image_url: item["Image URL"]
    }));

    try {
      const response = await fetch(`${backendUrl}/api/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Send session cookies
        body: JSON.stringify(formattedCart),
      });

      if (response.ok) {
        setCheckoutSuccess(true);
        localStorage.removeItem("cart");
        setTimeout(() => router.push("/"), 3000);
      } else {
        const errorData = await response.json();
        setCheckoutError(`Failed to checkout: ${errorData.detail}`);
      }
    } catch (error) {
      setCheckoutError("Error processing the checkout. Please try again.");
    }
  };

  const totalPrice = cart.reduce((total, product) => total + product["Price (THB)"], 0);

  if (loading) {
    return (
      <Box p={4} sx={{ maxWidth: "800px", margin: "0 auto" }}>
        <Typography variant="h5">Checking session...</Typography>
      </Box>
    );
  }

  return (
    <Box 
      p={4} 
      sx={{ 
        maxWidth: "800px", 
        margin: "0 auto", 
        bgcolor: "#f9f9f9", 
        borderRadius: 2, 
        boxShadow: 3 
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>

      {checkoutError && <Alert severity="error" sx={{ mb: 2 }}>{checkoutError}</Alert>}
      {checkoutSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Checkout successful! Redirecting to the homepage...
        </Alert>
      )}

      <List>
        {cart.map((product, index) => (
          <React.Fragment key={index}>
            <ListItem 
              alignItems="flex-start" 
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
              }}
            >
              <Box
                component="img"
                src={product["Image URL"]}
                alt={product.Name}
                sx={{ width: 80, height: 80, objectFit: "contain", marginRight: 2, borderRadius: 1 }}
              />
              {/* Added flexbox to limit text width and align price */}
              <Box sx={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <ListItemText
                  primary={
                    <Typography 
                      variant="h6" 
                      fontWeight="bold" 
                      sx={{ 
                        whiteSpace: "nowrap", 
                        overflow: "hidden", 
                        textOverflow: "ellipsis", 
                        maxWidth: "400px" 
                      }}
                    >
                      {product.Name}
                    </Typography>
                  }
                  secondary={
                    <a 
                      href={product.URL || product.product_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#1976d2" }}
                    >
                      View on {product.Shop}
                    </a>
                  }
                />
                <Typography variant="body1" fontWeight="bold" sx={{ ml: 2 }}>
                  {product["Price (THB)"].toFixed(2)} THB
                </Typography>
              </Box>
            </ListItem>
            {index < cart.length - 1 && <Divider sx={{ my: 2 }} />}
          </React.Fragment>
        ))}
      </List>

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Typography variant="h6" fontWeight="bold">
          Total: {totalPrice.toFixed(2)} THB
        </Typography>
        <Button
          variant="contained"
          sx={{ 
            bgcolor: "#4CAF50", 
            "&:hover": { bgcolor: "#45A049" }, 
            color: "#fff" 
          }}
          onClick={handleFinish}
          disabled={checkoutSuccess}
        >
          Finish
        </Button>
      </Stack>
    </Box>
  );
}