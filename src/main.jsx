import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Force-load Tidio script before the app renders
const tidioScript = document.createElement("script");
tidioScript.src = "//code.tidio.co/mq8ab8o9cw7ev9zk2do3pqm0v0jv4mxp.js";
tidioScript.async = true;
document.body.appendChild(tidioScript);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
