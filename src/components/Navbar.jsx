import React, { useContext, useState } from "react";
import { FaTachometerAlt, FaUser, FaHistory } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { AuthContext } from "../context/AuthContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import useUserHook from "../Hook/useUserHook";
import { HiBars3 } from "react-icons/hi2";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [userData] = useUserHook();
  const specificUser = userData.find(
    (users) => users?.userEmail === user?.email
  );
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout()
      .then(navigate("/login"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white w-full">
      <div className="flex flex-col md:flex-row lg:justify-between items-center gap-4 w-full">
        <div>
          <h1>Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleDrawer} className="md:hidden block">
            <HiBars3 className="text-white text-2xl font-bold" />
          </button>
          <Drawer open={isOpen} onClose={toggleDrawer} direction="left">
            <ul className=" menu flex flex-col text-black mt-5 text-xl">
              <NavLink
                to="/"
                className="flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
        hover:bg-blue-600 hover:text-white"
              >
                <FaTachometerAlt />
                <span className=" md:inNavLinkne lg:block text-lg">
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
            hover:bg-blue-600 text-black hover:text-white"
                    >
                      <FaUser />
                      <span className=" md:inNavLinkne lg:block text-lg">
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
            hover:bg-blue-600 text-black hover:text-white"
                    >
                      <FaHistory />
                      <span className="md:inNavLinkne lg:block text-lg">
                        Histroy
                      </span>
                    </NavLink>
                  )}
              </div>
            </ul>
          </Drawer>
          <div className="dropdown ">
            <summary tabIndex={0} role="button" className="btn m-1 bg-white">
              User Name:
              <span className="text-slate-600 ">{specificUser?.userName}</span>
            </summary>
            <ul
              tabIndex={0}
              className="menu dropdown-content  bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black "
            >
              <li>
                <a>
                  {" "}
                  <NavLink to={`/user-edit/${user?.email}`}>
                    {" "}
                    Edit Profile
                  </NavLink>
                </a>
              </li>
              <li>
                <a>
                  <NavLink to="/user-profile">Your Profile</NavLink>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <button
              onClick={logoutHandler}
              className="btn btn-primary text-white w-[100px]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
