import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import Container from "@mui/material/Container";

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
    value: "admin3",
  },
];

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
  role: Yup.string("Enter your role").required("Role is required"),
});

const createAdminFunction = async (email, instituteId, role, department) => {
  const user = await apiCall(
    "/api/manageUser/createUser",
    "POST",
    {
      emailId: email,
      InstituteId: instituteId,
    },
    null
  );
  const userId = user.data.userId;
  console.log(userId);
  if (role === "admin1") {
    const res = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/createAdminOne`,
      "POST",
      {
        userId: userId,
        instituteId: instituteId,
        departMent: department,
      },
      null
    );
    alert(res.data.message);
  } else if (role === "admin2") {
    const res = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/createAdminTwo`,
      "POST",
      { userId: userId, instituteId: instituteId },
      null
    );
    alert(res.data.message);
  } else if (role === "admin3") {
    alert("methods not implemented for admin3");
  }
};

export default function CreateAdmin({
  instituteName,
  instituteId,
  departmentList,
}) {
  const router = useRouter();
  const [roleValue, setRoleValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [departMentValue, setDepartMentValue] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(roleValue, departMentValue);
    if (roleValue === "" || emailValue === "") {
      alert("Please enter your email address and role");
      return;
    }
    await createAdminFunction(
      emailValue,
      instituteId,
      roleValue,
      departMentValue
    );
    // console.log(roleValue,emailValue,departMentValue)
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
            Create Admin
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={emailValue}
                  onChange={(e, value) => {
                    setEmailValue(e.target.value);
                  }}
                />
                <Autocomplete
                  value={roleValue}
                  onChange={(e, value) => {
                    // console.log(value)
                    setRoleValue(value.value);
                  }}
                  required
                  id="role"
                  options={roleOptions}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Admin" />
                  )}
                />
                <br />
                {roleValue !== "" &&
                  roleValue !== null &&
                  roleValue !== undefined &&
                  roleValue === "admin1" && (
                    <Autocomplete
                      value={departMentValue}
                      onChange={(e, value) => {
                        setDepartMentValue(value._id);
                      }}
                      required
                      id="department"
                      options={departmentList}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Department" />
                      )}
                      getOptionLabel={(option) => option.name || ""}
                    />
                  )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Admin
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
