import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
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
import apiCall from "@/helper/apiCall";
import { useSession } from "next-auth/react";
import { Layout as AdminTwoDashboard } from "../../../../layouts/AdminTwoDashboard/layout";
import { AllOrderTable } from "../../../../sections/AdminTwo/allMergedOrders";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import moment from "moment";
const Page = (props) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });

  const {
    InstituteId,
    // AllOrders,
    AdminTwoId,
    AdminTwoEmail,
    AllAcceptedOrders,
    AllDates,
  } = props;

  const [page, setPage] = useState(0);
  //   console.log(AllAcceptedOrders);
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
                <Typography variant="h4">Merged Accepted Orders </Typography>
              </Stack>
            </Stack>
            <div>
              {/* <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                      />
                    </svg>
                  </SvgIcon>
                }
                variant="contained"
              >
                Merge Orders
              </Button> */}
            </div>
            <Stack justifyContent="space-between" direction="row">
              <Card sx={{ p: 2 }}>
                <OutlinedInput
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
                />
              </Card>
              <Stack justifyContent="center">
                {/* <Typography>Show pending only</Typography>
                <Switch
                  checked={checked}
                  onChange={(event) => {
                    setChecked(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                /> */}
              </Stack>
            </Stack>
            {AllDates > 0 && (
              <AllOrderTable
                count={AllDates}
                items={AllAcceptedOrders}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                instituteId={InstituteId}
                adminTwoId={AdminTwoId}
                // onlyPending={checked}
                CustomerEmail={AdminTwoEmail}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AdminTwoDashboard>{page}</AdminTwoDashboard>;

export default Page;

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
    //   console.log(getAdminTwo.data.message._id);
    const InstituteId = getAdminTwo.data.message.Institute;
    const allOrderPlaced = await apiCall(
      `${process.env.BASE_URL}/api/adminTwoRequests/getAllOrderPlaced?AdminTwoId=${getAdminTwo.data.message._id}`,
      "GET",
      {},
      null
    );
    // const allAcceptedOrders = [];
    var dateWiseGroup = {};
    var countDates = 0;
    for (var i = 0; i < allOrderPlaced.data.message.length; i++) {
      const el = allOrderPlaced.data.message[i];
      if (el.OrderStatus === "accepted") {
        const SellerId = allOrderPlaced.data.message[i].sellerId;
        var formatted_date = moment(el.orderDate).format("YYYY-MM-DD");
        if (formatted_date in dateWiseGroup) {
          if (SellerId in dateWiseGroup[formatted_date]) {
            dateWiseGroup[formatted_date][SellerId].push(el);
          } else {
            dateWiseGroup[formatted_date][SellerId] = [];
          }
        } else {
          dateWiseGroup[formatted_date] = {};
          countDates += 1;
          dateWiseGroup[formatted_date][SellerId] = [];
          dateWiseGroup[formatted_date][SellerId].push(el);
        }
      }
    }

    return {
      props: {
        InstituteId: InstituteId,
        // AllOrders: allOrderPlaced.data.message,
        AdminTwoId: getAdminTwo.data.message._id,
        AdminTwoEmail: session.user.email,
        AllAcceptedOrders: dateWiseGroup,
        AllDates: countDates,
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
