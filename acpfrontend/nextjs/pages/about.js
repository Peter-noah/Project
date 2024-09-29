import React from "react";
import { Box, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      px={2}
    >
      {/* Content Wrapper with maxWidth */}
      <Box maxWidth="600px" textAlign="center">
        {/* Main Header */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Why this Project?
        </Typography>

        {/* Sub Header: Observed Problems */}
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="left"
          gutterBottom
          sx={{ fontSize: "1.75rem" }}  
        >
          Observed Problems
        </Typography>

        {/* Content for Observed Problems */}
        <Typography
          variant="body1"
          textAlign="left"
          paragraph
          sx={{ fontSize: "1.2rem" }} 
        >
          The entire procedure of comparison and selection is fraught with difficulties,
          requiring a level of diligence that can be prohibitively demanding for the average
          consumer.
        </Typography>

        <Typography
          variant="body1"
          textAlign="left"
          paragraph
          sx={{ fontSize: "1.2rem" }} 
        >
          In this labyrinthine marketplace, one frequently overlooks more economical and superior
          alternatives, potentially compromising optimal purchasing decisions.
        </Typography>

        {/* Sub Header: Positive Motivation */}
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="left"
          gutterBottom
          sx={{ fontSize: "1.75rem" }} 
        >
          Positive Motivation
        </Typography>

        {/* Content for Positive Motivation */}
        <Typography
          variant="body1"
          textAlign="left"
          paragraph
          sx={{ fontSize: "1.2rem" }} 
        >
          This innovative platform would serve as a comprehensive aggregator, synthesizing product
          data from a myriad of disparate e-commerce applications into a cohesive and user-centric
          interface.
        </Typography>

        <Typography
          variant="body1"
          textAlign="left"
          paragraph
          sx={{ fontSize: "1.2rem" }}  
        >
          The paramount objective of this endeavor is to optimize and accelerate the consumer
          purchasing journey, mitigating the cognitive load associated with cross-platform
          comparisons and facilitating more judicious decision-making.
        </Typography>
      </Box>
    </Box>
  );
}