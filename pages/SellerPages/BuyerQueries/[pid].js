import * as React from "react";
import { Layout as SellerDashboardLayout } from "../../../layouts/SellerDashboard/layout";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
import Stack from "@mui/material/Stack";
import SnackbarContent from "@mui/material/SnackbarContent";



const Page = (props) => {
  const { SellerId, Queries } = props;
  console.log(Queries);
  return (
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
      {Queries.map((query) => {
        return (
          <SnackbarContent
            message={`${query.question.request} \
            ${query.response}`}
            key={query._id}
          />
        );
      })}
    </Stack>
  );
};

Page.getLayout = (page) => (
  <SellerDashboardLayout>{page}</SellerDashboardLayout>
);

export default Page;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

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
    const orderId = context.query.pid;
    const getSeller = await apiCall(
      `${process.env.BASE_URL}/api/seller/getSellerWithEmail?EmailId=${session.user.email}`,
      "GET",
      {},
      null
    );
    if (
      getSeller.data.message === null ||
      getSeller.data.message === undefined ||
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
    const getAllQueries = await apiCall(
      `${process.env.BASE_URL}/api/seller/Buyerquery/getQueryWithOrder?OrderId=${orderId}`,
      "GET",
      {},
      null
    );

    return {
      props: {
        SellerId: getSeller.data.message._id,
        Queries: getAllQueries.data.message,
      },
    };
  } catch (e) {
    // console.log(e);
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
