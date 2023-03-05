import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as WebAdminDashboard } from "../../../layouts/WebAdminDashboard/layout";

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
