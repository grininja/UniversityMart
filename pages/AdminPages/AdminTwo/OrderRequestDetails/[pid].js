import React, { useState } from "react";
import apiCall from "@/helper/apiCall";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import { useSession } from "next-auth/react";
import { Layout as AdminTwoDashboard } from "../../../../layouts/AdminTwoDashboard/layout";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import {
  Stack,
  Box,
  InputLabel,
  MenuItem,
  Button,
  Card,
  CardActions,
  CardHeader,
  TextField,
  Divider,
  IconButton,
  Select,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Container,
  Pagination,
  Typography,
  Unstable_Grid2 as Grid,
  CardContent,
} from "@mui/material";
const OrderDetails = ({ Order, AdminTwoId, InstituteId }) => {
  const [remarksValue, setRemarksValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const products = Order.products;
  return (
    <Stack direction="row" justifyContent="center">
      <Card>
        <CardHeader title="Order Details" />
        <Stack spacing={3} direction="row">
          <Stack alignItems="center" direction="row" spacing={1}>
            <InputLabel id="demo-simple-select-helper-label">Tag</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={tagValue}
              label="Age"
              onChange={(event) => {
                setTagValue(event.target.value);
              }}
            >
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
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
          <Button
            startIcon={<SvgIcon fontSize="small">{<ArrowPathIcon />}</SvgIcon>}
            variant="contained"
            onClick={async () => {
              const updateresult = await apiCall(
                `${process.env.BASE_URL}/api/adminTwoRequests/updateRequest`,
                "POST",
                {
                  OrderReuqestId: Order._id,
                  InstituteId: InstituteId,
                  newStatus: tagValue,
                  adminTwoRemark: remarksValue,
                },
                null
              );
              alert(updateresult.data.message);
            }}
          >
            Update Status
          </Button>
          {/* <Stack alignItems="flex-end" direction="row" spacing={1}> */}

          {/* </Stack> */}
        </Stack>
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
                <Grid xs={12} md={6} lg={4} key={product.detail.itemId}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          pb: 3,
                        }}
                      ></Box>
                      <Typography align="center" gutterBottom variant="h5">
                        {product.detail.name}
                      </Typography>
                      <Typography align="center" variant="body1">
                        Category: {product.detail.category}
                      </Typography>
                      <Typography align="center" variant="body1">
                        Quantity: {product.quantity}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
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
        <Stack direction="row" alignItems="center">
          <Typography variant="h5">
            Requester Department: {Order.DepartmentName}
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
};

OrderDetails.getLayout = (page) => (
  <AdminTwoDashboard>{page}</AdminTwoDashboard>
);

export default OrderDetails;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  //   console.log(session);
  const orderId = context.query.pid;

  try {
    const getAdminTwo = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/adminTwoByEmail?AdminTwoEmail=${session.user.email}`,
      "GET",
      {},
      null
    );
    const InstituteId = getAdminTwo.data.message.Institute;
    const OrderDetail = await apiCall(
      `${process.env.BASE_URL}/api/adminTwoRequests/getOrderRequestById?InstituteId=${InstituteId}&OrderRequestId=${orderId}`,
      "GET",
      {},
      null
    );
    return {
      props: {
        InstituteId: InstituteId,
        Order: OrderDetail.data.message,
        AdminTwoId: getAdminTwo.data.message._id,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
