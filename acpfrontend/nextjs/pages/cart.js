import React, { useState } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Sample item data for demonstration
const sampleItems = [
  {
    id: 1,
    name: "Product 1",
    price: 50,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 1,
  },
  {
    id: 2,
    name: "Product 2",
    price: 30,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 1,
  },
  {
    id: 3,
    name: "Product 3",
    price: 20,
    imageUrl: "https://via.placeholder.com/150",
    quantity: 1,
  }
];

export default function CartPage() {
  const [items, setItems] = useState(sampleItems);

  // Function to handle quantity increment
  const handleIncrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to handle quantity decrement
  const handleDecrement = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Function to handle item removal
  const handleRemoveItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate subtotal based on quantities
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 10;
  const total = subtotal + shippingCost;

  return (
    <Box p={4}>
      {/* Top Section: Shopping Cart */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        SHOPPING CART ({items.length})
      </Typography>

      <Grid container spacing={4}>
        {/* Left Section: List of items */}
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.id} sx={{ display: "flex", mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={item.imageUrl}
                alt={item.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </Typography>

                  {/* Quantity Control */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <IconButton
                      onClick={() => handleDecrement(item.id)}
                      aria-label="decrease quantity"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleIncrement(item.id)}
                      aria-label="increase quantity"
                    >
                      <AddIcon />
                    </IconButton>

                    {/* Remove Button */}
                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="delete"
                      sx={{ ml: 2 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Grid>

        {/* Right Section: Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1">
              Subtotal: ${subtotal.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Shipping: $10.00
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: ${total.toFixed(2)}
            </Typography>

            {/* Checkout Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "pink",
                color: "white",
                mt: 2,
                "&:hover": { backgroundColor: "#ff69b4" },
              }}
              href="/checkout"
            >
              Check Out
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Go Back Button */}
      <Button variant="contained" color="pink" sx={{ mt: 3 }} href="/">
        Go Back
      </Button>
    </Box>
  );
}