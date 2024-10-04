import React, { useState } from "react";
import { Box, Typography, TextField, Grid, Button, Card, RadioGroup, FormControlLabel, Radio } from "@mui/material";

// Sample data for demonstration
const sampleItems = [
  { id: 1, name: "Product 1", price: 50, quantity: 2 },
  { id: 2, name: "Product 2", price: 30, quantity: 1 },
];

export default function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState("normal");

  // Calculate subtotal
  const subtotal = sampleItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === "normal" ? 5 : 10;
  const total = subtotal + shippingCost;

  return (
    <Box p={4}>
      {/* Navigation Bar */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: "#f5f5f5" }}>
        <Typography variant="h6">Your Website Navigation</Typography>
      </Box>

      {/* Main Container */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Checkout
      </Typography>
      <Grid container spacing={4}>
        {/* Left Section: Shipping Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="First Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Last Name" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Street Address" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Further Details" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="City" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Province" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Postal Code" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Country" fullWidth />
              </Grid>
            </Grid>
          </Card>

          {/* Shipping Method */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Method
            </Typography>
            <RadioGroup
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              <FormControlLabel
                value="normal"
                control={<Radio />}
                label="Normal Shipping - $5"
              />
              <FormControlLabel
                value="flash"
                control={<Radio />}
                label="Flash Shipping - $10"
              />
            </RadioGroup>
          </Card>
        </Grid>

        {/* Right Section: Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Typography variant="body1">
              Subtotal: ${subtotal.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Shipping: ${shippingCost.toFixed(2)}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: ${total.toFixed(2)}
            </Typography>

            {/* Place Order Button */}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              fullWidth
              href="/confirmation"
            >
              Place Order
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}