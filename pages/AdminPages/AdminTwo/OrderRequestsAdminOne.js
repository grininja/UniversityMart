import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
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
import { useSelection } from "../../../hooks/use-selection";
import apiCall from "@/helper/apiCall";
import { useSession } from "next-auth/react";
import { Layout as AdminTwoDashboard } from "../../../layouts/AdminTwoDashboard/layout";
import { OrderRequestsTable } from "../../../sections/AdminTwo/orderrequest-table";
// import { OrderRequestsSearch } from "../../../sections/AdminTwo/orderrequest-search";
import { applyPagination } from "../../../utils/apply-pagination";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

const OrderRequestsSearch = () => (
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
);

const now = new Date();

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = (props) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });
  const { InstituteId, OrderRequests, AdminTwoId } = props;
  //   console.log(OrderRequests);
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
        <title>OrderRequests | UniversityMart</title>
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
                <Typography variant="h4">Order Requests </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Merge pending Orders
                </Button>
              </div>
            </Stack>
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
            {OrderRequests && OrderRequests.length > 0 && (
              <OrderRequestsTable
                count={OrderRequests.length}
                items={OrderRequests}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                instituteId={InstituteId}
                adminTwoId={AdminTwoId}
                key={OrderRequests._id}
                onlyPending={checked}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AdminTwoDashboard>{page}</AdminTwoDashboard>;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  //   console.log(session);
  try {
    const getAdminTwo = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/adminTwoByEmail?AdminTwoEmail=${session.user.email}`,
      "GET",
      {},
      null
    );
    const InstituteId = getAdminTwo.data.message.Institute;
    const allOrderRequest = await apiCall(
      `${process.env.BASE_URL}/api/adminTwoRequests/getAllOrderRequests?InstituteID=${InstituteId}&AdminTwoId=${getAdminTwo.data.message._id}`,
      "GET",
      {},
      null
    );

    return {
      props: {
        InstituteId: InstituteId,
        OrderRequests: allOrderRequest.data.message,
        AdminTwoId: getAdminTwo.data.message._id,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}

export default Page;
