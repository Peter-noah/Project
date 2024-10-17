import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Stack, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete"; // Icon for delete button

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Calculate total price
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, product) => sum + (product["Price (THB)"] || 0), 0);
    setTotalPrice(total);
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Remove item by index
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
    calculateTotal(updatedCart); // Recalculate total price
  };

  const handleCheckout = () => router.push("/checkout"); // Navigate to checkout

  const handleBackToHome = () => router.push("/home"); // Navigate to home.js

  return (
    <Box p={4} sx={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Your Cart
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Stack direction="row" spacing={2} mt={4}>
          {/* Cart Items List */}
          <Box flex={2}>
            {cart.map((product, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  mb: 2,
                  padding: 2,
                  alignItems: "center",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                <CardMedia
                  component="img"
                  image={product["Image URL"]}
                  alt={product.Name}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    borderRadius: "8px",
                    marginRight: 2,
                  }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{product.Name}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {(product["Price (THB)"] !== undefined ? product["Price (THB)"].toFixed(2) : "0.00")} THB
                  </Typography>
                </CardContent>
                {/* Remove button */}
                <IconButton color="error" onClick={() => removeFromCart(index)}>
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Box>

          {/* Price Summary */}
          <Box
            flex={1}
            p={2}
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Order Summary
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              {cart.map((product, index) => (
                <Box key={index} display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="textSecondary">
                    {(product["Price (THB)"] !== undefined ? product["Price (THB)"].toFixed(2) : "0.00")} THB
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {totalPrice.toFixed(2)} THB
                </Typography>
              </Box>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>

            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleBackToHome} // Updated function
            >
              Back to Home
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
}