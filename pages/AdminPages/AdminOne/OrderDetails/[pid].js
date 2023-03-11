import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import apiCall from "@/helper/apiCall";
import { useSession } from "next-auth/react";
import { Layout as AdminOneDashBoardLayout } from "../../../../layouts/AdminOneDashboard/layout";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import {
  Stack,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Container,
  Pagination,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

const OverViewOrder = (props) => {
  const { products = [] } = props;
  console.log(products);
  return (
    <Card>
      <CardHeader title="Order Details" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          return (
            <ListItem divider={hasDivider} key={product.id}>
              <ListItemAvatar>
                {product.detail.photo ? (
                  <Box
                    component="img"
                    src={product.detail.photo}
                    sx={{
                      borderRadius: 1,
                      height: 48,
                      width: 48,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: 1,
                      backgroundColor: "neutral.200",
                      height: 48,
                      width: 48,
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={product.detail.name}
                primaryTypographyProps={{ variant: "subtitle1" }}
                secondary={`Quantity ${product.quantity}`}
                secondaryTypographyProps={{ variant: "body2" }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Card>
  );
};

const Page = (props) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });
  const { Order, InstituteId, DepartmentId, AdminOneId } = props;
  // console.log(Order);

  return (
    <div>
      <Head>
        <title>OrderDetails| UniversityMart </title>
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
                <Typography variant="h4">Order Description</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
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
                  Update Order
                </Button>
              </div>
            </Stack>
            {/* <ItemSearch /> */}
            <Grid container spacing={3}>
              {Order && Order.products.length > 0 && (
                <OverViewOrder products={Order.products} />
              )}
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
  const OrderId = context.query.pid;
  try {
    const getAdminOne = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
      "GET",
      {},
      null
    );
    const OrderDetails = await apiCall(
      `${process.env.BASE_URL}/api/adminOneRequests/OrderHandler/getOrderById?OrderId=${OrderId}&InstituteId=${getAdminOne.data.message.Institute}`,
      "GET",
      {},
      null
    );
    return {
      props: {
        Order: OrderDetails.data.message,
        InstituteId: getAdminOne.data.message.Institute,
        DepartmentId: getAdminOne.data.message.department,
        AdminOneId: getAdminOne.data.message._id,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
