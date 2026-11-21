import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// The pitch (chooser + Live pitch + Full deck) is a static page at /pitch/stage/ so it renders identically
// on any screen; /pitch and /pitch#live keep working as short links.
if (location.pathname.replace(/\/$/, "") === "/pitch") {
  location.replace("/pitch/stage/index.html" + location.hash);
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
