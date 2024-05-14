import React from 'react';
import { Button } from '@mui/material';

const FileDownload = ({ file, label }) => {
  return (
    file && (
      <Button variant="contained" color="primary" href={file} download>
        {label}
      </Button>
    )
  );
};

export default FileDownload;
