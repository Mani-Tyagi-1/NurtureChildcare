// src/utils/Loader.tsx

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export interface LoaderProps {
  uploadProgress?: number;
  uploading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ uploadProgress, uploading }) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="rgba(0, 0, 0, 0.5)"
      zIndex={2000}
      flexDirection="column"
    >
      <CircularProgress />
      {uploading && uploadProgress !== undefined && (
        <Typography mt={2} color="white">
          Uploading... {uploadProgress.toFixed(0)}%
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
