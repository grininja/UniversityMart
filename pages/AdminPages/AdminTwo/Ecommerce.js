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

function intersection(setA, setB) {
  // const result = new Set();

  for (const elem of setA) {
    if (setB.has(elem)) {
      return true;
    }
  }

  return false;
}

const matchsound = async (name1, name2) => {
  const soundslikename1 = await apiCall(
    `https://api.datamuse.com/words?sl=${name1.toLowerCase()}`,
    "GET",
    {},
    null
  );
  const soundslikename2 = await apiCall(
    `https://api.datamuse.com/words?sl=${name2.toLowerCase()}`,
    "GET",
    {},
    null
  );
  // console.log(meanslikename1)
  const soundslikename1words = [];
  for (var i = 0; i < soundslikename1.data.length; i++) {
    soundslikename1words.push(soundslikename1.data[i].word.toLowerCase());
  }
  const soundslikename2words = [];

  for (var i = 0; i < soundslikename2.length; i++) {
    soundslikename2words.push(soundslikename2.data[i].word.toLowerCase());
  }
  // console.log(soundslikename1words);
  const set1 = new Set(soundslikename1words);
  const set2 = new Set(soundslikename2words);
  if (intersection(set1, set2) === true) {
    return true;
  }
  return false;
};

const matchname = async (name1, name2) => {
  if (name1 === name2) {
    return true;
  }
  if (name1.toLowerCase() === name2.toLowerCase()) {
    return true;
  }
  if (name1.toUpperCase() === name2.toUpperCase()) {
    return true;
  }
  ///check for meaning usine datamuse
  const meanslikename1 = await apiCall(
    `https://api.datamuse.com/words?ml=${name1.toLowerCase()}`,
    "GET",
    {},
    null
  );
  const meanslikename2 = await apiCall(
    `https://api.datamuse.com/words?ml=${name2.toLowerCase()}`,
    "GET",
    {},
    null
  );
  // console.log(meanslikename1)
  const meanslikename1words = [];
  for (var i = 0; i < meanslikename1.data.length; i++) {
    meanslikename1words.push(meanslikename1.data[i].word.toLowerCase());
  }
  const meanslikename2words = [];

  for (var i = 0; i < meanslikename2.length; i++) {
    meanslikename2words.push(meanslikename2.data[i].word.toLowerCase());
  }
  // console.log(meanslikename1words);
  const set1 = new Set(meanslikename1words);
  const set2 = new Set(meanslikename2words);
  if (intersection(set1, set2) === true) {
    return true;
  }
  if (matchsound(name1, name2) === true) {
    return true;
  }
  return false;
};

for (var i in categories) {
  var key = i;
  var val = categories[key];
  for (key in val) {
    categoriesList.push(key);
  }
}
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
        <Button size="small">Price: {product.price}</Button>
        <Button
          size="small"
          href={`/AdminPages/AdminTwo/SellerProductDetail/${product._id}`}
        >
          See Details
        </Button>
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
  const [categoryValue, setCategoryValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [categoryinputValue, setCategoryInputValue] = React.useState("");
  const [filteredItems, setFileteredItems] = React.useState([]);
  AllProducts.sort((a, b) =>
    a.price > b.price ? 1 : b.price > a.price ? -1 : 0
  );
  // console.log(filteredItems)
  return (
    <div>
      <Head>
        <title>Shop | Universitymart</title>
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
            <Card sx={{ p: 2 }}>
              <OutlinedInput
                fullWidth
                placeholder="Search Products"
                value={searchValue}
                onChange={async (event) => {
                  setSearchValue(event.target.value);
                }}
                sx={{ maxWidth: 500 }}
              />
              <Button
                color="error"
                startIcon={
                  <SvgIcon fontSize="small">
                    <MagnifyingGlassIcon />
                  </SvgIcon>
                }
                onClick={async (event) => {
                  const newFilteredItems = [];
                  for (var i = 0; i < AllProducts.length; i++) {
                    var el = AllProducts[i];
                    if (searchValue !== "" && searchValue !== null) {
                      const checknamematch = await matchname(
                        searchValue,
                        el.name
                      );
                      if (categoryValue !== "" && categoryValue !== null) {
                        if (
                          el.category === categoryValue &&
                          checknamematch === true
                        ) {
                          newFilteredItems.push(el);
                        }
                      } else {
                        // console.log(2);
                        if (checknamematch === true) {
                          newFilteredItems.push(el);
                        }
                      }
                    } else {
                      if (categoryValue !== "" && categoryValue !== null) {
                        if (el.category === categoryValue) {
                          newFilteredItems.push(el);
                        }
                      }
                    }
                  }
                  newFilteredItems.sort((a, b) =>
                    a.price > b.price ? 1 : b.price > a.price ? -1 : 0
                  );
                  setFileteredItems(newFilteredItems);
                }}
              >
                Search
              </Button>
            </Card>

            <Grid container spacing={3}>
              {(searchValue === "" || searchValue === null) &&
                (categoryValue === null || categoryValue === "") &&
                AllProducts.map((item) => (
                  <Grid xs={12} md={6} lg={4} key={item._id}>
                    <MediaCard product={item} />
                  </Grid>
                ))}
              {searchValue !== "" &&
                searchValue !== null &&
                filteredItems.map((item) => (
                  <Grid xs={12} md={6} lg={4} key={item._id}>
                    <MediaCard product={item} />
                  </Grid>
                ))}
              {(searchValue === "" || searchValue === null) &&
                categoryValue !== null &&
                categoryValue !== "" &&
                filteredItems.map((item) => (
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
