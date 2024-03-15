import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
        if (localStorage.token) {
            return redirect('/')
          }
          return null
        }
      },
  {
    path: "/register",
    element: <Register />,
      },
      {
        element: <App />,
        // loader : () => {
        //   if(!localStorage.token){
        //     return redirect('/login')
        //   }
        //   return null
        // },
        children: [
          //   {
          //     path: "/",
          //     element: <HomePage />,
          //   },
          //   {
          //     path: "/menu",
          //     element: <HomePage />,
          //   }
        ],
      },
]);

export default router;
