import React, { useContext } from "react";
import { FaTachometerAlt, FaUser, FaHistory } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { GiCampingTent } from "react-icons/gi";
import { AiFillProduct } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { AuthContext } from "../context/AuthContextProvider";
import useUserHook from "../Hook/useUserHook";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [userData] = useUserHook();
  const specificUser = userData.find(
    (users) => users?.userEmail === user?.email
  );
  console.log(specificUser);
  return (
    <div className="bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white md:block hidden">
      <h1 className="text-xl font-bold hidden md:block mt-4 text-center itaNavLinkc">
        Conveynace Bill Managment System
      </h1>
      <ul className=" menu flex flex-col mt-5 text-xl">
        <NavLink
          to="/"
          className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white"
        >
          <FaTachometerAlt />
          <span className="hidden md:inNavLinkne lg:block text-lg">
            Dashboard
          </span>
        </NavLink>
        <ul>
          {specificUser?.userRole === "user" &&
            specificUser?.userPermission === "accepted" && (
              <li>
                <details>
                  <summary
                    className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 text-lg"
                  >
                    <AiFillProduct />
                    Coveynance
                  </summary>

                  <ul>
                    <NavLink
                      to="/conveynance-add"
                      className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 text-lg"
                    >
                      Conveynance data add
                    </NavLink>
                    <NavLink
                      to={`/conveynance-view/${user?.email}`}
                      className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 text-lg"
                    >
                      Conveynance data view
                    </NavLink>
                  </ul>
                </details>
              </li>
            )}
        </ul>
        <div>
          {specificUser?.userRole === "admin" &&
            specificUser?.userPermission === "accepted" && (
              <NavLink
                to="/user-view"
                className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
            hover:bg-blue-600 hover:text-white"
              >
                <FaUser />
                <span className="hidden md:inNavLinkne lg:block text-lg">
                  User Control
                </span>
              </NavLink>
            )}
        </div>
        <ul>
          {specificUser?.userRole === "user" &&
            specificUser?.userPermission === "accepted" && (
              <li>
                <details>
                  <summary
                    className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 text-lg"
                  >
                    <TbReport />
                    Report
                  </summary>

                  <ul>
                    <NavLink
                      to="/conveynance-report"
                      className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:text-white hover:bg-blue-600 text-lg"
                    >
                      Conveynance Report
                    </NavLink>
                  </ul>
                </details>
              </li>
            )}
        </ul>
        <div>
          {specificUser?.userRole === "admin" &&
            specificUser?.userPermission === "accepted" && (
              <NavLink
                to="/report-history"
                className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
            hover:bg-blue-600  hover:text-white"
              >
                <FaHistory />
                <span className="hidden md:inNavLinkne lg:block text-lg">
                  Histroy
                </span>
              </NavLink>
            )}
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
