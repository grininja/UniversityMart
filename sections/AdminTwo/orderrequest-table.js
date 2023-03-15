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
import Link from "next/link";
import { SeverityPill } from "../../components/severity-pill";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OrderRequestsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    instituteId,
    adminTwoId,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    onlyPending,
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>OrderId</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.length > 0 &&
                items.map((item) => {
                  const isSelected = selected.includes(item._id);
                  return (
                    ((onlyPending && item.status === "pending") ||
                      onlyPending === false) && (
                      <TableRow hover key={item._id}>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Typography variant="subtitle2">
                              <Link
                                href={`/AdminPages/AdminTwo/OrderRequestDetails/${item._id}`}
                              >
                                {item._id}
                              </Link>
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{item.remarksAdminOne}</TableCell>
                        <TableCell>{item.DepartmentName}</TableCell>
                        <TableCell>
                          <SeverityPill color={statusMap[item.status]}>
                            {item.status}
                          </SeverityPill>
                        </TableCell>
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
                    )
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
