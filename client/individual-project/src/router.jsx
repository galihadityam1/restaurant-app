import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Menus from "./pages/Menus";
import Detail from "./pages/Detail";
import AddMenu from "./pages/AddMenu";
import EditPage from "./pages/EditPage";
import DetailPayment from "./pages/DetailPayment";
import FormImage from "./pages/FormImage";

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
        path: "/add-menu",
        element: <AddMenu />,
      },
      {
        path: "/edit-menu/:id",
        element: <EditPage />,
      },
      {
        path: "/menu/:id",
        element: <Detail />,
      },
      {
        path: "/payment",
        element: <DetailPayment />,
      },
      {
        path: "/edit-menu/:id/image",
        element: <FormImage />,
      },
    ],
  },
]);

export default router;
