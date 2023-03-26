import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as WebAdminDashboard } from "../../../layouts/WebAdminDashboard/layout";
import { AccountProfile } from "../../../sections/WebAdmin/account-profile";
import { AccountProfileDetails } from "../../../sections/account/account-profile-details";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
const Page = () => (
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
              <Grid xs={12} md={6} lg={4}>
                <AccountProfile />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <AccountProfileDetails />
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
  try {
    if (session !== null) {
      const findInstutitute = await apiCall(
        `${process.env.BASE_URL}/api/institute/getInstituteByName?name=${session.user.name}`,
        "GET",
        {},
        null
      );
      if (
        findInstutitute.data.message === null &&
        findInstutitute.data.message === undefined &&
        findInstutitute.data.message === ""
      ) {
        return {
          redirect: {
            permanent: false,
            destination: "/auth/loginInstitute",
          },
          props: {},
        };
      }
      return {
        props: {},
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/loginInstitute",
        },
        props: {},
      };
    }
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginInstitute",
      },
      props: { error: "something happened" },
    };
  }
}
