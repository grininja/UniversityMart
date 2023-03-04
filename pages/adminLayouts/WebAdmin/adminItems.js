import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Unstable_Grid2";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import apiCall from "@/helper/apiCall";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
function ImgMediaCard({ AdminDetail, instituteId, role ,router}) {
  // const router = useRouter();
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        component="img"
        alt="Department Image"
        height="140"
        src="https://img.freepik.com/premium-vector/cartoon-urban-cityscape-with-college-academy-students-university-architecture-background_212168-968.jpg?w=2000"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {AdminDetail.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="error"
          onClick={async () => {
            if (role === "admin1") {
              const res = await apiCall(
                `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/removeAdminOne?userId=${AdminDetail.id}&&InstituteId=${instituteId}`,
                "GET",
                {},
                null
              );
              alert(res.data.message);
            } else if (role === "admin2") {
              const res = await apiCall(
                `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/removeAdminTwo?userId=${AdminDetail.id}&&InstituteId=${instituteId}`,
                "GET",
                {},
                null
              );
              alert(res.data.message);
            }
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

const AdminList = ({ AdminItems, role, instituteId }) => {
  const router=useRouter();
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
              {AdminItems &&
                AdminItems.length > 0 &&
                AdminItems.map((item) => (
                  <ImgMediaCard
                    AdminDetail={item}
                    key={item.id}
                    instituteId={instituteId}
                    role={role}
                    router={router}

                  />
                ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </div>
  );
};

const AdminItems = ({ adminOneDetails, adminTwoDetails, instituteId }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchResAdminOne, setSearchResAdminOne] = useState([]);
  const [searchResAdminTwo, setSearchResAdminTwo] = useState([]);
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search admins through email addresses"
            inputProps={{ "aria-label": "search admins" }}
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={async () => {
              const resArrAdminOne = [];
              const resArrAdminTwo = [];
              for (let el in adminOneDetails) {
                const item = adminOneDetails[el];
                if (item.email === searchValue) {
                  resArrAdminOne.push(item);
                }
              }
              setSearchResAdminOne(resArrAdminOne);
              for (let el in adminTwoDetails) {
                const item = adminTwoDetails[el];
                if (item.email === searchValue) {
                  resArrAdminTwo.push(item);
                }
              }
              setSearchResAdminTwo(resArrAdminTwo);
            }}
          >
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          ></IconButton>
        </Paper>

        {/* ///////////filter component////////////////// */}

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
            label="Filter Value"
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value="admin1">admin1</MenuItem>
            <MenuItem value="admin2">admin2</MenuItem>
            <MenuItem value="admin3">admin3</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Box>
        {filterValue === "admin1" && searchValue === "" && (
          <AdminList
            AdminItems={adminOneDetails}
            role="admin1"
            instituteId={instituteId}
          />
        )}
        {filterValue === "admin2" && searchValue === "" && (
          <AdminList
            AdminItems={adminTwoDetails}
            role="admin2"
            instituteId={instituteId}
          />
        )}

        {searchResAdminOne.length > 0 && searchValue !== "" && (
          <AdminList
            AdminItems={searchResAdminOne}
            role="admin1"
            instituteId={instituteId}
          />
        )}
        {searchResAdminTwo.length > 0 && searchValue !== "" && (
          <AdminList
            AdminItems={searchResAdminTwo}
            role="admin2"
            instituteId={instituteId}
            router={router}
          />
        )}
      </Box>
    </Box>
  );
};

export default AdminItems;
