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
import SendIcon from "@mui/icons-material/Send";
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

export const AllOrderTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    sellerId,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    onlyPending,
  } = props;
  console.log(items);
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
                <TableCell>Status</TableCell>
                <TableCell>See All Buyer Query</TableCell>
                <TableCell>See Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.length > 0 &&
                items.map((item) => {
                  const isSelected = selected.includes(item._id);
                  return (
                    ((onlyPending && item.Status === "pending") ||
                      onlyPending === false) && (
                      <TableRow hover key={item._id}>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Typography variant="subtitle2">
                              {/* <Link
                                href={`/AdminPages/AdminTwo/OrderRequestDetails/${item._id}`}
                              > */}
                              {item._id}
                              {/* </Link> */}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* <TableCell>{item.Buyer}</TableCell> */}
                        <TableCell>
                          <SeverityPill color={statusMap[item.OrderStatus]}>
                            {item.Status}
                          </SeverityPill>
                        </TableCell>
                        <TableCell>
                          <Button color="secondary" variant="contained">
                            Click
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            href={`/SellerPages/OrderRequestDetails/${item._id}`}
                            endIcon={<SendIcon />}
                          >
                            Click
                          </Button>
                        </TableCell>
                        {/* <TableCell>{item.orderTotal}</TableCell> */}
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
