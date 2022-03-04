import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import { AuthProvider } from "./Logic/Auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
