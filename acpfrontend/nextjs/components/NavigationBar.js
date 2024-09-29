import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"; // Shopping bag icon
import Link from "next/link";
import { useRouter } from "next/router";

const NavigationLayout = ({ children }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);  // New state to control search activation

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      // Perform the search
      router.push(`/result?query=${searchQuery}`);
      
      // Clear the search input and collapse the search bar
      setSearchQuery("");
      setIsSearchActive(false);
    }
  };

  const handleSearchBlur = () => {
    // Collapse search bar if no query is entered
    if (!searchQuery) {
      setIsSearchActive(false);
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#FA86C4", padding: "10px 20px" }}>
        <Toolbar>
          {/* Logo and App Name */}
          <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Box display="flex" alignItems="center">
              <ShoppingBagIcon sx={{ color: "#000000", fontSize: 30, marginRight: "10px" }} />
              <Typography variant="h6" sx={{ fontWeight: 500, color: "#000000" }}>
                PickMai
              </Typography>
            </Box>
          </Link>

          {/* Spacer to push the navigation and buttons to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Log in and Sign up Buttons with Navigation Links */}
          <Box display="flex" alignItems="center" gap={3}>
            {/* Search Button/Bar */}
            <Box
              component="form"
              onClick={() => setIsSearchActive(true)}  // Clicking anywhere on the box activates the search bar
              onSubmit={handleSearchSubmit}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "4px",
                paddingLeft: 1,
                paddingRight: 1,
                transition: "width 0.4s ease",  // Smooth transition for expanding the search bar
                width: isSearchActive ? 250 : 100,  // Expands on click
                cursor: "pointer",  // Entire box is clickable
                overflow: "hidden",  // Ensure text doesn't overflow when collapsed
              }}
            >
              {isSearchActive ? (
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={handleSearchBlur}  // Collapse back if clicked outside
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: { width: "100%" },  // Occupies full space when active
                  }}
                  autoFocus  // Automatically focus the input when active
                />
              ) : (
                <Box display="flex" alignItems="center">
                  <SearchIcon sx={{ color: "#000000", fontSize: 24 }} />
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "16px", color: "#000000", marginLeft: "8px" }}
                  >
                    Search
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Navigation Links */}
            <NavigationLink href="/home" label="Home" />
            <NavigationLink href="/help" label="Help" />
            <NavigationLink href="/about" label="About" />
            <NavigationLink href="/contact" label="Contact" />

            {/* Log in and Sign up Buttons */}
            <Button
              variant="outlined"
              href="/login"
              sx={{
                borderColor: "#000000",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              href="/signup"
              sx={{
                backgroundColor: "#000000",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
            >
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </>
  );
};

// Reusable navigation link component
const NavigationLink = ({ href, label }) => {
  return (
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
};

export default NavigationLayout;