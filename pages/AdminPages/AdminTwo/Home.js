import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as AdminTwoDashboard } from "../../../layouts/AdminTwoDashboard/layout";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
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
          src="/images/welcomeadmin2.svg"
          layout="fill"
          objectFit="contain"
          alt="Follow us on Twitter"
        />
        {/* <Grid container spacing={3}> */}
          {/* <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} sm={6} lg={3}></Grid>
          <Grid xs={12} lg={8}></Grid>
          <Grid xs={12} md={6} lg={4}></Grid>
          <Grid xs={12} md={6} lg={4}></Grid>
          <Grid xs={12} md={12} lg={8}></Grid> */}
        {/* </Grid> */}
      </Container>
    </Box>
  </>
);

Home.getLayout = (page) => <AdminTwoDashboard>{page}</AdminTwoDashboard>;

export default Home;


export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  try {
    const getAdminTwo = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/adminTwoByEmail?AdminTwoEmail=${session.user.email}`,
      "GET",
      {},
      null
    );
    if (
      getAdminTwo.data.message === null ||
      getAdminTwo.data.message === undefined ||
      getAdminTwo.data.message === ""
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
        // InstituteId: getAdminOne.data.message.Institute,
        // // DepartmentId: getAdminOne.data.message.department,
        // AdminOneId: getAdminOne.data.message._id,
        // Orders: allOrders.data.message,
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
