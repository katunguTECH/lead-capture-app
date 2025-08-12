import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Load Tidio script after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const tidioScript = document.createElement("script");
  tidioScript.src = "https://code.tidio.co/mq8ab8o9cw7ev9zk2do3pqm0v0jv4mxp.js";
  tidioScript.async = true;
  tidioScript.onload = () => console.log("✅ Tidio script loaded");
  document.body.appendChild(tidioScript);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Load Tidio script after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const tidioScript = document.createElement("script");
  tidioScript.src = "https://code.tidio.co/mq8ab8o9cw7ev9zk2do3pqm0v0jv4mxp.js";
  tidioScript.async = true;
  tidioScript.onload = () => console.log("✅ Tidio script loaded");
  document.body.appendChild(tidioScript);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

