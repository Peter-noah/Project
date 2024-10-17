import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Link from "next/link";
import { useRouter } from "next/router";

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For avatar dropdown menu

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (authToken && userData) {
      setUsername(userData.username);
      setIsLoggedIn(true);
    } else {
      setUsername(null);
      setIsLoggedIn(false);
    }

    // Check if 'triggerSearch' exists in the query parameters to activate the search bar
    if (router.query.triggerSearch === "true") {
      setIsSearchActive(true);
    }
  }, [router]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
        await fetch(`${backendUrl}/api/search/log_search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensure cookies are sent with the request
          body: JSON.stringify({ search_term: searchQuery }), // Send the search term to the backend
        });
      } catch (error) {
        console.error("Error logging search term:", error);
      }

      router.push(`/result?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchActive(false);
    }
  };

  const handleSearchClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setIsSearchActive(true);
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setAnchorEl(null);
    router.push("/login");
  };

  const handleDashboardClick = () => {
    setAnchorEl(null);
    router.push("/dashboard");
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#FA86C4", padding: "10px 20px" }}>
        <Toolbar>
          {/* Logo and Text */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box display="flex" alignItems="center">
              <ShoppingBagIcon sx={{ color: "#000000", fontSize: 30, marginRight: "10px" }} />
              <Typography variant="h6" sx={{ fontWeight: 500, color: "#000000" }}>
                PickMai
              </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search Box */}
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "4px",
              paddingLeft: 1,
              paddingRight: 0.5,
              width: isSearchActive ? 250 : 130,
              transition: "width 0.4s ease",
              marginRight: "20px",
            }}
            onClick={handleSearchClick}
          >
            {isSearchActive ? (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setIsSearchActive(false)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    width: "100%",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                  },
                }}
                autoFocus
              />
            ) : (
              <Box display="flex" alignItems="center">
                <SearchIcon sx={{ color: "#000000", fontSize: 24, marginRight: 1 }} />
                <Typography sx={{ fontWeight: 500, fontSize: "16px", color: "#000000" }}>
                  Search
                </Typography>
              </Box>
            )}
          </Box>

          {/* Links */}
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <NavigationLink href="/wishlists" label="Wishlist" />
            <NavigationLink href="/home" label="Home" />
            <NavigationLink href="/help" label="Help" />
            <NavigationLink href="/about" label="About" />
            <NavigationLink href="/contact" label="Contact" />

            {/* Profile Avatar with Dropdown Menu */}
            {isLoggedIn ? (
              <>
                <IconButton onClick={handleProfileMenuOpen}>
                  <Avatar sx={{ bgcolor: "#000000", width: 40, height: 40 }}>
                    {username ? username.charAt(0).toUpperCase() : "?"}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  sx={{ mt: 1 }}
                >
                  <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  href="/login"
                  sx={{
                    borderColor: "#000000",
                    color: "#000000",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  Log in
                </Button>
                <Button
                  variant="contained"
                  href="/signup"
                  sx={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#333333" },
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <main>{children}</main>
    </>
  );
};

const NavigationLink = ({ href, label }) => (
  <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
    <Typography
      variant="body1"
      sx={{
        fontSize: "16px",
        fontWeight: 500,
        color: "#000000",
        "&:hover": { color: "#333333" },
      }}
    >
      {label}
    </Typography>
  </Link>
);

export default NavigationLayout;