import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const doc: Element = document.getElementById("root") as Element;

ReactDOM.unstable_createRoot(doc).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if ((import.meta as any).hot) {
  (import.meta as any).hot.accept();
}
