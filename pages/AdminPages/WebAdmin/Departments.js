import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import apiCall from "@/helper/apiCall";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as WebAdminDashboard } from "../../../layouts/WebAdminDashboard/layout";
import DepartmentCard from "../../../sections/WebAdmin/department-card";
import { CompaniesSearch } from "../../../sections/WebAdmin/department-search";

const Page = ({ departments, instituteName, institueId }) => {
  return (
    <div>
      <Head>
        <title>Departments | Devias Kit</title>
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
                <Typography variant="h4">Companies</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  href="/AdminPages/WebAdmin/AddDepartment"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <CompaniesSearch />
            <Grid container spacing={3}>
              {departments.map((department) => (
                <Grid xs={12} md={6} lg={4} key={department._id}>
                  <DepartmentCard
                    department={department}
                    instituteName={instituteName}
                    instituteId={institueId}
                  />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            ></Box>
          </Stack>
        </Container>
      </Box>
    </div>
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
  try {
    const findInstutitute = await apiCall(
      `${process.env.BASE_URL}/api/institute/getInstituteByName?name=${session.user.name}`,
      "GET",
      {},
      null
    );
    if (
      findInstutitute.data.message === null &&
      findInstutitute.data.message === undefined &&
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
    // const allAdminsDetails = await apiCall(
    //   `${process.env.BASE_URL}/api/institute/adminHandler/getAllAdminOneWithDetail`,
    //   "GET",
    //   {},
    //   null
    // );

    return {
      props: {
        departments: departMents.data.message,
        institueId: findInstutitute.data.message,
        instituteName: session.user.name,
        // adminOneDetails: allAdminsDetails["data"]["adminOneDetails"],
        // adminTwoDetails: allAdminsDetails["data"]["adminTwoDetails"],
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
