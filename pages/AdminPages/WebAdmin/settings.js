import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "../../../sections/settings/settings-notifications";
import { SettingsPassword } from "../../../sections/settings/settings-password";
import { Layout as WebAdminDashboard } from "../../../layouts/WebAdminDashboard/layout";

const Page = () => (
  <>
    <Head>
      <title>Settings | UniversityMart</title>
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
          <Typography variant="h4">Settings</Typography>
          <SettingsNotifications />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <WebAdminDashboard>{page}</WebAdminDashboard>;

export default Page;
