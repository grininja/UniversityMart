import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import apiCall from "@/helper/apiCall";
import { useSession } from "next-auth/react";
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
import { Layout as AdminOneDashBoardLayout } from "../../../layouts/AdminOneDashboard/layout";
import { ItemCard } from "../../../sections/AdminOne/item-card";
import { ItemSearch } from "../../../sections/AdminOne/item-search";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const companies = [
  {
    id: "2569ce0d517a7f06d3ea1f24",
    createdAt: "27/03/2019",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.",
    logo: "/assets/logos/logo-dropbox.png",
    title: "Dropbox",
    downloads: "594",
    quantity: 10,
  },
];

const Page = (props) => {
  const { itemsList, InstituteId, DepartmentId } = props;
  console.log(itemsList);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });

  return (
    <div>
      <Head>
        <title>Items List| UniversityMart </title>
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
                <Typography variant="h4">Department Items</Typography>
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
                </Button> */}
                  {/* <Button
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
                  href="/AdminPages/AdminOne/CreateItem"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <ItemSearch />
            <Grid container spacing={3}>
              {itemsList.map((product) => (
                <Grid xs={12} md={6} lg={4} key={product._id}>
                  <ItemCard item={product} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Pagination count={3} size="small" /> */}
            </Box>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

Page.getLayout = (page) => (
  <AdminOneDashBoardLayout>{page}</AdminOneDashBoardLayout>
);

export default Page;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // console.log(session);
  try {
    const getAdminOne = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
      "GET",
      {},
      null
    );
    const allItems = await apiCall(
      `${process.env.BASE_URL}/api/adminOneRequests/productHandler/getAllItems?departmentId=${getAdminOne.data.message.department}`
    );
    // console.log(allItems.data.items);
    return {
      props: {
        itemsList: allItems.data.items,
        InstituteId: getAdminOne.data.message.Institute,
        DepartmentId: getAdminOne.data.message.department,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
