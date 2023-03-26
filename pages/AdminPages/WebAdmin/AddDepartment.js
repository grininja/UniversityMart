import { useCallback, useState } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiCall from "@/helper/apiCall";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as WebAdminDashboard } from "../../../layouts/WebAdminDashboard/layout";

const Page = ({ institueId }) => {
  const router = useRouter();
  const [method, setMethod] = useState("email");
  const formik = useFormik({
    initialValues: {
      departmentName: "CSE",
      submit: null,
    },
    validationSchema: Yup.object({
      departmentName: Yup.string()
        .max(255)
        .required("Department Name is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // console.log(values);
        const CreateDepartment = await apiCall(
          `${process.env.BASE_URL}/api/institute/departmentHandler/createDepartment`,
          "POST",
          {
            name: values.departmentName,
            instituteId: institueId,
          },
          null
        );
        alert(CreateDepartment.data.message);
        router.reload();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    // auth.skip();
    router.push("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>CreateDepartment | UniversityMart</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}></Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              {/* <Tab label="Email" value="email" /> */}
            </Tabs>
            {method === "email" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={
                      !!(
                        formik.touched.departmentName &&
                        formik.errors.departmentName
                      )
                    }
                    fullWidth
                    helperText={
                      formik.touched.departmentName &&
                      formik.errors.departmentName
                    }
                    label="Department Name"
                    name="departmentName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.email}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Create Department
                </Button>
                <Alert color="primary" severity="info" sx={{ mt: 3 }}>
                  <div>
                    Enter <b>Department details </b>
                  </div>
                </Alert>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
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
    return {
      props: {
        institueId: findInstutitute.data.message,
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
