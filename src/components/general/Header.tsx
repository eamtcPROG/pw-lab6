import React , {useState}from "react";
import PageComponentProps from "interfaces/pagecomponentprops.interface";
import { AppBar, Box, Toolbar, InputBase, Container, Stack } from "@mui/material";

import { Logo } from "./Logo";
import { SwitchThemeMode } from "components/header/SwitchThemeMode";
import { styled, alpha } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import { usePost } from "hooks/usePost";
import { LogoutButton } from "components/auth/LogoutButton";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header: React.FC<PageComponentProps> = ({ currentRoute }) => {
  const {  setSearchText } = usePost();
  const [search, setSearch] = useState<string>("");
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setTimeout(() => {
      setSearchText(event.target.value);
    }, 100);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <Logo />
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={handleOnChange}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ flexGrow: 0 }}>
            <Stack spacing={2} direction="row" alignItems={"center"}>
            <SwitchThemeMode />
            <LogoutButton />
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Header };
