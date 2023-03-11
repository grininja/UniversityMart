import React from "react";
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
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Alert, FormHelperText, Stack, Tab, Tabs } from "@mui/material";
// import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from "../../layouts/auth/layout";
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
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  name: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  address: Yup.string().required("Required"),
  gstin: Yup.string().required("Required"),
});

const SignUpSeller = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      gstin: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await apiCall(
        `${process.env.BASE_URL}/api/creation/createSeller`,
        "POST",
        {
          EmailId: values.email,
          Phone: values.phone,
          Gstin: values.gstin,
          Address: values.address,
          Name: values.name,
        },
        null
      );
      //   console.log(result.data.message);
      alert(result.data.message);
    },
  });

  return (
    <>
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
            SignUp Seller
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Seller Shop Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Seller Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Seller Complete Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="gstin"
              label="Seller GST Number"
              value={formik.values.gstin}
              onChange={formik.handleChange}
              error={formik.touched.gstin && Boolean(formik.errors.gstin)}
              helperText={formik.touched.gstin && formik.errors.gstin}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/authentication/loginSeller" variant="body2">
                  {"have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </>
  );
};

SignUpSeller.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default SignUpSeller;
