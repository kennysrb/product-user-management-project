import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Products } from "./pages/Products";
import { Carts } from "./pages/Carts";
import { Users } from "./pages/Users";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/Users", element: <Users /> },
  { path: "/Products", element: <Products /> },
  { path: "/Carts", element: <Carts /> },
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
