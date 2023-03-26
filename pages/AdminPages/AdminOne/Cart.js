import Head from "next/head";
import apiCall from "@/helper/apiCall";
import { useSession } from "next-auth/react";
import PaperAirplaneIcon from "@heroicons/react/24/solid/PaperAirplaneIcon";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Select,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { Layout as AdminOneDashBoardLayout } from "../../../layouts/AdminOneDashboard/layout";
import { CartItem } from "../../../sections/AdminOne/cart-item";
// import { ItemSearch } from "../../../sections/AdminOne/item-search";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import { useState } from "react";
const Page = (props) => {
  const { AdminOneId, cartItems, DepartmentId, InstituteId } = props;
  // console.log(cartItems);
  const [remarksValue, setRemarksValue] = useState("");
  // console.log(InstituteId);
  const [tagValue, setTagValue] = useState("");
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
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={3} direction="row">
                <Typography variant="h4">Cart Items</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Tag
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={tagValue}
                    label="Age"
                    onChange={(event) => {
                      setTagValue(event.target.value);
                    }}
                  >
                    <MenuItem value="Urgent">Urgent</MenuItem>
                    <MenuItem value="Non Urgent">Non-Urgent</MenuItem>
                  </Select>
                </Stack>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    label="Remarks"
                    name="Remarks"
                    onChange={(event) => {
                      setRemarksValue(event.target.value);
                    }}
                    required
                    value={remarksValue}
                  />
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PaperAirplaneIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={async () => {
                    let productList = [];
                    for (let i = 0; i < cartItems.length; i++) {
                      var product = cartItems[i];
                      productList.push({
                        detail: {
                          itemId: cartItems[i].detail._id,
                          category: product.detail.category,
                          department: product.detail.department,
                          name: product.detail.name,
                          photo: product.detail.photo,
                        },
                        quantity: product.quantity,
                      });
                    }
                    const createOrderResult = await apiCall(
                      `${process.env.BASE_URL}/api/adminOneRequests/OrderHandler/createOrder`,
                      "POST",
                      {
                        products: productList,
                        Institute: InstituteId,
                        adminInitiated: AdminOneId,
                        tag: tagValue,
                        remarks: remarksValue,
                        status: "pending",
                        department: DepartmentId,
                      },
                      null
                    );

                    alert(createOrderResult.data.message);
                  }}
                >
                  Checkout
                </Button>
              </div>
            </Stack>
            {/* <ItemSearch /> */}

            <Grid container spacing={3}>
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((product) => (
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
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginUser",
      },
      props: { error: "something happened" },
    };
  }
}
