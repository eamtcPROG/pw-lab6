import { Box, Container, Typography } from "@mui/material";
import { MyButton } from "components/elements/button/MyButton";
import { MyTextField } from "components/elements/form/MyTextField";
import { LoginDto } from "dto/login.dto";

import useForm from "hooks/useForm";

import { AuthContext } from "providers/AuthProvider";
import React, { useContext } from "react";
import RequiredValidator from "validators/required.validator";

const LoginForm: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [obj, isDisabled, setObjField] = useForm(
    new LoginDto(),
    RequiredValidator.getValidators(["email", "password"])
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    login(obj);
  };

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h4">Login</Typography>
      </Box>
      <Box mt={3}>
        <form onSubmit={handleSubmit}>
          <Box width={"100%"}>
            <MyTextField
              field={"email"}
              _label="Email"
              setObjectField={setObjField}
              value={obj.email}
            />
          </Box>
          <Box mt={3} width={"100%"}>
            <MyTextField
              field={"password"}
              _label="Password"
              setObjectField={setObjField}
              value={obj.password}
              type="password"
            />
          </Box>
          <Box mt={3} width={"100%"}>
            <MyButton disabled={isDisabled} type="submit" fullWidth>
              Login
            </MyButton>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export { LoginForm };
