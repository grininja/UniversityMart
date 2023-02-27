import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Unstable_Grid2";
import CreateDepartment from "./CreateDepartmentForm";
import DepartmentItem from "./DepartmentItem";
const WebAdminDashboard = () => {
  const [session, setSession] = useState();
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/authentication/loginInstitute");
    },
  });
  useEffect(() => {
    (async () => {
      const session = await getSession();
      setSession(session);
    })();
  }, []);

  return (
    <Box>
      <NavBar />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={5}>
          {session && <CreateDepartment instituteName={session.user.name} />}
        </Grid>
        <Grid xs={7}>
          {session && <DepartmentItem instituteName={session.user.name} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default WebAdminDashboard;
