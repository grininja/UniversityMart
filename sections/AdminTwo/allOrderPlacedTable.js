import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../components/scrollbar";
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
                <TableCell>Product Name</TableCell>
                <TableCell>Seller Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Seller Remarks</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.length > 0 &&
                items.map((item) => {
                  const isSelected = selected.includes(item._id);
                  return (
                    ((onlyPending && item.OrderStatus === "pending") ||
                      onlyPending === false) && (
                      <TableRow hover key={item._id}>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <Link
                              href={`/AdminPages/AdminTwo/SellerOrderDetails/${item.OrderId}`}
                            >
                              <Typography variant="subtitle2">
                                {item.OrderId}
                              </Typography>
                            </Link>
                          </Stack>
                        </TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.sellerName}</TableCell>
                        <TableCell>
                          <SeverityPill color={statusMap[item.OrderStatus]}>
                            {item.OrderStatus}
                          </SeverityPill>
                        </TableCell>
                        <TableCell>{item.OrderRemark}</TableCell>
                        <TableCell>{item.orderTotal}</TableCell>
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
