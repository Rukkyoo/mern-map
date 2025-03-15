import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
/* import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY); */

createRoot(document.getElementById("root")).render(
  
     <StrictMode>
      <App />
    </StrictMode>
 );