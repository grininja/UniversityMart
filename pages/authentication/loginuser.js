import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiCall from "@/helper/apiCall";
import Autocomplete from "@mui/material/Autocomplete";
import { signIn, signOut } from "next-auth/react";

var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const roleOptions = [
  {
    label: "Admin1",
    value: "admin1",
  },
  {
    label: "Admin2",
    value: "admin2",
  },
  {
    label: "Admin3",
    value: "dmin3",
  },
];

const Login = ({ email, institute, role }) => (
  <Button
    onClick={async (e) => {
      console.log(role);
      console.log(institute);
      e.preventDefault();
      if (
        email === null ||
        email === undefined ||
        email === "" ||
        email.match(pattern) === null
      ) {
        alert("valid email is required");
        return;
      }
      if (institute === null || institute === undefined || institute === "") {
        alert("institute name is required");
        return;
      }
      if (role === null || role === undefined || role === "") {
        alert("role is required");
        return;
      }
      const findInstitutewithadmin = await apiCall(
        `/api/institute/checkAdminForInstitute?instituteName=${institute.name}&adminEmail=${email}&role=${role.value}`,
        "GET",
        {},
        null
      );
      console.log(findInstitutewithadmin);
      if (findInstitutewithadmin.data.message !== true) {
        alert("User does not have admin permission");
        return;
      }

      const result = await signIn("email", {
        email,
        callbackUrl: "http://localhost:3000",
      });
    }}
    fullWidth
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
    type="submit"
  >
    Submit
  </Button>
);

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Shubham Rai
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  // Institute: Yup.string().required("Required"),
});

export default function LoginUser(props) {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState(" ");
  const [emailValue, setEmailValue] = React.useState("");
  const [roleValue, setRoleValue] = React.useState("");
  const [emailInputValue, setEmailInputValue] = React.useState("");
  const defaultProps = {
    options: props.institutes,
    getOptionLabel: (option) => option.name,
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://static.vecteezy.com/system/resources/previews/002/850/123/original/colorful-cartoon-school-supplies-icon-set-free-vector.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={emailValue}
                onChange={(event) => {
                  setEmailValue(event.target.value);
                }}
                id="email"
                label="Email Address"
              />

              <Autocomplete
                defaultValue={props.institutes[0]}
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="name"
                {...defaultProps}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="University" />
                )}
                getOptionLabel={(option) => option.name || ""}
              />
              <Autocomplete
                disablePortal
                value={roleValue}
                onChange={(event, newValue) => {
                  setRoleValue(newValue);
                }}
                id="AdminSelection"
                options={roleOptions}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Admin" />
                )}
                getOptionLabel={(option) => option.value || ""}
              />

              <Login email={emailValue} institute={value} role={roleValue} />
              <Copyright sx={{ mt: 5 }} />
              <button
                onClick={() =>
                  signOut({ callbackUrl: "http://localhost:3000" })
                }
              >
                Sign Out
              </button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await apiCall(
      "http://localhost:3000/api/institute/getAllInstitutes",
      "GET",
      {},
      ""
    );
    const institutes = await res.data.message;
    // console.log(institutes);
    return {
      props: {
        institutes: institutes,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
