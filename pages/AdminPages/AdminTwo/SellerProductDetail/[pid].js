import React, { useState } from "react";
import apiCall from "@/helper/apiCall";
import { Layout as AdminTwoDashboard } from "../../../../layouts/AdminTwoDashboard/layout";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useFormik } from "formik";
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
  CardActions,
  ListItemAvatar,
  ButtonGroup,
} from "@mui/material";
import Image from "next/image";
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
      {/* <Divider variant="inset" component="li" /> */}
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      queryText: "",
      queryQuantity: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
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
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
      setIsSubmitting(false);
    },
  });

  return (
    <Box
      sx={{
        my: 8,
        mx: "auto",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Submit Query
      </Typography>
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
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
          sx={{ mb: 2 }}
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
            formik.touched.queryQuantity && Boolean(formik.errors.queryQuantity)
          }
          helperText={
            formik.touched.queryQuantity && formik.errors.queryQuantity
          }
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isSubmitting}
          sx={{ mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

const ProductDesc = (props) => {
  const { InstituteId, Product, AdminTwoId, Chats } = props;
  const spacing = 0.5;
  const [counter, setCounter] = useState(0);
  var decodedUrlImage = "";
  if (Product.productImageUrl !== "") {
    let bufferObj = Buffer.from(Product.productImageUrl, "base64");

    // Decoding base64 into String
    decodedUrlImage = bufferObj.toString("utf8");
  }
  return (
    <Box sx={{ mt: 2 }}>
      {Product && (
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              {/* <CardMedia
                component="img"
                variant="square"
                height="350"
                image={Product.productImageUrl}
                alt="Product Image"
                
              /> */}
              <Image
                src={decodedUrlImage}
                width={300}
                height={300}
                alt="Product Image"
                // fill=""
              />
            </Box>
            <CardContent>
              <Typography align="center" gutterBottom variant="h5">
                {Product.name}
              </Typography>
              <Typography align="center" variant="body1">
                {Product.description}
              </Typography>
              <Typography color="text.secondary" align="center" variant="body1">
                Price: {Product.price}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <ButtonGroup
                size="small"
                aria-label="small outlined button group"
              >
                <Button
                  onClick={() => {
                    setCounter(counter + 1);
                  }}
                >
                  +
                </Button>
                {counter >= 0 && <Button disabled>{counter}</Button>}
                {counter > 0 && (
                  <Button
                    onClick={() => {
                      setCounter(counter - 1);
                    }}
                  >
                    -
                  </Button>
                )}
              </ButtonGroup>
            </CardActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="success"
                onClick={async () => {
                  if (counter === 0) {
                    alert("Quantity must be greater than zero");
                    return;
                  }
                  const result = await apiCall(
                    `${process.env.BASE_URL}/api/adminTwoRequests/createOrder`,
                    "POST",
                    {
                      ProductId: Product._id,
                      Quantity: counter,
                      InstituteId: InstituteId,
                      BuyerId: AdminTwoId,
                      SellerId: Product.sellerDetail._id,
                    },
                    null
                  );
                  alert(result.data.message);
                }}
              >
                Purchase
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Stack>
              <ContactSeller
                InstituteId={InstituteId}
                Product={Product}
                AdminTwoId={AdminTwoId}
              />
              <ChatBox ChatBox={Chats} />
            </Stack>
            <CardContent>
              <Typography gutterBottom variant="h6">
                Seller Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                {Product.sellerDetail.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {Product.sellerDetail.email}
              </Typography>
              <Typography variant="subtitle1">
                {Product.sellerDetail.phone}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

ProductDesc.getLayout = (page) => <AdminTwoDashboard>{page}</AdminTwoDashboard>;

export default ProductDesc;

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
  const productId = context.query.pid;
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
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginUser",
      },
      props: { error: "something happened" },
    };
  }
}
