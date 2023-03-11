import React, { useEffect } from "react";
import { useFormik, Field, Formik, Form } from "formik";
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
import { useRouter } from "next/router";
import { fieldToTextField } from "formik-material-ui";

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
  email: Yup.string().email("Invalid email address").required("Required"),
  institute: Yup.string().required("Institute name is required"),
});

const FormikAutocomplete = ({ textFieldProps, ...props }) => {
  const {
    form: { setTouched, setFieldValue },
  } = props;
  const { error, helperText, ...field } = fieldToTextField(props);
  const { name } = field;
  const defaultProps = {
    options: props.institute,
    getOptionLabel: (option) => option.name,
  };
  return (
    <Autocomplete
      {...defaultProps}
      {...field}
      onChange={(_, value) => setFieldValue(name, value.name)}
      onBlur={() => setTouched({ [name]: true })}
      getOptionSelected={(item, current) => {
        item.name === current.name;
      }}
      renderInput={(props) => (
        <TextField
          {...props}
          {...textFieldProps}
          helperText={helperText}
          error={error}
        />
      )}
    />
  );
};
const initialValues = {
  email: "",
  institute: "",
};
const LoginUserForm = ({ institutes }) => {
  console.log(institutes);
  const router = useRouter();
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
              SignIn Institute
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnBlur={false}
              validateOnChange
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {(formik) => (
                <Form>
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

                  <Field
                    name="institute"
                    component={FormikAutocomplete}
                    label="institute"
                    options={institutes}
                    textFieldProps={{
                      fullWidth: true,
                      margin: "normal",
                      variant: "outlined",
                    }}
                    single
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Do not have an account? Sign up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
          {/* </Box> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export async function getServerSideProps(context) {
  try {
    const res = await apiCall(
      "http://localhost:3000/api/institute/getAllInstitutes",
      "GET",
      {},
      ""
    );
    const institutes = await res.data.message;
    console.log(institutes);
    return {
      props: {
        institutes: [...institutes],
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}

export default LoginUserForm;
