import React from "react";

import { Box } from "@mui/material";
import { LoginForm } from "components/auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box mt={3}>
        <LoginForm />
      </Box>
    </Box>
  );
};

export { LoginPage };
