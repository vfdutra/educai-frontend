import styled from 'styled-components';

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

