import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import ThemeContextProvider, {
  ThemeCotext,
} from "../context/ThemeContextProvider";

const Main = () => {
  const location = useLocation();
  console.log(location);
  return (
    <ThemeContextProvider>
      <div className="flex h-full w-full">
        {location.pathname !== "/register" &&
          location.pathname !== "/login" &&
          location.pathname !== "/conveynance-print-layout" && <Sidebar />}
        <div
          className={
            location.pathname == "/register" ||
            location.pathname == "/login" ||
            location.pathname == "/conveynance-print-layout"
              ? "w-full "
              : "grow md:ml-64 h-full w-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white"
          }
        >
          {location.pathname !== "/register" &&
            location.pathname !== "/login" &&
            location.pathname !== "/conveynance-print-layout" && <Navbar />}

          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
};

export default Main;
