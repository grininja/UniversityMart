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
import { Layout as AdminTwoDashboard } from "../../../../../layouts/AdminTwoDashboard/layout";
import { AllOrderTable } from "../../../../../sections/AdminTwo/mergedOrderTable";
import { authOptions } from "../../../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

const Page = (props) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });
  //   const { InstituteId, ordersList, AdminTwoId } = props;
  const { ordersList } = props;
  //   console.log(ordersList);
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
        <title>ordersList | UniversityMart</title>
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
                <Typography variant="h4">Order Details </Typography>
              </Stack>
            </Stack>
            <div>
            </div>
            <Stack justifyContent="space-between" direction="row">
              <Card sx={{ p: 2 }}>
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
              {/* <Stack justifyContent="center">
                <Typography>Show pending only</Typography>
                <Switch
                  checked={checked}
                  onChange={(event) => {
                    setChecked(event.target.checked);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Stack> */}
            </Stack>
            {ordersList && ordersList.length > 0 && (
              <AllOrderTable
                count={ordersList.length}
                items={ordersList}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
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
  //   console.log(session);
  //   console.log(context.query)
  const sellerId = context.query.pid[0];
  const dateValue = context.query.pid[1];
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
    const getOrderByDateAndSeller = await apiCall(
      `${process.env.BASE_URL}/api/adminTwoRequests/getOrderByDateSeller?SellerId=${sellerId}&CustomerId=${getAdminTwo.data.message._id}&dateValue=${dateValue}`
    );
    return {
      props: {
         ordersList:getOrderByDateAndSeller.data.message
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
