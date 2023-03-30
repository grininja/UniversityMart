// import Head from 'next/head';
// import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from '../layouts/dashboard/layout';
// import { AccountProfile } from '../sections/account/account-profile';
// import { AccountProfileDetails } from '../sections/account/account-profile-details';

// const Page = () => (
//   <>
//     <Head>
//       <title>
//         Account | UniversityMart
//       </title>
//     </Head>
//     <Box
//       component="main"
//       sx={{
//         flexGrow: 1,
//         py: 8
//       }}
//     >
//       <Container maxWidth="lg">
//         <Stack spacing={3}>
//           <div>
//             <Typography variant="h4">
//               Account
//             </Typography>
//           </div>
//           <div>
//             <Grid
//               container
//               spacing={3}
//             >
//               <Grid
//                 xs={12}
//                 md={6}
//                 lg={4}
//               >
//                 <AccountProfile />
//               </Grid>
//               <Grid
//                 xs={12}
//                 md={6}
//                 lg={8}
//               >
//                 <AccountProfileDetails />
//               </Grid>
//             </Grid>
//           </div>
//         </Stack>
//       </Container>
//     </Box>
//   </>
// );

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// export default Page;
import Head from 'next/head';
import NextLink from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import Image from 'next/image'
const Page = () => (
  <>
    <Head>
      <title>
        404 | UnivresityMart
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            {/* <Image
              alt="Under development"
              src="/assets/errors/error-404.png"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400
              }}
            /> */}
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h3"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            variant="body1"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Button
            component={NextLink}
            href="/"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowLeftIcon />
              </SvgIcon>
            )}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default Page;
