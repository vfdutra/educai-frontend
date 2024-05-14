import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const SnackbarAlert = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity}>
        {message}       
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarAlert;
