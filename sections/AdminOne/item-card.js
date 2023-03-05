import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import apiCall from "@/helper/apiCall";
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

const DepartmentCard = (props) => {
  const router = useRouter();
  const { department, instituteName, instituteId } = props;
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
          {/* <Avatar
            src={department.logo}
            variant="square"
          /> */}
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {department.name}
        </Typography>
        <Typography align="center" variant="body1">
          {instituteName}
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
                <TrashIcon />
              </SvgIcon>
            }
            onClick={async () => {
              const deleteRes = await apiCall(
                `${process.env.BASE_URL}/api/institute/departmentHandler/removeDepartment?departmentId=${department._id}&instituteId=${instituteId}`,
                "GET",
                {},
                null
              );
              console.log(deleteRes);
              alert(deleteRes.data.message);
              router.reload();
            }}
          >
            <Typography color="text.secondary" display="inline" variant="body2">
              Delete
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default DepartmentCard;

// departmentCard.propTypes = {
//   department: PropTypes.object.isRequired,
// };
