import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  Container,
  Divider,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router"; // For page navigation

const RankingPage = () => {
  const [generalRanking, setGeneralRanking] = useState([]);
  const [userRanking, setUserRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter(); // Initialize router for navigation

  // Fetch general search rankings
  useEffect(() => {
    const fetchGeneralRanking = async () => {
      try {
        const response = await axios.get("/api/search/general_ranking");
        setGeneralRanking(response.data.rankings);
      } catch (error) {
        console.error("Error fetching general ranking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeneralRanking();
  }, []);

  // Fetch user-specific search rankings
  useEffect(() => {
    const fetchUserRanking = async () => {
      try {
        const response = await axios.get("/api/search/user_ranking");
        setUserRanking(response.data.rankings);
      } catch (error) {
        console.error("Error fetching user-specific ranking:", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserRanking();
  }, []);

  // Display loading state
  if (loading || userLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Render a ranking item with medal colors
  const renderRankingItem = (item, index) => {
    const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Gold, Silver, Bronze
    const isTopThree = index < 3;
    const iconColor = isTopThree ? medalColors[index] : "#1976d2";

    return (
      <React.Fragment key={index}>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: iconColor }}>
              <SearchIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="h6"
                color="textPrimary"
                fontWeight={isTopThree ? "bold" : "normal"}
              >
                <Box component="span" sx={{ color: iconColor }}>{`${index + 1}. `}</Box>
                {item.search_term}
              </Typography>
            }
            secondary={`Searched ${item.search_count} times`}
          />
        </ListItem>
        {index < generalRanking.length - 1 && <Divider variant="inset" component="li" />}
      </React.Fragment>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          eBay vs Amazon Search Rankings
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Compare general search trends with your personal searches!
        </Typography>
      </Box>

      {/* Add buttons for navigation */}
      <Box textAlign="center" mb={4}>
        <Button
          variant="contained"
          sx={{ mx: 1, backgroundColor: "#4CAF50", color: "#fff" }}
          onClick={() => router.push("/dashboard")} // Switch to Sales (dashboard) page
        >
          Sales
        </Button>
        <Button
          variant="outlined"
          sx={{ mx: 1, borderColor: "#1976d2", color: "#1976d2" }}
        >
          Ranking
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* General Rankings Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            General Search Rankings
          </Typography>

          <List
            sx={{
              width: "90%",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 2,
              p: 1.5,
              maxHeight: "500px",
              overflowY: "auto",
              margin: "0 auto",
            }}
          >
            {generalRanking.length > 0 ? (
              generalRanking.map((item, index) => renderRankingItem(item, index))
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No ranking data found.
              </Typography>
            )}
          </List>
        </Grid>

        {/* User-Specific Rankings Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Your Search Rankings
          </Typography>

          <List
            sx={{
              width: "90%",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 2,
              p: 1.5,
              maxHeight: "500px",
              overflowY: "auto",
              margin: "0 auto",
            }}
          >
            {userRanking.length > 0 ? (
              userRanking.map((item, index) => renderRankingItem(item, index))
            ) : (
              <Typography variant="body1" color="textSecondary" align="center">
                No search data found for you.
              </Typography>
            )}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RankingPage;