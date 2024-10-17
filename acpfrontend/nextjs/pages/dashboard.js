import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  Card, 
  CardContent, 
  Stack, 
  Button 
} from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import { useRouter } from "next/router"; // For page navigation

const Dashboard = () => {
  const [shopData, setShopData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    // Fetch the latest shop data
    const fetchShopsData = async () => {
      try {
        const response = await fetch("/api/cart/shops");
        const data = await response.json();
        setShopData(data.shops);
        setLastUpdated(new Date().toLocaleString());  // Set last updated time
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch shop data");
        setLoading(false);
      }
    };

    fetchShopsData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!shopData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Alert severity="info">No data available.</Alert>
      </Box>
    );
  }

  // Data for the bar chart
  const labels = ["eBay", "Amazon"];
  const values = [shopData.ebay_count, shopData.amazon_count];

  return (
    <Box 
      p={4} 
      sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
    >
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            eBay vs Amazon Sales Comparison
          </Typography>
          <Typography variant="body2" color="textSecondary">
            A quick comparison between the most recent purchases on eBay and Amazon.
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 2 }}>
            Last updated: {lastUpdated}
          </Typography>
        </CardContent>
      </Card>

      {/* Buttons for navigation now just below the header box */}
      <Box textAlign="center" mb={4}>
        <Button
          variant="outlined"
          sx={{ mx: 1, borderColor: "#1976d2", color: "#1976d2" }}
        >
          Sales
        </Button>
        <Button
          variant="contained"
          sx={{ mx: 1, backgroundColor: "#4CAF50", color: "#fff" }}
          onClick={() => router.push("/ranking")} // Switch to Ranking page
        >
          Ranking
        </Button>
      </Box>

      <Stack 
        direction="column" 
        spacing={4} 
        alignItems="center"
      >
        <BarChart
          xAxis={[{ scaleType: 'band', data: labels }]}
          series={[{ data: values }]}
          height={300}
          sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}
        />

        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Total eBay Purchases: {shopData.ebay_count}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
          Total Amazon Purchases: {shopData.amazon_count}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Dashboard;