import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import apiCall from "@/helper/apiCall";
import { useCallback, useState } from "react";
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
} from "@mui/material";

import Head from "next/head";

import { Layout as AdminOneDashBoardLayout } from "../../../layouts/AdminOneDashboard/layout";
import { useSession } from "next-auth/react";

const UploadPicture = () => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          //   src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80,
          }}
        />
        <Typography gutterBottom variant="h5">
          {/* {user.name} */}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {/* {user.city} {user.country} */}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {/* {user.timezone} */}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions>
  </Card>
);

const CreateItem = () => {
  const [values, setValues] = useState({
    name,
    description,
    photoUrl,
    quantity,
    category,
    adminOneId,
    InstituteId,
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
};

const Page = (props) => {
    // console.log(props);
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/loginUser");
    },
  });
  //   console.log(status);
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
              <Typography variant="h4">Account</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4}>
                  {/* <UploadPicture /> */}
                </Grid>
                <Grid xs={12} md={6} lg={8}>
                  {/* <CreateItem /> */}
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
//   console.log(session);
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
        Institute: getAdminOne.data.message.Institute,
        Department: getAdminOne.data.message.department,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}
