import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import ArchiveBoxIcon from "@heroicons/react/24/solid/ArchiveBoxIcon";
import { useRouter } from "next/router";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Button,
} from "@mui/material";
import apiCall from "@/helper/apiCall";

export const ProductCard = (props) => {
  const { item, SellerId } = props;
  const router = useRouter();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar src={item.productImageUrl} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {item.name}
        </Typography>
        <Typography align="center" variant="body1">
          {item.description}
        </Typography>
        <Typography align="center" variant="body1">
          Category: {item.category}
        </Typography>
        <Typography color="text.secondary" align="center" variant="body1">
          Price: {item.price}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon color="action" fontSize="small">
                <PencilIcon />
              </SvgIcon>
            }
            onClick={async () => {
              router.push(`/SellerPages/EditProduct/${item._id}`);
              // router.reload();
            }}
          >
            <Typography color="text.secondary" display="inline" variant="body2">
              Edit
            </Typography>
          </Button>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}></Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="error"
            startIcon={
              <SvgIcon color="action" fontSize="small">
                <TrashIcon />
              </SvgIcon>
            }
            onClick={async () => {
              const res = await apiCall(
                `${process.env.BASE_URL}/api/seller/products/deleteProduct?sellerId=${SellerId}&productId=${item._id}`
              );
              alert(res.data.message);
              router.reload();
            }}
          >
            <Typography color="inherit" display="inline" variant="body2">
              Delete
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
};
