import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Pitch from "./Pitch";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {location.pathname.replace(/\/$/, "") === "/pitch" ? <Pitch /> : <App />}
  </StrictMode>,
);
