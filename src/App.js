import React from 'react';
import Home from './pages/Home/Home';
import { Header } from './components/Header/Header';
import { GlobalStyle, AppContainer } from './styles/app';

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Header />
      <Home />
    </AppContainer>
  );
}

export default App;
