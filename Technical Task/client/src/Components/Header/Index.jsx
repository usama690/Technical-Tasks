import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { Link as RouterLink,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppButton from "../Button/Index";
import React from "react";
import { logout } from "../../Store/Auth/AuthSlice";

const Header = () => {
  const { token } = useSelector((s) => s.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (token) {
      dispatch(logout());
    }
    navigate("/signin");
  };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Company name
        </Typography>
        <nav>
          <RouterLink to="/">
            <Link color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              Home
            </Link>
          </RouterLink>
          <RouterLink to="/project">
            <Link color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              New Project
            </Link>
          </RouterLink>
          <RouterLink to="/pending-projects">
            <Link color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              Pending Projects
            </Link>
          </RouterLink>
          <RouterLink to="/complete-projects">
            <Link color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              Complete Projects
            </Link>
          </RouterLink>
          <RouterLink to="/archive-projects">
            <Link color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              Archive Projects
            </Link>
          </RouterLink>
        </nav>
        <AppButton
          value={token ? "Logout" : "Login"}
          onClick={handleClick}
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
