import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl=""
      appId=""
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
