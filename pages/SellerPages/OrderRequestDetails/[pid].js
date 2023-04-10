import React, { useState } from "react";
import apiCall from "@/helper/apiCall";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import { Layout as AdminTwoDashboard } from "../../../layouts/SellerDashboard/layout";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  Hidden,
} from "@mui/material";
import { setDate } from "date-fns";
const OrderDetails = ({ sellerId, OrderDescription }) => {
  const [remarksValue, setRemarksValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const product = OrderDescription;
  var decodedUrlImage = "";
  if (product && product.OrderDetail.photoUrl !== "") {
    let bufferObj = Buffer.from(product.OrderDetail.photoUrl, "base64");
    decodedUrlImage = bufferObj.toString("utf8");
  }
  return (
    <Box sx={{ m: { xs: 1, sm: 2, md: 3 }, maxWidth: 1000, mx: "auto" }}>
      <Card>
        <CardHeader title="Order Details" />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          padding={{ xs: 1, sm: 2 }}
        >
          <Stack alignItems="center" direction="row" spacing={{ xs: 1, sm: 2 }}>
            <InputLabel id="demo-simple-select-helper-label">
              <Typography variant="h6">Tag</Typography>
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={tagValue}
              label="Tag"
              onChange={(event) => {
                setTagValue(event.target.value);
              }}
            >
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </Stack>
          {/* <Stack alignItems="center" direction="row" spacing={{ xs: 1, sm: 2 }}> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(event) => {
                console.log(event);
                setDateValue(event.$d);
              }}
              inputFormat="MM/dd/yyyy"
            />
          </LocalizationProvider>
          {/* </Stack> */}
          <Stack alignItems="center" direction="row" spacing={{ xs: 1, sm: 2 }}>
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
            <Button
              startIcon={
                <SvgIcon fontSize="small">{<ArrowPathIcon />}</SvgIcon>
              }
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
                    DeliveryDate: dateValue,
                  },
                  null
                );
                alert(updateresult.data.message);
              }}
            >
              Update Status
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Grid container spacing={2}>
        <Grid xs={12} md={6} lg={4}>
          <List>
            <ListItem>
              <ListItemAvatar sx={{ mr: 2 }}>
                {product.OrderDetail.photoUrl ? (
                  <Box
                    component="img"
                    src={decodedUrlImage}
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
              <Grid xs={12} justifyContent="center">
                <Typography align="center" variant="h5" sx={{ mb: 1 }}>
                  {product.OrderDetail.name}
                </Typography>
                <Typography align="center" variant="body1" sx={{ mb: 1 }}>
                  Category: {product.OrderDetail.category}
                </Typography>
                <Typography align="center" variant="body1" sx={{ mb: 1 }}>
                  Quantity: {product.OrderDetail.quantity}
                </Typography>
              </Grid>
              <Hidden smDown>
                <IconButton edge="end">
                  <SvgIcon>
                    <EllipsisVerticalIcon />
                  </SvgIcon>
                </IconButton>
              </Hidden>
            </ListItem>
          </List>
        </Grid>
        <Hidden mdUp>
          <Grid xs={12} justifyContent="center">
            <IconButton edge="end">
              <SvgIcon>
                <EllipsisVerticalIcon />
              </SvgIcon>
            </IconButton>
          </Grid>
        </Hidden>
        <Grid xs={12} md={6} lg={4}>
          <Stack
            direction="column"
            justifyContent="center"
            margin={{ xs: 2, md: 0 }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Requester Detail: {product.InstituteDetail.name}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Address: {product.InstituteDetail.address}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Phone: {product.InstituteDetail.phone}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
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
