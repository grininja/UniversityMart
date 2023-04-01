import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import apiCall from "@/helper/apiCall";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as SellerDashboardLayout } from "../../layouts/SellerDashboard/layout";
import { ProductCard } from "../../sections/Seller/product-card";
import { ProductSearch } from "../../sections/Seller/product-search";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const Page = (props) => {
  const { sellerId, products } = props;
  // console.log(itemsList);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });

  return (
    <div>
      <Head>
        <title>Items List| UniversityMart </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Your Products</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  href="/AdminPages/AdminOne/CreateItem"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <ProductSearch />
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid xs={12} md={6} lg={4} key={product._id}>
                  <ProductCard item={product} SellerId={sellerId} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Pagination count={3} size="small" /> */}
            </Box>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

Page.getLayout = (page) => (
  <SellerDashboardLayout>{page}</SellerDashboardLayout>
);

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
    //  console.log(getSeller.data.message);
    const getProducts = await apiCall(
      `${process.env.BASE_URL}/api/seller/products/listAllProducts?sellerId=${getSeller.data.message._id}`,
      "GET",
      {},
      null
    );
    // console.log(getProducts.data.message);
    return {
      props: {
        sellerId: getSeller.data.message._id,
        products: getProducts.data.message,
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
