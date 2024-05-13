import styled from 'styled-components';
import { Grid } from '@mui/material';

export const StyledGridItem = styled(Grid).attrs({
  item: true,
})`
  width: 100%;
  background-color: #F8F6E3;
  border: 1px solid #6AD4DD;
  border-radius: 12px;
  padding: 16px;
  margin: 8px 0;
`;

export const Container = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
   grid-template-rows: 1fr 1fr 1fr;
   height: 100vh;
   gap: 1rem;
   background-color: white;
`;

export const Card = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 100%;
    background-color: red;
`;

