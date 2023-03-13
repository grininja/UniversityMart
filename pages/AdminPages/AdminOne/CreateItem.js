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

import Head from "next/head";
import { useRouter } from "next/router";
import { Layout as AdminOneDashBoardLayout } from "../../../layouts/AdminOneDashboard/layout";
import { useSession } from "next-auth/react";
import { useState } from "react";
const categoriesList = [];

for (var i in categories) {
  var key = i;
  var val = categories[key];
  for (key in val) {
    categoriesList.push(key);
  }
}

//under consturuction image upload

// const UploadPicture = () => {
//   const [filepath, setfilepath] = useState("");
//   return (
//     <div>
//       <Card>
//         <CardContent>
//           <Box
//             sx={{
//               alignItems: "center",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Avatar
//               //   src={user.avatar}
//               sx={{
//                 height: 80,
//                 mb: 2,
//                 width: 80,
//               }}
//             />
//             <Typography gutterBottom variant="h5">
//               {/* {user.name} */}
//               <input
//                 type="file"
//                 name="file"
//                 onChange={(event) => {
//                   setfilepath(event.target.files[0]);
//                   // console.log(event.target.files[0]);
//                   const imageUrl=URL.createObjectURL(event.target.files[0])
//                   console.log(imageUrl);
//                 }}
//               />
//             </Typography>
//             <Typography color="text.secondary" variant="body2">
//               {/* {user.city} {user.country} */}
//             </Typography>
//             <Typography color="text.secondary" variant="body2">
//               {/* {user.timezone} */}
//             </Typography>
//           </Box>
//         </CardContent>
//         <Divider />
//         <CardActions>
//           <Button fullWidth variant="text" type="submit" onClick={async ()=>{
//             // const res=await apiCall('https://api.imgbb.com/1/upload?key=f9e9cec480aeb08bc3c6836d35c810f0')

//           }}>
//             Upload picture
//           </Button>
//         </CardActions>
//       </Card>
//     </div>
//   );
// };

const CreateItem = ({ adminOneId, InstituteId }) => {
  // console.log(adminOneId+" "+InstituteId);
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryinputValue, setCategoryInputValue] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      photo: "",
      quantity: 0,
      description: "",
      // category: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Product name is required"),
      photo: Yup.string().url(),
      quantity: Yup.number().integer().required("Quantity is required"),
      description: Yup.string()
        .max(255)
        .required("Product description is required"),
      // category: Yup.string().max(255),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (categoryValue === "") {
          alert("Please select a category");
          return;
        }
        const res = await apiCall(
          `${process.env.BASE_URL}/api/adminOneRequests/productHandler/addItem`,
          "POST",
          {
            name: values.name,
            description: values.description,
            photoUrl: values.photo,
            quantity: values.quantity,
            category: categoryValue,
            adminOneId: adminOneId,
            InstituteId: InstituteId,
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
  const { InstituteId, DepartmentId, AdminOneId } = props;
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });

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
                  {/* <UploadPicture /> */}
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  <CreateItem
                    adminOneId={AdminOneId}
                    InstituteId={InstituteId}
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

  try {
    const getAdminOne = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/adminOneByEmail?=${session.user.email}`,
      "GET",
      {},
      null
    );

    return {
      props: {
        InstituteId: getAdminOne.data.message.Institute,
        DepartmentId: getAdminOne.data.message.department,
        AdminOneId: getAdminOne.data.message._id,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
