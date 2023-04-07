import Head from "next/head";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as SellerDashboard } from "../../layouts/SellerDashboard/layout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
const Home = (props) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginSeller");
    },
  });
  return (
    <div>
      <Head>
        <title>SellerDashboard | UnivresityMart</title>
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
            src="/images/welcomeseller.svg"
            layout="fill"
            objectFit="contain"
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
    </div>
  );
};

Home.getLayout = (page) => <SellerDashboard>{page}</SellerDashboard>;

export default Home;

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
    const getSeller = await apiCall(
      `${process.env.BASE_URL}/api/seller/getSellerWithEmail?EmailId=${session.user.email}`,
      "GET",
      {},
      null
    );
    if (
      getSeller.data.message === null &&
      getSeller.data.message === undefined &&
      getSeller.data.message === ""
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/loginSeller",
        },
        props: {},
      };
    }

    return {
      props: {
        sellerId: getSeller.data.message._id,
      },
    };
  } catch (e) {
    // console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginSeller",
      },
      props: {},
    };
    return { props: { error: "something happened" } };
  }
}
