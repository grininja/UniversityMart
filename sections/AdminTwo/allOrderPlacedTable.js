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
  Button,
} from "@mui/material";
import { Scrollbar } from "../../components/scrollbar";
import Link from "next/link";
import { SeverityPill } from "../../components/severity-pill";
import apiCall from "@/helper/apiCall";
import { useRouter } from "next/router";
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
    CustomerEmail,
  } = props;
  const router = useRouter();
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  //  console.log(items)
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>OrderId</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Seller Remarks</TableCell>
                <TableCell>Price</TableCell>
                {/* <TableCell></TableCell> */}
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.length > 0 &&
                items.map((item) => {
                  const isSelected = selected.includes(item._id);
                  // console.log(item.productDescription);

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
                        <TableCell>{item.orderDate}</TableCell>
                        <TableCell>
                          <SeverityPill color={statusMap[item.OrderStatus]}>
                            {item.OrderStatus}
                          </SeverityPill>
                        </TableCell>
                        <TableCell>{item.OrderRemark}</TableCell>
                        <TableCell>{item.orderTotal}</TableCell>
                        <TableCell>
                          {item.paymentActivated && (
                            <Button
                              color="secondary"
                              variant="outlined"
                              onClick={async () => {
                                const result = await apiCall(
                                  `${process.env.BASE_URL}/api/payments/performPayment`,
                                  "POST",
                                  {
                                    productId: item.productId,
                                    productName: item.productName,
                                    orderId: item.OrderId,
                                    priceEachProduct: item.productPrice,
                                    accountId: item.SellerPaymentId,
                                    customerEmail: CustomerEmail,
                                    productDescription: item.productDescription,
                                    productQuantity: item.totalQuantity,
                                  },
                                  null
                                );
                                router.push(result.data.url);
                              }}
                            >
                              Pay
                            </Button>
                          )}
                          {item.paymentActivated === false && (
                            <Button
                              color="secondary"
                              variant="contained"
                              disabled
                            >
                              Pay
                            </Button>
                          )}
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
