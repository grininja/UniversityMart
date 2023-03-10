import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
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
import { Layout as AdminOneDashBoardLayout } from "../../../layouts/AdminOneDashboard/layout";
import { CartItem } from "../../../sections/AdminOne/cart-item";
// import { ItemSearch } from "../../../sections/AdminOne/item-search";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
const Page = (props) => {
  const { AdminOneId, cartItems, DepartmentId, InstituteId } = props;
  console.log(cartItems);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });

  return (
    <div>
      <Head>
        <title>Cart| UniversityMart </title>
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
            {/* <ItemSearch /> */}
            <Typography variant="h4">Cart Items</Typography>
            <Grid container spacing={3}>
              {cartItems.map((product) => (
                <Grid xs={12} md={6} lg={4} key={product._id}>
                  <CartItem
                    item={product}
                    AdminOne={AdminOneId}
                    Department={DepartmentId}
                    Institute={InstituteId}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminOneDashBoardLayout>{page}</AdminOneDashBoardLayout>
);

export default Page;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  try {
    const getAdminOne = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
      "GET",
      {},
      null
    );
    const getCartItems = await apiCall(
      `${process.env.BASE_URL}/api/adminOneRequests/cartHandler/getAllItem?AdminOneId=${getAdminOne.data.message._id}`
    );
    return {
      props: {
        AdminOneId: getAdminOne.data.message._id,
        cartItems: getCartItems.data.message,
        DepartmentId: getAdminOne.data.message.department,
        InstituteId: getAdminOne.data.message.Institute,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
