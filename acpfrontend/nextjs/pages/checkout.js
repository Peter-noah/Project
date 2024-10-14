import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Stack 
} from "@mui/material";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  // Load the cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleFinish = () => {
    localStorage.removeItem("cart"); // Clear the cart
    router.push("/"); // Redirect to the homepage (index.js)
  };

  const totalPrice = cart.reduce((total, product) => total + product["Price (THB)"], 0);

  return (
    <Box p={4} sx={{ maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <List>
        {cart.map((product, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <Box
                component="img"
                src={product["Image URL"]}
                alt={product.Name}
                sx={{ width: 80, height: 80, objectFit: "contain", marginRight: 2 }}
              />
              <ListItemText
                primary={product.Name}
                secondary={
                  <a href={product.URL} target="_blank" rel="noopener noreferrer">
                    View on {product.Shop}
                  </a>
                }
              />
              <Typography variant="body1">
                {product["Price (THB)"].toFixed(2)} THB
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Typography variant="h6">Total: {totalPrice.toFixed(2)} THB</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleFinish}
        >
          Finish
        </Button>
      </Stack>
    </Box>
  );
}