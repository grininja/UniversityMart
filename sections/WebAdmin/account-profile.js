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
  CardMedia,
} from "@mui/material";
import Image from "next/image";
import { UploadFile } from "@/helper/uploadFile";
import { useRouter } from "next/router";
import { useState } from "react";
import apiCall from "@/helper/apiCall";

export const AccountProfile = ({ InstituteId, imageUrl }) => {
  const [file, setFile] = useState("");
  const router = useRouter();
  const [downloadUri, setDownloadUri] = useState(imageUrl);
  var decodedUrlImage = "";
  if (imageUrl !== "") {
    let bufferObj = Buffer.from(base64string, "base64");

    // Decoding base64 into String
    decodedUrlImage = bufferObj.toString("utf8");
  }
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
            <Image
              src={decodedUrlImage}
              alt="Logo"
              height={80}
              width={80}
              mb={2}
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
            setDownloadUri(downloadUri);
            console.log(downloadUri);
            let bufferObj = Buffer.from(downloadUri, "utf8");
            let base64String = bufferObj.toString("base64");
            const updateUri = await apiCall(
              `${process.env.BASE_URL}/api/institute/uploadPhoto?InstituteId=${InstituteId}&url=${base64String}`,
              "GET",
              {},
              null
            );
            alert(updateUri.data.message);
            router.reload();
          }}
        >
          Upload picture
        </Button>
      </CardActions>
      {/* {downloadUri} */}
    </Card>
  );
};
