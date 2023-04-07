import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
// import { subDays, subHours } from "date-fns";
// import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
// import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Card,
  InputAdornment,
  OutlinedInput,
  Switch,
} from "@mui/material";
import { useSelection } from "../../hooks/use-selection";
import apiCall from "@/helper/apiCall";
import { useSession } from "next-auth/react";
import { Layout as SellerDashboardLayout } from "../../layouts/SellerDashboard/layout";
import { AllOrderTable } from "../../sections/Seller/orderrequest-table";
import { applyPagination } from "../../utils/apply-pagination";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

const Page = (props) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });
  const { SellerId, AllOrders, sellerDetails,isSellerVerified } = props;
  // alert(isSellerVerified)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [checked, setChecked] = useState(false);
  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>AllOrders | UniversityMart</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Order Placed </Typography>
              </Stack>
            </Stack>
            <Stack justifyContent="space-between" direction="row">
              <Card sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={async () => {
                    const res = await apiCall(
                      `${process.env.BASE_URL}/api/payments/createAccount`,
                      "POST",
                      {
                        sellerEmail: sellerDetails.email,
                        sellerId: sellerDetails._id,
                        sellerName: sellerDetails.name,
                      },
                      null
                    );
                    alert(res.data.message);
                    if (res.data.url !== "") {
                      router.redirect(res.data.url);
                    }
                  }}
                >
                  Register on payment gateway
                </Button>
                {/* <OutlinedInput
                  defaultValue=""
                  fullWidth
                  placeholder="Search Order Requests"
                  startAdornment={
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <MagnifyingGlassIcon />
                        
                      
                      </SvgIcon>
                    </InputAdornment>
                  }
                  sx={{ maxWidth: 500 }}
                /> */}
              </Card>
              <Stack justifyContent="center">
                <Typography>Show pending only</Typography>
                <Switch
                  checked={checked}
                  onChange={(event) => {
                    setChecked(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Stack>
            </Stack>
            {AllOrders && AllOrders.length > 0 && (
              <AllOrderTable
                count={AllOrders.length}
                items={AllOrders}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                sellerId={SellerId}
                key={AllOrders[0]._id}
                onlyPending={checked}
                sellerVerified={isSellerVerified}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
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

    const getAllOrders = await apiCall(
      `${process.env.BASE_URL}/api/seller/orders/getAllOrders?SellerId=${getSeller.data.message._id}`
    );

    var isVerifiedSeller = false;
    if (getSeller.data.message.stripeId !== "") {
      const sellerStatus = await apiCall(
        `${process.env.BASE_URL}/api/payments/checkIfPaymentEnable?accountID=${getSeller.data.message.stripeId}`,
        "GET",
        {},
        null
      );
      if(sellerStatus.data.message===true){
        isVerifiedSeller=true;
      }
    }
    return {
      props: {
        SellerId: getSeller.data.message._id,
        AllOrders: getAllOrders.data.message,
        sellerDetails: getSeller.data.message,
        isSellerVerified:isVerifiedSeller
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
