import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ConveynanceAdd from "../Pages/Product/ConveynanceAdd";
import ConveynanceView from "../Pages/Product/ConveynanceView";
import ConveynanceEdit from "../Pages/Product/ConveynanceEdit";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import UserView from "../Pages/User/UserView";
import Report from "../Pages/Report/Report";
import History from "../Pages/History/History";
import ProtectedRout from "../components/ProtectedRout";
import PrintLayout from "../Pages/PrintLayout/PrintLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRout>
            <Dashboard></Dashboard>
          </ProtectedRout>
        ),
      },
      {
        path: "/conveynance-add",
        element: (
          <ProtectedRout>
            <ConveynanceAdd></ConveynanceAdd>
          </ProtectedRout>
        ),
      },
      {
        path: "/conveynance-view/:email",
        element: (
          <ProtectedRout>
            <ConveynanceView></ConveynanceView>
          </ProtectedRout>
        ),
        loader: ({ params }) => {
          return fetch(
            `https://conveynance-serversite.vercel.app/api/conveynances/${params.email}`
          );
        },
      },
      {
        path: "/conveynance-edit/:id",
        element: (
          <ProtectedRout>
            <ConveynanceEdit></ConveynanceEdit>
          </ProtectedRout>
        ),
        loader: () => {
          return fetch(
            "https://conveynance-serversite.vercel.app/api/conveynances"
          );
        },
      },
      {
        path: "/user-view",
        element: (
          <ProtectedRout>
            <UserView></UserView>
          </ProtectedRout>
        ),
        loader: () => {
          return fetch("https://conveynance-serversite.vercel.app/api/users");
        },
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/conveynance-report",
        element: (
          <ProtectedRout>
            <Report></Report>
          </ProtectedRout>
        ),
      },
      {
        path: "/report-history",
        element: (
          <ProtectedRout>
            <History></History>
          </ProtectedRout>
        ),
        loader: () => {
          return fetch(
            "https://conveynance-serversite.vercel.app/api/historys"
          );
        },
      },
      {
        path: "/conveynance-print-layout",
        element: (
          <ProtectedRout>
            <PrintLayout></PrintLayout>
          </ProtectedRout>
        ),
      },
    ],
  },
]);
