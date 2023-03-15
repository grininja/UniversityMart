import React, { useState } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import categories from "@/helper/category.json";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Card,
  InputAdornment,
  OutlinedInput,
  Autocomplete,
  TextField,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import { Layout as AdminTwoDashboard } from "../../../layouts/AdminTwoDashboard/layout";
const categoriesList = [];

for (var i in categories) {
  var key = i;
  var val = categories[key];
  for (key in val) {
    categoriesList.push(key);
  }
}
// import { CompanyCard } from "../sections/companies/company-card";

function MediaCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 50 }}
        image={product.productImageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

const ProductSearch = () => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search Products"
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

const Page = (props) => {
  const { InstituteId, AllProducts, AdminTwoId } = props;
  console.log(AllProducts);
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryinputValue, setCategoryInputValue] = React.useState("");
  return (
    <div>
      <Head>
        <title>Shop | Devias Kit</title>
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
                <Typography variant="h4">Search Products</Typography>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
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
                  </Button>
                </Stack> */}
              </Stack>

              <div>
                <Autocomplete
                  value={categoryValue}
                  onChange={(event, newValue) => {
                    setCategoryValue(newValue);
                  }}
                  label="Item Category"
                  name="category"
                  options={categoriesList}
                  sx={{ width: 300 }}
                  inputValue={categoryinputValue}
                  onInputChange={(event, newInputValue) => {
                    setCategoryInputValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
              </div>
            </Stack>
            <ProductSearch />

            <Grid container spacing={3}>
              {AllProducts.map((item) => (
                <Grid xs={12} md={6} lg={4} key={item._id}>
                  <MediaCard product={item} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

Page.getLayout = (page) => <AdminTwoDashboard>{page}</AdminTwoDashboard>;

export default Page;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // console.log(session);

  try {
    const getAdminTwo = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/adminTwoByEmail?AdminTwoEmail=${session.user.email}`,
      "GET",
      {},
      null
    );
    console.log(getAdminTwo.data.message._id);
    const InstituteId = getAdminTwo.data.message.Institute;
    const allSellerProducts = await apiCall(
      `${process.env.BASE_URL}/api/adminTwoRequests/getAllProducts?InstituteId=${InstituteId}&AdminTwoId=${getAdminTwo.data.message._id}`,
      "GET",
      {},
      null
    );

    return {
      props: {
        InstituteId: InstituteId,
        AllProducts: allSellerProducts.data.message,
        AdminTwoId: getAdminTwo.data.message._id,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
