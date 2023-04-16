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
import Image from "next/image";
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
    page = 0,
    rowsPerPage = 0,
  } = props;
  const router = useRouter();

  // console.log(item)

  //   const selectedSome = selected.length > 0 && selected.length < items.length;
  //   const selectedAll = items.length > 0 && selected.length === items.length;
  //  console.log(items)
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Photo</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Seller</TableCell>
                <TableCell>Quantity Ordered</TableCell>
                <TableCell>Seller Remarks</TableCell>
                <TableCell>Order Total</TableCell>
                <TableCell>Expected Delivery</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items &&
                items.length > 0 &&
                items.map((item) => {
                  //   const isSelected = selected.includes(item._id);
                  // console.log(item.productDescription);
                  var decodedUrlImage = "";
                  if (item.ImageUrl !== "") {
                    let bufferObj = Buffer.from(item.ImageUrl, "base64");

                    // Decoding base64 into String
                    decodedUrlImage = bufferObj.toString("utf8");
                  }
                  return (
                    <TableRow hover key={item._id}>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Image
                            src={decodedUrlImage}
                            height={30}
                            width={30}
                            alt="product image"
                          />
                        </Stack>
                      </TableCell>
                      <TableCell>{item.ProductName}</TableCell>
                      <TableCell>{item.SellerDetails.name}</TableCell>
                      <TableCell>{item.Quantity}</TableCell>
                      <TableCell>{item.RemarksSeller}</TableCell>
                      <TableCell>{item.ProductPrice * item.Quantity}</TableCell>
                      <TableCell>{item.ExpectedDelivery}</TableCell>
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
