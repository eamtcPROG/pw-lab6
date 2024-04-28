import React from "react";
import PageComponentProps from "interfaces/pagecomponentprops.interface";
import { Box, Typography, Container } from "@mui/material";

const Footer: React.FC<PageComponentProps> = ({ currentRoute }) => {
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography>
          Copyright 2024 - All rights reserved Coretchi Mihai
        </Typography>
      </Box>
    </Container>
  );
};

export { Footer };
