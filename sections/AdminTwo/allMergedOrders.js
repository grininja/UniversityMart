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
    items = {},
    onPageChange = () => {},
    onRowsPerPageChange,
    instituteId,
    adminTwoId,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    CustomerEmail,
  } = props;
  const router = useRouter();
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const res = [];
  for (var key in items) {
    for (var key2 in items[key]) {
      res.push([key, key2, items[key][key2][0].sellerName]);
    }
  }
  //   console.log(items)
  //   console.log(res);
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seller Id</TableCell>
                <TableCell>Seller Name</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>See Details</TableCell>
                {/* <TableCell>Generate Inovice</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {res.map((item) => {
                return (
                  <TableRow hover key={item._id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        {/* <Link
                          href={`/AdminPages/AdminTwo/SellerOrderDetails/${item.OrderId}`}
                        > */}
                        <Typography variant="subtitle2">{item[1]}</Typography>
                        {/* </Link> */}
                      </Stack>
                    </TableCell>
                    <TableCell>{item[2]}</TableCell>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell>
                      {
                        <Button
                          color="secondary"
                          variant="outlined"
                          onClick={() => {
                            router.push(
                              `/AdminPages/AdminTwo/MergedOrders/details/${item[1]}/${item[0]}`
                            );
                          }}
                        >
                          Show Details
                        </Button>
                      }
                    </TableCell>

                    {/* <TableCell>
                      {
                        <Button color="secondary" variant="outlined">
                          Generate Inovice
                        </Button>
                      }
                    </TableCell> */}
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
