import Head from "next/head";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as AdminOneDashboard } from "../../../layouts/AdminOneDashboard/layout";
import WelcomeImage from "../../../public/images/welcome.svg";
import Image from "next/image";
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
        <Image
          src="/images/welcomeadmin1.svg"
          height={32}
          width={32}
          alt="Follow us on Twitter"
        />
        {/* <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} lg={8}></Grid>
          <Grid xs={12} md={6} lg={4}></Grid>
          <Grid xs={12} md={6} lg={4}></Grid>
          <Grid xs={12} md={12} lg={8}></Grid>
        </Grid> */}
      </Container>
    </Box>
  </>
);

Home.getLayout = (page) => <AdminOneDashboard>{page}</AdminOneDashboard>;

export default Home;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginUser",
      },
      props: {},
    };
  }
  try {
    const getAdminOne = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
      "GET",
      {},
      null
    );
    if (
      getAdminOne.data.message === null &&
      getAdminOne.data.message === undefined &&
      getAdminOne.data.message === ""
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/loginUser",
        },
        props: {},
      };
    }

    return {
      props: {
        // itemsList: allItems.data.message,
        // Institute: getAdminOne.data.message.Institute,
        // Department: getAdminOne.data.message.department,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginUser",
      },
      props: { error: "something happened" },
    };
  }
}
