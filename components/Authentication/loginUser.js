// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage, useFormik, useField } from "formik";
// import * as Yup from "yup";
// import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import apiCall from "@/helper/apiCall";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="">
//         Shubham Rai
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }
// const theme = createTheme();

// const validationSchema = Yup.object({
//   email: Yup.string().email("Invalid email address").required("Required"),
//   Institute: Yup.string().required("Required"),
// });

// const LoginUser = ({institutes}) => {
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       Institute: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {},
//   });
//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: "100vh" }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage:
//               "url(https://static.vecteezy.com/system/resources/previews/002/850/123/original/colorful-cartoon-school-supplies-icon-set-free-vector.jpg)",
//             backgroundRepeat: "no-repeat",
//             backgroundColor: (t) =>
//               t.palette.mode === "light"
//                 ? t.palette.grey[50]
//                 : t.palette.grey[900],
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign In
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={formik.handleSubmit}
//               sx={{ mt: 1 }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 error={formik.touched.email && Boolean(formik.errors.email)}
//                 helperText={formik.touched.email && formik.errors.email}
//               />

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="Institute"
//                 label="University Name"
//                 value={formik.values.Institute}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.Institute && Boolean(formik.errors.Institute)
//                 }
//                 helperText={formik.touched.Institute && formik.errors.Institute}
//               />

//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Submit
//               </Button>
//               <Copyright sx={{ mt: 5 }} />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       institutes,
//     },
//   }
// }



// export default LoginUser;
