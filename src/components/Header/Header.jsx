import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background-color: #F8F6E3;
  color: #333;
  padding: 10px 52px;  
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #6AD4DD;
  width: 100%;
  text-align: left;
`;

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
