import React, { useState } from "react";
import apiCall from "@/helper/apiCall";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import { useSession } from "next-auth/react";
import { Layout as AdminTwoDashboard } from "../../../../layouts/AdminTwoDashboard/layout";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import {
  Avatar,
  Stack,
  Box,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  Unstable_Grid2 as Grid,
  CardContent,
  Item,
  SendIcon,
  Paper,
  CardMedia,
  CardActionArea,
  Button,
  Fab,
  ListItemAvatar,
} from "@mui/material";

const ChatBox = ({ ChatBox }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {ChatBox &&
        ChatBox.length > 0 &&
        ChatBox.map((chat) => {
          return (
            <ListItem alignItems="flex-start" key={chat._id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="" />
              </ListItemAvatar>
              <ListItemText
                primary={chat.question.request}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Quantity Requested:{chat.question.quantity}
                    </Typography>
                    <br></br>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Seller Response:
                    </Typography>
                    {chat.response}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      <Divider variant="inset" component="li" />
    </List>
  );
};

const validationSchema = Yup.object({
  queryText: Yup.string().required("Required"),
  queryQuantity: Yup.number()
    .min(1, "Quantity must be greater than 0 ")
    .required("Quantity is required"),
});

const ContactSeller = ({ InstituteId, Product, AdminTwoId }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      queryText: "",
      queryQuantity: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const result = await apiCall(
        `${process.env.BASE_URL}/api/chatApi/createChatSession`,
        "POST",
        {
          ItemId: Product._id,
          Quantity: values.queryQuantity,
          BuyerRequest: values.queryText,
          SellerId: Product.sellerDetail._id,
          BuyerId: AdminTwoId,
        },
        null
      );
      alert(result.data.message);
      router.reload();
    },
  });

  return (
    <>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Submit Query
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="queryText"
            label="Write your question"
            value={formik.values.queryText}
            onChange={formik.handleChange}
            error={formik.touched.queryText && Boolean(formik.errors.queryText)}
            helperText={formik.touched.queryText && formik.errors.queryText}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="queryQuantity"
            label="Enter product quantity you want to purchase"
            value={formik.values.queryQuantity}
            onChange={formik.handleChange}
            error={
              formik.touched.queryQuantity &&
              Boolean(formik.errors.queryQuantity)
            }
            helperText={
              formik.touched.queryQuantity && formik.errors.queryQuantity
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

const ProductDesc = (props) => {
  const { InstituteId, Product, AdminTwoId, Chats } = props;
  const spacing = 0.5;
  return (
    <div>
      {Product && (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={6}>
            <CardActionArea>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  pb: 3,
                }}
              >
                {/* <CardMedia
                component="img"
                variant
                image={Product.productImageUrl}
                alt="Product Image"
              /> */}
              </Box>
              <CardContent>
                <Typography align="center" gutterBottom variant="h5">
                  {Product.name}
                </Typography>
                <br></br>
                <Typography align="center" variant="body1">
                  {Product.description}
                </Typography>
                <br></br>
                <Typography
                  color="text.secondary"
                  align="center"
                  variant="body1"
                >
                  Price: {Product.price}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  pb: 3,
                }}
              ></Box>
              <CardContent>
                <Typography align="center" gutterBottom variant="h5">
                  Seller: {Product.sellerDetail.name}
                </Typography>
                <br></br>
                <Typography align="center" variant="body1">
                  Seller Email: {Product.sellerDetail.email}
                </Typography>
                <br></br>
                <Typography
                  color="text.secondary"
                  align="center"
                  variant="body1"
                >
                  Seller Phone: {Product.sellerDetail.phone}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <ContactSeller
                InstituteId={InstituteId}
                Product={Product}
                AdminTwoId={AdminTwoId}
              />
              <ChatBox ChatBox={Chats} />
            </Stack>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

ProductDesc.getLayout = (page) => <AdminTwoDashboard>{page}</AdminTwoDashboard>;

export default ProductDesc;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  //   console.log(session)
  const productId = context.query.pid;
  try {
    const getAdminTwo = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/adminTwoByEmail?AdminTwoEmail=${session.user.email}`,
      "GET",
      {},
      null
    );
    const InstituteId = getAdminTwo.data.message.Institute;
    const SellerProduct = await apiCall(
      `${process.env.BASE_URL}/api/adminTwoRequests/getSellerProductById?ProductId=${productId}&AdminTwoId=${getAdminTwo.data.message._id}`,
      "GET",
      {},
      null
    );
    const chatHistory = await apiCall(
      `${process.env.BASE_URL}/api/chatApi/getAllChatsByProduct?BuyerId=${getAdminTwo.data.message._id}&SellerId=${SellerProduct.data.message.sellerDetail._id}&ProductID=${SellerProduct.data.message._id}`,
      "GET",
      {},
      null
    );
    // console.log(chatHistory.data.message)
    //   console.log(SellerProduct.data.message)
    return {
      props: {
        InstituteId: InstituteId,
        Product: SellerProduct.data.message,
        AdminTwoId: getAdminTwo.data.message._id,
        Chats: chatHistory.data.message,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
