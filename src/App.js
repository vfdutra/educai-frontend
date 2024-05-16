import React from 'react';
import Home from './pages/Home/Home';
import { GlobalStyle, AppContainer, Header } from './styles/app';
import Logo from './assets/images/logo.svg';

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Header>
        <img src={Logo} alt="App Logo" style={{ height: '50px', marginLeft: '20px' }} />
      </Header>
      <Home />
    </AppContainer>
  );
}

export default App;
