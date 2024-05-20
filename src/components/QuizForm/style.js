import styled from 'styled-components';
import { Grid, TextField, Button } from '@mui/material';

export const FormContainer = styled(Grid)`
  padding: 16px;
`;

export const StyledTextField = styled(TextField)`
  padding: 10px;
  margin-bottom: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  margin-top: 20px;
`;
