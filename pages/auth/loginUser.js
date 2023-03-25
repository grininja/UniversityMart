import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "../../layouts/auth/layout";
import React, { useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiCall from "@/helper/apiCall";
import Autocomplete from "@mui/material/Autocomplete";

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
  //   {
  //     label: "Admin3",
  //     value: "dmin3",
  //   },
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
      if (role.value === "admin1") {
        const result = await signIn("email", {
          email,
          callbackUrl: `${process.env.BASE_URL}/AdminPages/AdminOne/Home`,
        });
      } else if (role.value === "admin2") {
        const result = await signIn("email", {
          email,
          callbackUrl: `${process.env.BASE_URL}/AdminPages/AdminTwo/Home`,
        });
      }
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

function LoginUser(props) {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState(" ");
  const [emailValue, setEmailValue] = React.useState("");
  const [roleValue, setRoleValue] = React.useState("");
  //   const [emailInputValue, setEmailInputValue] = React.useState("");
  const defaultProps = {
    options: props.institutes,
    getOptionLabel: (option) => option.name,
  };
  return (
    <>
      <Head>
        <title>LoginInstitute | UniversityMart</title>
      </Head>
      {props.institutes && props.institutes.length > 0 && (
        <Box
          sx={{
            backgroundColor: "background.paper",
            flex: "1 1 auto",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: "100px",
              width: "100%",
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h4">Login Admins</Typography>
                <Typography color="text.secondary" variant="body2">
                  Don&apos;t have an account? &nbsp;
                  <Link
                    component={NextLink}
                    href="/auth/registerInstitute"
                    underline="hover"
                    variant="subtitle2"
                  >
                    First Register Institute
                  </Link>
                </Typography>
              </Stack>

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
                {/* <button
                  onClick={() =>
                    signOut({ callbackUrl: `${process.env.BASE_URL}` })
                  }
                >
                  Sign Out
                </button> */}
              </Box>
            </div>
          </Box>
        </Box>
      )}
    </>
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

LoginUser.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default LoginUser;
