import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import apiCall from "@/helper/apiCall";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/router";

import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { Layout as WebAdminDashboard } from "../../../layouts/WebAdminDashboard/layout";
var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const roleOptions = [
  {
    label: "Admin1",
    value: "admin1",
  },
  {
    label: "Admin2",
    value: "admin2",
  },
  {
    label: "Admin3",
    value: "admin3",
  },
];

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  role: Yup.string("Enter your role").required("Role is required"),
});

const createAdminFunction = async (
  email,
  instituteId,
  role,
  department,
  router
) => {
  const user = await apiCall(
    "/api/manageUser/createUser",
    "POST",
    {
      emailId: email,
      InstituteId: instituteId,
    },
    null
  );
  const userId = user.data.userId;
  console.log(userId);
  if (role === "admin1") {
    const res = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/createAdminOne`,
      "POST",
      {
        userId: userId,
        instituteId: instituteId,
        departMent: department,
      },
      null
    );
    alert(res.data.message);
    router.reload();
  } else if (role === "admin2") {
    const res = await apiCall(
      `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/createAdminTwo`,
      "POST",
      { userId: userId, instituteId: instituteId },
      null
    );
    alert(res.data.message);
    router.reload();
  } else if (role === "admin3") {
    alert("methods not implemented for admin3");
    router.reload();
  }
};

const CreateAdmin = ({ instituteName, instituteId, departmentList }) => {
  const router = useRouter();
  const [roleValue, setRoleValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [departMentValue, setDepartMentValue] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(roleValue, departMentValue);
    if (roleValue === "" || emailValue === "") {
      alert("Please enter your email address and role");
      return;
    }
    await createAdminFunction(
      emailValue,
      instituteId,
      roleValue,
      departMentValue,
      router
    );
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Create Admin
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={emailValue}
              onChange={(e, value) => {
                setEmailValue(e.target.value);
              }}
            />
            <Autocomplete
              value={roleValue}
              onChange={(e, value) => {
                // console.log(value)
                setRoleValue(value.value);
              }}
              required
              id="role"
              options={roleOptions}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Admin" />}
            />
            <br />
            {roleValue !== "" &&
              roleValue !== null &&
              roleValue !== undefined &&
              roleValue === "admin1" && (
                <Autocomplete
                  value={departMentValue}
                  onChange={(e, value) => {
                    setDepartMentValue(value._id);
                  }}
                  required
                  id="department"
                  options={departmentList}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Department" />
                  )}
                  getOptionLabel={(option) => option.name || ""}
                />
              )}
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Admin
        </Button>
      </Box>
    </Box>
  );
};
CreateAdmin.getLayout = (page) => <WebAdminDashboard>{page}</WebAdminDashboard>;

export default CreateAdmin;

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

    return {
      props: {
        departmentList: departMents.data.message,
        instituteId: findInstutitute.data.message,
        instituteName: session.user.name,
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
