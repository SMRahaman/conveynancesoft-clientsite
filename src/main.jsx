import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import { router } from "./Router/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import ReportFilterContextProvider from "./context/ReportFilterContextProvider.jsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ReportFilterContextProvider>
        <MantineProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
              <App />
            </RouterProvider>
          </QueryClientProvider>
        </MantineProvider>
      </ReportFilterContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
