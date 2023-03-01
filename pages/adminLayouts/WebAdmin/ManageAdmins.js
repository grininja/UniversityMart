import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Unstable_Grid2";
import CreateAdminForm from "./createAdminForm";
import apiCall from "@/helper/apiCall";
import { authOptions } from "../../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
const ManageAdminDashboard = ({ institueId, departments, instituteName }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/authentication/loginInstitute");
    },
  });

  return (
    <Box>
      <NavBar />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={5}>
          {
            <CreateAdminForm
              instituteName={instituteName}
              instituteId={institueId}
              departmentList={departments}
            />
          }
        </Grid>
        <Grid xs={7}>{/* {session &&  />} */}</Grid>
      </Grid>
    </Box>
  );
};
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  try {
    const findInstutitute = await apiCall(
      `${process.env.BASE_URL}/api/institute/getInstituteByName?name=${session.user.name}`,
      "GET",
      {},
      null
    );
    const departMents = await apiCall(
      `${process.env.BASE_URL}/api/institute/departmentHandler/getAllDepartments?InstituteId=${findInstutitute.data.message}`,
      "GET",
      {},
      null
    );

    return {
      props: {
        departments: departMents.data.message,
        institueId: findInstutitute.data.message,
        instituteName: session.user.name,
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { error: "something happened" } };
  }
}

export default ManageAdminDashboard;
