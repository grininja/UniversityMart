import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import apiCall from "@/helper/apiCall";
export const AccountProfile = ({ InstituteId }) => {
  const [file, setFile] = useState("");
  const [downloadUri, setDownloadUri] = useState("");
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button component="label">
            <Avatar
              src={user.downloadUri}
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
              id="select-image"
            />
          </Button>
          {file && file.name !== null && <Typography>{file.name}</Typography>}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
          type="submit"
          onClick={async () => {
            const downloadUri = await UploadFile(file, "Institute", "Profile");
            alert("Image Upload Success");
            setDownloadUri(downloadUri);
            const updateUri = await apiCall(
              `${process.env.BASE_URL}/api/institute/uploadPhoto?InstituteId=${InstituteId}&url=${downloadUri}`,
              "GET",
              {},
              null
            );
            alert(updateUri.data.message);
          }}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

// export default AccountProfile;
