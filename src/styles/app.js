import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
`;

export const AppContainer = styled.div`
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;
`;

export const Header = styled.header`
  background-color: #fff;
  min-height: 60px; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: purple;
`;