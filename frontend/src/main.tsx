import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

import "./index.css";
import { SessionDetector } from "./components/auth/Session";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SessionDetector>
    <RouterProvider router={router} />
  </SessionDetector>
);
