import Head from "next/head";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as AdminTwoDashboard } from "../../../layouts/AdminTwoDashboard/layout";
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

Home.getLayout = (page) => <AdminTwoDashboard>{page}</AdminTwoDashboard>;

export default Home;

// export async function getServerSideProps(context) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   console.log(session);
//   try {
//     const getAdminOne = await apiCall(
//       `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
//       "GET",
//       {},
//       null
//     );
//     const allItems = await apiCall(
//       `${process.env.BASE_URL}/api/adminOneRequests/productHandler/getAllItems?departmentId=${getAdminOne.data.message.department}`
//     );
//     console.log(allItems.data.message);
//     return {
//       props: {
//         // itemsList: allItems.data.message,
//         // Institute: getAdminOne.data.message.Institute,
//         // Department: getAdminOne.data.message.department,
//       },
//     };
//   } catch (e) {
//     console.log(e);
//     return { props: { error: "something happened" } };
//   }
// }

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log(session);
    try {
      // const getAdminOne = await apiCall(
      //   `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
      //   "GET",
      //   {},
      //   null
      // );
      // const allOrders = await apiCall(
      //   `${process.env.BASE_URL}/api/adminOneRequests/OrderHandler/getAllOrder?DepartmentId=${getAdminOne.data.message.department}`
      // );
      // console.log(allOrders.data.message);
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
      return { props: { error: "something happened" } };
    }
  }