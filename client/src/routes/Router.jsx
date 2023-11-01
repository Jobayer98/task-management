import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
