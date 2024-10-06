import React from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid } from '@mui/material';

const ContactPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Reach out to us!
          </Typography>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <TextField label="Username" fullWidth required margin="normal" />
            <TextField label="Full Name" fullWidth required margin="normal" />
            <TextField label="Email Address" type="email" fullWidth required margin="normal" />
            <TextField label="Contact Number" fullWidth required margin="normal" />
            <Select fullWidth defaultValue="" margin="normal">
              <MenuItem value="Cart Problem">Cart Problem</MenuItem>
              <MenuItem value="Register Problem">Register Problem</MenuItem>
              <MenuItem value="Login Problem">Login Problem</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
            <TextField
              label="Further Details"
              fullWidth
              multiline
              rows={4}
              required
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Customer Care
          </Typography>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
            <Typography variant="h6">Marine, Customer Care Lead</Typography>
            <Typography>Tel: 0123456789</Typography>
            <Typography>Email: marine@kmitl.ac.th</Typography>
            <Box sx={{ mt: 2 }} />
            <Typography variant="h6">Chokun, Customer Care</Typography>
            <Typography>Tel: 0987654321</Typography>
            <Typography>Email: chokun@kmitl.ac.th</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;