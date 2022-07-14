import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://hepem6bqxwby.usemoralis.com:2053/server"
      appId="UlCRaFpxRysoFFvMSzySPm8d7WYsHsSbdNeBJW9M"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
