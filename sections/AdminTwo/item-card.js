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

export const ItemCard = (props) => {
  const { item, AdminOne } = props;
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
          <Avatar src={item.photo} variant="square" />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {item.name}
        </Typography>
        <Typography align="center" variant="body1">
          {item.description}
        </Typography>
        <Typography color="text.secondary" align="center" variant="body1">
          Quantity: {item.quantity}
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
              router.push(`/AdminPages/AdminOne/EditItem/${item._id}`);
              // router.reload();
            }}
          >
            <Typography color="text.secondary" display="inline" variant="body2">
              Edit
            </Typography>
          </Button>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon color="action" fontSize="small">
                <ArchiveBoxIcon />
              </SvgIcon>
            }
            onClick={async () => {
              const res = await apiCall(
                `${process.env.BASE_URL}/api/adminOneRequests/cartHandler/addToCart`,
                "POST",
                {
                  ItemId: item._id,
                  departmentId: item.department,
                  quantity: 1,
                  adminOneId: AdminOne,
                },
                null
              );
              alert(res.data.message);

              router.reload();
            }}
          >
            <Typography color="text.secondary" display="inline" variant="body2">
              Add to Cart
            </Typography>
          </Button>
        </Stack>
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
                `${process.env.BASE_URL}/api/adminOneRequests/productHandler/removeItem?ItemId=${item._id}&departMentId=${item.department}`
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

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
};
