import React, { useState } from "react";
import apiCall from "@/helper/apiCall";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import { Layout as AdminTwoDashboard } from "../../../../layouts/AdminTwoDashboard/layout";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import { useRouter } from "next/router";
import {
  Stack,
  Box,
  InputLabel,
  MenuItem,
  Button,
  Card,
  CardMedia,
  TextField,
  Divider,
  IconButton,
  Select,
  List,
  ListItem,
  ListItemAvatar,
  CardActions,
  SvgIcon,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
  CardContent,
  useMediaQuery,
  useTheme,
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));
const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));
const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});
const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));
const OrderDetails = ({ Order, AdminTwoId, InstituteId }) => {
  const [remarksValue, setRemarksValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const products = Order.products;
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  // Use the useTheme hook to get access to the current theme
  const theme = useTheme();
  // console.log(products);
  const router = useRouter();
  // Use the useMediaQuery hook to check the screen size and adjust the layout accordingly
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Typography variant="h5" align="center">
        Order Details
      </Typography>
      <Box
        sx={{
          width: "100%",
          maxWidth: 800,
          padding: "16px",
        }}
      >
        <Stack spacing={3} direction={isMobile ? "column" : "row"}>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={{ width: isMobile ? "100%" : "auto" }}
          >
            <InputLabel id="demo-simple-select-helper-label">Tag</InputLabel>
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
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={{ width: isMobile ? "100%" : "auto" }}
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
        </Stack>
        <Grid container spacing={2}>
          {products.map((product, index) => {
            const hasDivider = index < products.length - 1;
            var decodedUrlImage = "";
            if (product.detail.photo !== "") {
              let bufferObj = Buffer.from(product.detail.photo, "base64");

              // Decoding base64 into String
              decodedUrlImage = bufferObj.toString("utf8");
            }
            return (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ImageButton
                    focusRipple
                    key={index}
                    style={{
                      width: 300,
                    }}
                    onClick={() => {
                      router.push(
                        `/AdminPages/AdminTwo/ProductRedirect/${product.detail.name}`
                      );
                    }}
                  >
                    <ImageSrc
                      style={{ backgroundImage: `url(${decodedUrlImage})` }}
                    />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                          position: "relative",
                          p: 4,
                          pt: 2,
                          pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                      >
                        {"Search Product"}
                        <ImageMarked className="MuiImageMarked-root" />
                      </Typography>
                    </Image>
                  </ImageButton>
                  {/* <CardMedia
                    component="img"
                    image={decodedUrlImage || "/placeholder.png"}
                    alt={product.detail.name}
                    height={200}
                    sx={{ objectFit: "cover" }}
                  /> */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {product.detail.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      gutterBottom
                    >
                      Category: {product.detail.category}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Quantity: {product.quantity}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton>
                      <EllipsisVerticalIcon />
                    </IconButton>
                  </CardActions>
                </Card>
                {hasDivider && <Divider />}
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ my: 4 }}>
          <Typography variant="h5">
            Requester Department: {Order.DepartmentName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

OrderDetails.getLayout = (page) => (
  <AdminTwoDashboard>{page}</AdminTwoDashboard>
);

export default OrderDetails;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  //   console.log(session);
  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginUser",
      },
      props: {},
    };
  }

  const orderId = context.query.pid;

  try {
    const getAdminTwo = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/adminTwoByEmail?AdminTwoEmail=${session.user.email}`,
      "GET",
      {},
      null
    );
    if (
      getAdminTwo.data.message === null ||
      getAdminTwo.data.message === undefined ||
      getAdminTwo.data.message === ""
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/loginUser",
        },
        props: {},
      };
    }
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
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginUser",
      },
      props: { error: "something happened" },
    };
  }
}
