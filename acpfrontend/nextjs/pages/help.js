import React from "react";
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function HelpPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Paper elevation={3} sx={{ padding: 4, width: '80%', maxWidth: 600 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
          Help & Support
        </Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary">
          Welcome to the Help page. How can we assist you today?
        </Typography>

        {/* FAQ Section */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Frequently Asked Questions
          </Typography>

          {/* Register and Login */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>What do I need to register and log in?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You can register and log in using just your email. No additional information is required.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Reset Password */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I reset my password?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Click the "Forget Password" link on the login page, and follow the instructions. You’ll receive an email with a reset link shortly.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Searching for Items */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I search and sort items?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Use the search box at the top of the page to find items. You can sort results for you liking whether it would be rating or price.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Shopping Cart Usage */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How do I use the shopping cart?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                In the shopping cart, you can adjust item quantities or delete items. The total price summary appears on the right side of the page.
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* Contact Support */}
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>How can I contact support?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                For further assistance, go to the "Contact" page by clicking the contact button in the navigation bar.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Paper>
    </Box>
  );
}