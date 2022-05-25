import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AppButton from "../../Components/Button/Index";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { asyncSignin } from "../../Store/Auth/AuthAsync";
import { useDispatch } from "react-redux";

const theme = createTheme();

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      let result = await dispatch(asyncSignin(data)).unwrap();
      reset();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              label="Email Address"
              name="email"
            />
            {errors.email && <span>{errors.email.message}</span>}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              {...register("password", {
                required: "Password is required",
              })}
              label="Password"
              type="password"
            />
            <AppButton
              value="Sign In"
              variant="contained"
              type="submit"
              isFullWidth={true}
              sx={{ my: 1, mx: 1.5 }}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <Grid container>
              <Grid item>
                <Link to="/signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
