import React from "react";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Products } from "./pages/Products";
import { Carts } from "./pages/Carts";
import { Users } from "./pages/Users";
import { initializeStore, Provider } from "./store";
import { Login } from "./pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "683431762697-kjfb3v924pcmamqtuhkek2ag1npp6t2v.apps.googleusercontent.com";

const store = initializeStore();
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },

  {
    path: "/Users",
    element: <Users />,
  },
  {
    path: "/Products",
    element: <Products />,
  },
  {
    path: "/Carts",
    element: <Carts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <Provider value={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
