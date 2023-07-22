import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Error from "./components/Error";
import List from "./components/List";
import Dashboard from "./components/Dashboard";
import Reports from "./components/reports";
import Login from "./components/Login";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "list",
        element: <List />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);


