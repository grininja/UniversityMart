import React, { useState } from "react";
import apiCall from "@/helper/apiCall";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import { useSession } from "next-auth/react";
import { Layout as AdminTwoDashboard } from "../../../layouts/SellerDashboard/layout";
import { authOptions } from "../../api/auth/[...nextauth]";
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
const OrderDetails = ({ sellerId, OrderDescription }) => {
  const [remarksValue, setRemarksValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const product = OrderDescription;
  return (
    // <Stack direction="row" justifyContent="center">
    <Box
      sx={{
        m: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <CardHeader title="Order Details" />
        <Stack spacing={3} direction="row" justifyContent="space-around">
          <Stack alignItems="center" direction="row" spacing={1}>
            <InputLabel id="demo-simple-select-helper-label">
              {" "}
              <Typography variant="h6">Tag </Typography>
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
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            justifyContent="space-between"
          >
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
                `${process.env.BASE_URL}/api/seller/orders/addRemarks`,
                "POST",
                {
                  OrderId: product.OrderDetail.id,
                  SellerId: sellerId,
                  remarks: remarksValue,
                  TagValue: tagValue,
                },
                null
              );
              alert(updateresult.data.message);
            }}
          >
            Update Status
          </Button>
        </Stack>
        <List>
          <ListItem key={product.OrderDetail.id}>
            <ListItemAvatar>
              {product.OrderDetail.photoUrl ? (
                <Box
                  component="img"
                  src={product.OrderDetail.photoUrl}
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
            <Grid xs={12} md={6} lg={4} key={product.OrderDetail.id}>
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
                    {product.OrderDetail.name}
                  </Typography>
                  <Typography align="center" variant="body1">
                    Category: {product.OrderDetail.category}
                  </Typography>
                  <Typography align="center" variant="body1">
                    Quantity: {product.OrderDetail.quantity}
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
        </List>

        <Divider />
        <Stack direction="column" justifyContent="center" margin={2}>
          <Typography variant="h6">
            Requester Detail: {product.InstituteDetail.name}
          </Typography>
          <Typography variant="h6">
            Address: {product.InstituteDetail.address}
          </Typography>
          <Typography variant="h6">
            Address: {product.InstituteDetail.phone}
          </Typography>
        </Stack>
      </Card>
      {/* </Stack>
       */}
    </Box>
  );
};

OrderDetails.getLayout = (page) => (
  <AdminTwoDashboard>{page}</AdminTwoDashboard>
);

export default OrderDetails;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const orderId = context.query.pid;
  try {
    const getSeller = await apiCall(
      `${process.env.BASE_URL}/api/seller/getSellerWithEmail?EmailId=${session.user.email}`,
      "GET",
      {},
      null
    );

    const OrderDesc = await apiCall(
      `${process.env.BASE_URL}/api/seller/orders/getOrderDetailById?SellerId=${getSeller.data.message._id}&OrderId=${orderId}`
    );

    return {
      props: {
        sellerId: getSeller.data.message._id,
        OrderDescription: OrderDesc.data.message,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
