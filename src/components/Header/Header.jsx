import * as React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { StyledAppBar } from './styles';

export function Header() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          educAI
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}
