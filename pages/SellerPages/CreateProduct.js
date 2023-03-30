import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import categories from "@/helper/category.json";
import React from "react";
import { UploadFile } from "@/helper/uploadFile";
import { Input } from "@mui/material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Container,
  Stack,
  Typography,
  Avatar,
  Switch,
  Autocomplete,
} from "@mui/material";

import Head from "next/head";
import { useRouter } from "next/router";
import { Layout as SellerDashboardLayout } from "../../layouts/SellerDashboard/layout";
import { useSession } from "next-auth/react";

const categoriesList = [];

for (var i in categories) {
  var key = i;
  var val = categories[key];
  for (key in val) {
    categoriesList.push(key);
  }
}

const CreateItem = ({ SellerId, DownLoadUrl }) => {
  const router = useRouter();
  const [categoryValue, setCategoryValue] = React.useState("");
  const [categoryinputValue, setCategoryInputValue] = React.useState("");
  const [file, setFile] = useState(null);
  const encodedUrl=btoa(DownLoadUrl);
  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
      price: 0,
      description: "",
      // category: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Product name is required"),
      photo: Yup.string().url(),
      price: Yup.number().integer().required("Quantity is required"),
      description: Yup.string().required("Product description is required"),
      // category: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (categoryValue === "") {
          alert("Please select a category");
          return;
        }
        const res = await apiCall(
          `${process.env.BASE_URL}/api/seller/products/createProduct`,
          "POST",
          {
            name: values.name,
            description: values.description,
            category: categoryValue.label,
            productImageUrl:encodedUrl,
            pricePerItem: values.price,
            sellerId: SellerId,
            visible: checked,
          },
          null
        );
        alert(res.data.message);
        router.reload();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  const [checked, setChecked] = useState(true);
  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="" title="Enter product details  " />

        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  error={!!(formik.touched.name && formik.errors.name)}
                  label="Item Name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Item Price"
                  name="price"
                  onChange={formik.handleChange}
                  required
                  value={formik.values.price}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.price && formik.errors.price}
                  error={!!(formik.touched.price && formik.errors.price)}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Item Description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.description}
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  error={
                    !!(formik.touched.description && formik.errors.description)
                  }
                />
              </Grid>
              <Grid xs={12} md={6}>
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
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Stack spacing={2}>
            <Typography color="text.primary" variant="body2">
              List now
            </Typography>
          </Stack>
          <Switch
            checked={checked}
            onChange={(event) => {
              setChecked(event.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save Item
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

const Page = (props) => {
  const { sellerId } = props;
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginSeller");
    },
  });
  const [downloadUrl, setDownloadUrl] = useState("");
  const [file, setFile] = useState(null);
  return (
    <div>
      <Head>
        <title>Create Item | UniversityMart</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Create Item</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  <div>
                    <Card>
                      <CardContent>
                        <Box
                          sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Button component="label">
                            <Avatar
                              //   src={user.avatar}
                              sx={{
                                height: 80,
                                mb: 2,
                                width: 80,
                              }}
                            />
                            <input
                              type="file"
                              hidden
                              onChange={(e) => setFile(e.target.files[0])}
                              id="select-image"
                            />
                          </Button>
                          {file && file.name !== null && (
                            <Typography>{file.name}</Typography>
                          )}
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions>
                        <Button
                          fullWidth
                          variant="text"
                          type="submit"
                          onClick={async () => {
                            const downloadUri = await UploadFile(
                              file,
                              "Seller",
                              "productImage"
                            );
                            alert("Image Upload Success");
                            setDownloadUrl(downloadUri);
                            // console.log(downloadUrl)
                            // const res=await apiCall('https://api.imgbb.com/1/upload?key=f9e9cec480aeb08bc3c6836d35c810f0')
                          }}
                        >
                          Upload picture
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <CreateItem SellerId={sellerId} DownLoadUrl={downloadUrl} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </div>
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
    // console.log(getSeller)
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

    return {
      props: {
        sellerId: getSeller.data.message._id,
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
