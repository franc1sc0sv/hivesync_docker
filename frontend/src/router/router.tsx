import { createBrowserRouter } from "react-router-dom";
import { Animator } from "../components/routes/Animator";
import Error from "../pages/ErrorPage";
import { HomeRoutes } from "./HomeRoutes/HomeRouter";
import { UserRoutes } from "./UserRoutes/UserRoutes";

export const router = createBrowserRouter([
  {
    element: <Animator />,
    children: [HomeRoutes, UserRoutes],
    errorElement: <Error />,
  },
]);
