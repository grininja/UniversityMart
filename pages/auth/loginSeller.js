import React from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { Stack, Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import apiCall from "@/helper/apiCall";
import { signIn, signOut } from "next-auth/react";
import { Layout as AuthLayout } from "../../layouts/auth/layout";
var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
import Head from "next/head";

const Login = ({ email }) => (
  <Button
    onClick={async (e) => {
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

      const findSellerWithEmail = await apiCall(
        `/api/seller/getSellerWithEmail?EmailId=${email}`,
        "GET",
        {},
        null
      );
      if (findSellerWithEmail.data.message !== true) {
        alert("Seller does not exist");
        return;
      }

      const result = await signIn("email", {
        email,
        callbackUrl: `${process.env.BASE_URL}`,
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

const LoginSeller = () => {
  const [emailValue, setEmailValue] = React.useState("");
  return (
    <div>
      <Head>
        <title>LoginInstitute | UniversityMart</title>
      </Head>
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
              <Typography variant="h4">Login Seller</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/SignUpSeller"
                  underline="hover"
                  variant="subtitle2"
                >
                  First Register Seller
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
              <Login email={emailValue} />
            </Box>
          </div>
        </Box>
      </Box>
    </div>
  );
};
LoginSeller.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default LoginSeller;
