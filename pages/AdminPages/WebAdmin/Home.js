import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as WebAdminDashboard } from "../../../layouts/WebAdminDashboard/layout";
import apiCall from "@/helper/apiCall";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
const Home = () => (
  <>
    <Head>
      <title>Overview | UnivresityMart</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} lg={8}></Grid>
          <Grid xs={12} md={6} lg={4}></Grid>
          <Grid xs={12} md={6} lg={4}></Grid>
          <Grid xs={12} md={12} lg={8}></Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Home.getLayout = (page) => <WebAdminDashboard>{page}</WebAdminDashboard>;

export default Home;

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
