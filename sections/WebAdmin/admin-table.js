import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  SvgIcon,
} from "@mui/material";
import apiCall from "@/helper/apiCall";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import { Scrollbar } from "../../components/scrollbar";
import { getInitials } from "../../utils/get-initials";
import { useRouter } from "next/router";
export const AdminTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    instituteId,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const router=useRouter();
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  /> */}
                {/* </TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((admin) => {
                const isSelected = selected.includes(admin.id);
                // const createdAt = format(admin.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow hover key={admin.id} selected={isSelected}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(admin.id);
                          } else {
                            onDeselectOne?.(admin.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={admin.avatar}>
                          {getInitials(admin.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {admin.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      {/* {admin.address.city}, {admin.address.state},{" "}
                      {admin.address.country} */}
                      {admin.role}
                    </TableCell>
                    <TableCell>{admin.phone}</TableCell>
                    {/* <TableCell>{createdAt}</TableCell> */}
                    <TableCell>
                      <Button
                        color="inherit"
                        startIcon={
                          <SvgIcon color="action" fontSize="small">
                            <TrashIcon />
                          </SvgIcon>
                        }
                        onClick={async () => {
                          if (admin.role === "admin1") {
                            const res = await apiCall(
                              `${process.env.BASE_URL}/api/institute/adminHandler/adminOneHandler/removeAdminOne?userId=${admin.id}&&InstituteId=${instituteId}`,
                              "GET",
                              {},
                              null
                            );
                            alert(res.data.message);
                          } else if (admin.role === "admin2") {
                            const res = await apiCall(
                              `${process.env.BASE_URL}/api/institute/adminHandler/adminTwoHandler/removeAdminTwo?userId=${admin.id}&&InstituteId=${instituteId}`,
                              "GET",
                              {},
                              null
                            );
                            alert(res.data.message);
                          }
                          router.reload();
                        }}
                      >
                        <Typography
                          color="text.secondary"
                          display="inline"
                          variant="body2"
                        >
                          Delete
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// AdminTable.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onDeselectAll: PropTypes.func,
//   onDeselectOne: PropTypes.func,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   onSelectAll: PropTypes.func,
//   onSelectOne: PropTypes.func,
//   page: PropTypes.number,
//   rowsPerPage: PropTypes.number,
//   selected: PropTypes.array,
// };
