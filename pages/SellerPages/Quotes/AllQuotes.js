import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as SellerDashboardLayout } from "../../../layouts/SellerDashboard/layout";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";

const AnsWerQueryComponent = ({ ChatSessionId, SellerId }) => {
  const formik = useFormik({
    initialValues: {
      response: "",
    },
    validationSchema: Yup.object({
      response: Yup.string().max(255).required("Seller Response is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const result = await apiCall(
          `${process.env.BASE_URL}/api/chatApi/sellerRespond`,
          "POST",
          {
            chatSessionId: ChatSessionId,
            SellerId: SellerId,
            SellerResponse: values.response,
          },
          null
        );
        alert(result.data.message);
        router.reload();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Box sx={{ m: 2 }}>
        <TextField
          // fullWidth
          label="Response"
          name="response"
          helperText={formik.touched.response && formik.errors.response}
          error={!!(formik.touched.response && formik.errors.response)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          value={formik.values.response}
        />
      </Box>
      <Button size="small" type="submit">
        Submit Response
      </Button>
    </form>
  );
};

const Page = (props) => {
  const formik = useFormik({
    initialValues: {
      response: "",
    },
    validationSchema: Yup.object({
      response: Yup.string().max(255).required("Seller Response is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
        router.reload();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const { sellerId, nonRespondedQuotes } = props;
  return (
    <Box
      sx={{
        backgroundColor: "primary",
      }}
    >
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {nonRespondedQuotes &&
              nonRespondedQuotes.length > 0 &&
              nonRespondedQuotes.map((item) => {
                return (
                  <Box key={item._id} sx={{ m: 2 }}>
                    <Card sx={{ maxWidth: 345 }} key={item._id}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.buyerDetail.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.question.request}
                        </Typography>
                      </CardContent>
                      <AnsWerQueryComponent
                        ChatSessionId={item._id}
                        SellerId={item.seller}
                      />
                      <CardActions>
                        <Box sx={{ m: -1 }}>
                          <Button
                            size="small"
                            href={`/SellerPages/ShowProduct/${item.item}`}
                          >
                            Show Product Requested
                          </Button>
                        </Box>
                      </CardActions>
                    </Card>
                    <Divider sx={{ borderColor: "neutral.700" }} />
                  </Box>
                );
              })}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

Page.getLayout = (page) => (
  <SellerDashboardLayout>{page}</SellerDashboardLayout>
);

export default Page;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
    const getNotRespondedQuotes = await apiCall(
      `${process.env.BASE_URL}/api/chatApi/getNotRespondedChats?SellerId=${getSeller.data.message._id}`
    );

    return {
      props: {
        sellerId: getSeller.data.message._id,
        nonRespondedQuotes: getNotRespondedQuotes.data.message,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
