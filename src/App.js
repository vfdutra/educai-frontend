import * as React from "react";
import MainPage from "./pages/MainPage/mainPage.component";
import { BorderBottom } from "@mui/icons-material";

function App() {
  const headerStyle = {
    backgroundColor: "#F8F6E3",
    color: "#333",
    padding: "10px 52px",
    textAlign: "left",
    fontSize: "24px",
    fontWeight: "bold",
    BorderBottom: "1px solid #6AD4DD",
  };

  const globalStyle = {
    body: {
      margin: 0,
      padding: 0,
    }
  };

  return (
    <div className="App">
      <style>
        {`
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <header className="App-header" style={headerStyle}>
        EducAI
      </header>
      <MainPage />
    </div>
  );
}

export default App;
