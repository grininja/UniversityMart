// import React, { useState, useEffect } from "react";
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

// const SignUpUniversityForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmpassword: "",
//       AffliationCode: "",
//       phone: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <Box>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           id="name"
//           label="University Name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           error={formik.touched.name && Boolean(formik.errors.name)}
//           helperText={formik.touched.name && formik.errors.name}
//         />

//         <TextField
//           id="AffliationCode"
//           label="Affliation Code"
//           value={formik.values.AffliationCode}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.AffliationCode &&
//             Boolean(formik.errors.AffliationCode)
//           }
//           helperText={
//             formik.touched.AffliationCode && formik.errors.AffliationCode
//           }
//         />
//         <TextField
//           id="email"
//           label="Email Address"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         <TextField
//           id="phone"
//           label="Contact Number"
//           value={formik.values.phone}
//           onChange={formik.handleChange}
//           error={formik.touched.phone && Boolean(formik.errors.phone)}
//           helperText={formik.touched.phone && formik.errors.phone}
//         />

//         <TextField
//           id="password"
//           label="Password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//         <TextField
//           id="confirmpassword"
//           label="Confirm Password"
//           type="password"
//           value={formik.values.confirmpassword}
//           onChange={formik.handleChange}
//           error={
//             formik.touched.confirmpassword &&
//             Boolean(formik.errors.confirmpassword)
//           }
//           helperText={
//             formik.touched.confirmpassword && formik.errors.confirmpassword
//           }
//         />
//         <Button variant="contained" endIcon={<SendIcon />} type="submit">
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// };

// const SideImage = () => {
//   return (
//     <Box>
//       <Image
//         src="/images/university.jpg"
//         alt="University"
//         width={500}
//         height={500}
//       />
//     </Box>
//   );
// };