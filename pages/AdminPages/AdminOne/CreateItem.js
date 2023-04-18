import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
import * as Yup from "yup";
import { useFormik } from "formik";
import categories from "@/helper/category.json";

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
  Autocomplete,
} from "@mui/material";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout as AdminOneDashBoardLayout } from "../../../layouts/AdminOneDashboard/layout";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { UploadFile } from "@/helper/uploadFile";

const categoriesList = [];

for (var i in categories) {
  var key = i;
  var val = categories[key];
  for (key in val) {
    categoriesList.push(key);
  }
}

const CreateItem = ({ adminOneId, InstituteId, imageUrl = "" }) => {
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryinputValue, setCategoryInputValue] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
      quantity: 0,
      description: "",
      serialNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Product name is required"),
      photo: Yup.string().url(),
      quantity: Yup.number().integer().required("Quantity is required"),
      description: Yup.string()
        .max(255)
        .required("Product description is required"),
      serialNumber: Yup.string()
        .max(255)
        .required("Product serial number is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (categoryValue === "") {
          alert("Please select a category");
          return;
        }
        console.log(values);
        // console.log(categoryValue)
        const res = await apiCall(
          `${process.env.BASE_URL}/api/adminOneRequests/productHandler/addItem`,
          "POST",
          {
            name: values.name,
            description: values.description,
            photoUrl: imageUrl,
            quantity: values.quantity,
            category: categoryValue,
            adminOneId: adminOneId,
            InstituteId: InstituteId,
            serialId: values.serialNumber,
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

  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="" title="Enter product detailss  " />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Item Serial Number"
                  name="serialNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.serialNumber}
                  helperText={
                    formik.touched.serialNumber && formik.errors.serialNumber
                  }
                  error={
                    !!(
                      formik.touched.serialNumber && formik.errors.serialNumber
                    )
                  }
                />
              </Grid>
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
                  label="Item Quantity"
                  name="quantity"
                  onChange={formik.handleChange}
                  required
                  value={formik.values.quantity}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.quantity && formik.errors.quantity}
                  error={!!(formik.touched.quantity && formik.errors.quantity)}
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
                {/* <TextField
                  fullWidth
                  label="Item Category"
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  value={formik.values.category}
                  helperText={formik.touched.category && formik.errors.category}
                  error={!!(formik.touched.category && formik.errors.category)}
                /> */}

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
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });
  const { InstituteId, DepartmentId, AdminOneId } = props;
  const router = useRouter();
  const [downloadUrl, setDownloadUrl] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
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
                            <Image
                              src={imageUrl}
                              alt="click here"
                              height={80}
                              width={80}
                              mb={2}
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
                              "Institute",
                              "itemImage"
                            );
                            alert("Image Upload Success");
                            let bufferObj = Buffer.from(downloadUri, "utf8");
                            let base64String = bufferObj.toString("base64");
                            setDownloadUrl(base64String);
                            setImageUrl(downloadUri);
                          }}
                        >
                          Upload picture
                        </Button>
                      </CardActions>
                    </Card>
                  </div>
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <CreateItem
                    adminOneId={AdminOneId}
                    InstituteId={InstituteId}
                    imageUrl={downloadUrl}
                  />
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
  <AdminOneDashBoardLayout>{page}</AdminOneDashBoardLayout>
);

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
    const getAdminOne = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?EmailId=${session.user.email}`,
      "GET",
      {},
      null
    );
    if (
      getAdminOne.data.message === null ||
      getAdminOne.data.message === undefined ||
      getAdminOne.data.message === ""
    ) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/loginUser",
        },
        props: {},
      };
    }

    return {
      props: {
        InstituteId: getAdminOne.data.message.Institute,
        DepartmentId: getAdminOne.data.message.department,
        AdminOneId: getAdminOne.data.message._id,
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
