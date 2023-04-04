import React, { useState } from "react";
import apiCall from "@/helper/apiCall";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import { Layout as AdminTwoDashboard } from "../../../../layouts/AdminTwoDashboard/layout";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import Image from "next/image";
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
} from "@mui/material";
const OrderDetails = ({ Order, AdminTwoId, InstituteId }) => {
  const [remarksValue, setRemarksValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const product = Order;
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  // Use the useTheme hook to get access to the current theme
  const theme = useTheme();
  var decodedUrlImage = "";
  if (product.product_detail.photo !== "") {
    let bufferObj = Buffer.from(product.product_detail.photo, "base64");

    // Decoding base64 into String
    decodedUrlImage = bufferObj.toString("utf8");
  }
  // Use the useMediaQuery hook to check the screen size and adjust the layout accordingly
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     padding: "16px",
    //   }}
    // >
    //   <Typography variant="h5" align="center">
    //     Order Details
    //   </Typography>
    //   <Box
    //     sx={{
    //       width: "100%",
    //       maxWidth: 800,
    //       padding: "16px",
    //     }}
    //   >
    //     <Stack spacing={3} direction={isMobile ? "column" : "row"}>
    //       <Stack
    //         alignItems="center"
    //         direction="row"
    //         spacing={1}
    //         sx={{ width: isMobile ? "100%" : "auto" }}
    //       >
    //         <Typography variant="body1" color="textSecondary" gutterBottom>
    //           Seller: {product.seller_details.name}
    //         </Typography>
    //         <Typography variant="body1" color="textSecondary">
    //           Email: {product.seller_details.email}
    //         </Typography>
    //         <Typography variant="body1" color="textSecondary">
    //           Address: {product.seller_details.address}
    //         </Typography>
    //         <Typography variant="body1" color="textSecondary">
    //           Phone: {product.seller_details.phone}
    //         </Typography>
    //         <Typography variant="body1" color="textSecondary">
    //           GSTIN: {product.seller_details.gstin}
    //         </Typography>
    //       </Stack>
    //     </Stack>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12} sm={6} md={4} key={product.id}>
    //         <Card
    //           sx={{
    //             height: "100%",
    //             display: "flex",
    //             flexDirection: "column",
    //           }}
    //         >
    //           <CardMedia
    //             component="img"
    //             image={decodedUrlImage || "/placeholder.png"}
    //             alt={product.product_detail.name}
    //             height={200}
    //             sx={{ objectFit: "cover" }}
    //           />
    //           <CardContent sx={{ flexGrow: 1 }}>
    //             <Typography variant="h5" component="h2" gutterBottom>
    //               {product.product_detail.name}
    //             </Typography>
    //             <Typography variant="body1" color="textSecondary" gutterBottom>
    //               Category: {product.product_detail.category}
    //             </Typography>
    //             <Typography variant="body1" color="textSecondary">
    //               Quantity: {product.order_details.quantity}
    //             </Typography>
    //             <Typography variant="body1" color="textSecondary">
    //               Total Price:{" "}
    //               {product.order_details.quantity *
    //                 product.product_detail.price}
    //             </Typography>
    //             <Typography variant="body1" color="textSecondary">
    //               RemarksSeller: {product.order_details.remarksSeller}
    //             </Typography>
    //             <Typography variant="body1" color="textSecondary">
    //               Status: {product.order_details.status}
    //             </Typography>
    //           </CardContent>
    //           <CardActions>
    //             <IconButton>
    //               <EllipsisVerticalIcon />
    //             </IconButton>
    //           </CardActions>
    //         </Card>
    //       </Grid>
    //     </Grid>

    //   </Box>
    // </Box>
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Order Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Grid container spacing={5} >
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle1" gutterBottom>
                Seller Details
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Name: {product.seller_details.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Email: {product.seller_details.email}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Address: {product.seller_details.address}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Phone: {product.seller_details.phone}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                GSTIN: {product.seller_details.gstin}
              </Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              
            </Box>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle1" gutterBottom>
                Product Details
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Name: {product.product_detail.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Category: {product.product_detail.category}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Quantity: {product.order_details.quantity}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Total Price:{" "}
                {product.order_details.quantity * product.product_detail.price}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                RemarksSeller: {product.order_details.remarksSeller}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Status: {product.order_details.status}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: "16px" }}>
          <Image
            src={decodedUrlImage || "/placeholder.png"}
            alt={product.product_detail.name}
            width={300}
            height={300}
          />
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
      getAdminTwo.data.message === null &&
      getAdminTwo.data.message === undefined &&
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
      `${process.env.BASE_URL}/api/adminTwoRequests/getDetailOfPlacedOrder?InstituteId=${InstituteId}&OrderRequestId=${orderId}`,
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
