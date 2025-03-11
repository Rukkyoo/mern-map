import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>

);
