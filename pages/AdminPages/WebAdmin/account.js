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
import { AccountProfileDetails } from "../../../sections/WebAdmin/account-profile-details";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
const Page = ({ institueDetail }) => (
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
                <AccountProfile
                  InstituteId={institueDetail._id}
                  imageUrl={institueDetail.logoUrl}
                />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <AccountProfileDetails InstituteDetail={institueDetail} />
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
        destination: "/auth/loginInstitute",
      },
      props: {},
    };
  }

  try {
    const findInstutitute = await apiCall(
      `${process.env.BASE_URL}/api/institute/getAllInstituteDetailsByName?name=${session.user.name}`,
      "GET",
      {},
      null
    );

    if (
      findInstutitute.data.message === null ||
      findInstutitute.data.message === undefined ||
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
      props: {
        institueDetail: findInstutitute.data.message,
      },
    };
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
