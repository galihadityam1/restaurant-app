import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Menus from "./pages/Menus";
import Detail from "./pages/Detail";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <App />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
        {
          path: "/menu",
          element: <Menus />,
        },
        {
          path: "/menu/:id",
          element: <Detail />,
        },

    ],
  },
]);

export default router;
