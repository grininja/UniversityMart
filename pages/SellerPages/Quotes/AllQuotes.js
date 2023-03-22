import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as SellerDashboardLayout } from "../../../layouts/SellerDashboard/layout";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";

const Page = (props) => {
  const { sellerId, nonRespondedQuotes } = props;
  console.log(nonRespondedQuotes);
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
                  <ListItem alignItems="flex-start" key={item._id}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${item.question.request}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Buyer: {item.buyerDetail.name}
                          </Typography>
                          <br></br>
                          {`Quantity: ${item.question.quantity}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
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
