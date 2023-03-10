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

export const CartItem = (props) => {
  const { item, AdminOne, Department, Institute } = props;
  const router = useRouter();
  // console.log(item.detail._id);
  // console.log(AdminOne)
  // console.log(Department)
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Avatar src={item.photo} variant="square" />
            </Box>
          </Stack>
          <Stack alignItems="center" direction="column" spacing={1}>
            <Typography align="center" gutterBottom variant="h5">
              {item.detail.name}
            </Typography>
            <Typography align="center" variant="body1">
              {item.detail.description}
            </Typography>
            <Typography color="text.secondary" align="center" variant="body1">
              Quantity: {item.quantity}
            </Typography>
          </Stack>
        </Stack>
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
              //   router.push(`/AdminPages/AdminOne/EditItem/${item._id}`);
              // router.reload();
            }}
          >
            <Typography color="text.secondary" display="inline" variant="body2">
              Edit Quantity
            </Typography>
          </Button>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon color="action" fontSize="small">
                <TrashIcon />
              </SvgIcon>
            }
            onClick={async () => {
              const res = await apiCall(
                `${process.env.BASE_URL}/api/adminOneRequests/cartHandler/removeFromCart?ItemId=${item.detail._id}&departmentId=${Department}&adminOneId=${AdminOne}`
              );
              alert(res.data.message);
              router.reload();
            }}
          >
            <Typography color="text.secondary" display="inline" variant="body2">
              Remove from Cart
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};
