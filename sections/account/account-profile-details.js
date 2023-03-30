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
} from "@mui/material";
import apiCall from "@/helper/apiCall";
import { useRouter } from "next/router";

export const AccountProfileDetails = ({ InstituteDetail }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: InstituteDetail.name,
    email: InstituteDetail.email,
    phone: InstituteDetail.phone,
    address: InstituteDetail.address,
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await apiCall(
      `${process.env.BASE_URL}/api/institute/updateInstituteDetails`,
      "POST",
      {
        InstituteId: InstituteDetail._id,
        Name: values.name,
        Address: values.address,
        Phone: values.phone,
      },
      null
    );
    alert(response.data.message);
    router.reload();
  };

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
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  disabled
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
                  type="string"
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            {" "}
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
