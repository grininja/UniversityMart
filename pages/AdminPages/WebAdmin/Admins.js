import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useSelection } from "../../../hooks/use-selection";
import { Layout as WebAdminDashboard } from "../../../layouts/WebAdminDashboard/layout";
import { AdminTable } from "../../../sections/WebAdmin/admin-table";
import { AdminSearch } from "../../../sections/WebAdmin/admin-search";
import { applyPagination } from "../../../utils/apply-pagination";

const now = new Date();

let data = [];

const useAdmins = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (admins) => {
  return useMemo(() => {
    return admins.map((customer) => customer.id);
  }, [admins]);
};

const Page = ({
  departments,
  institueId,
  instituteName,
  adminOneDetails,
  adminTwoDetails,
}) => {
  const router = useRouter();
  data = adminOneDetails.concat(adminTwoDetails);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const admins = useAdmins(page, rowsPerPage);
  const AdminsIds = useCustomerIds(admins);
  const AdminsSelection = useSelection(AdminsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Admins | UniversityMart</title>
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
                <Typography variant="h4">Admins</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  {/* <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button> */}
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  href="/AdminPages/WebAdmin/CreateAdmin"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <AdminSearch /> */}
            <AdminTable
              count={data.length}
              items={admins}
              onDeselectAll={AdminsSelection.handleDeselectAll}
              onDeselectOne={AdminsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={AdminsSelection.handleSelectAll}
              onSelectOne={AdminsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={AdminsSelection.selected}
              instituteId={institueId}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <WebAdminDashboard>{page}</WebAdminDashboard>;

export default Page;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginInstitute",
      },
      props: {},
    };
  }
  // console.log(session);
  try {
    const findInstutitute = await apiCall(
      `${process.env.BASE_URL}/api/institute/getInstituteByName?name=${session.user.name}`,
      "GET",
      {},
      null
    );
    if (
      findInstutitute.data.message === null ||
      findInstutitute.data.message === undefined ||
      findInstutitute.data.message === ""
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/loginInstitute",
        },
        props: {},
      };
    }
    const departMents = await apiCall(
      `${process.env.BASE_URL}/api/institute/departmentHandler/getAllDepartments?InstituteId=${findInstutitute.data.message}`,
      "GET",
      {},
      null
    );
    const allAdminsDetails = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/getAllAdminOneWithDetail?InstituteId=${findInstutitute.data.message}`,
      "GET",
      {},
      null
    );

    return {
      props: {
        departments: departMents.data.message,
        institueId: findInstutitute.data.message,
        instituteName: session.user.name,
        adminOneDetails: allAdminsDetails["data"]["adminOneDetails"],
        adminTwoDetails: allAdminsDetails["data"]["adminTwoDetails"],
      },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/auth/loginInstitute",
      },
      props: { error: "something happened" },
    };
  }
}
