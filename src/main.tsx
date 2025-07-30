import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./app/App";

import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
