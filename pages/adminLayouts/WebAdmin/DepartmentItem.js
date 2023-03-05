import React from "react";
import { useState, useEffect } from "react";
import apiCall from "../../../helper/apiCall";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function ImgMediaCard({ Department, instituteId }) {
  const router = useRouter();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Department Image"
        height="140"
        src="https://img.freepik.com/premium-vector/cartoon-urban-cityscape-with-college-academy-students-university-architecture-background_212168-968.jpg?w=2000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Department.name}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="error"
          onClick={async () => {
            const deleteRes = await apiCall(
              `/api/institute/departmentHandler/removeDepartment?departmentId=${Department._id}&instituteId=${instituteId}`,
              "GET",
              {},
              null
            );
            console.log(deleteRes);
            alert(deleteRes.data.message);
            router.reload();
          }}
        >
          Delete
        </Button>
        <Button variant="outlined" size="medium">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const Departments = ({ departments, instituteId }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/authentication/loginInstitute");
    },
  });
  return (
    <div>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={12} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 5,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { md: "6fr 6fr" },
                gap: 2,
              }}
            >
              {departments &&
                departments.length > 0 &&
                departments.map((department) => (
                  <ImgMediaCard
                    Department={department}
                    key={department._id}
                    instituteId={instituteId}
                  />
                ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
      {/* </Grid> */}
    </div>
  );
};

export default Departments;
