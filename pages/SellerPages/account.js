import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as WebAdminDashboard } from "../../layouts/SellerDashboard/layout";
// import { AccountProfile } from "../../sections/WebAdmin/account-profile";
import { AccountProfileDetails } from "../../sections/Seller/account-profile-details";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
const Page = ({ sellerDetail }) => (
  <>
    <Head>
      <title>Account | UniversityMart</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              {/* <Grid xs={12} md={6} lg={4}>
                <AccountProfile InstituteId={sellerDetail._id} imageUrl={sellerDetail.logoUrl}/>
              </Grid> */}
              <Grid xs={12} md={6} lg={8}>
                <AccountProfileDetails SellerDetails={sellerDetail} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <WebAdminDashboard>{page}</WebAdminDashboard>;

export default Page;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginSeller",
      },
      props: {},
    };
  }

  try {
    const findSeller = await apiCall(
      `${process.env.BASE_URL}/api/seller/getSellerWithEmail?EmailId=${session.user.email}`,
      "GET",
      {},
      null
    );
    if (
      findSeller.data.message === null ||
      findSeller.data.message === undefined ||
      findSeller.data.message === ""
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/loginSeller",
        },
        props: {},
      };
    }
    // console.log(findSeller);
    return {
      props: {
        sellerDetail: findSeller.data.message,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginSeller",
      },
      props: {},
    };
  }
}
