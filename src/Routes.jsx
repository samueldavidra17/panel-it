import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Equipos } from "pages";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Equipos />,
    },
  ]);

  export default function Routes() {
    return (
        <RouterProvider router={router} />
    );
  }