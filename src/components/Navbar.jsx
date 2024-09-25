import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeCotext } from "../context/ThemeContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout()
      .then(navigate("/login"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1>Dashboard</h1>
      <div className="flex items-center gap-4">
        <div>
          <span className="font-bold text-red-500">User :</span>
          <span className=" ml-1">{user?.displayName}</span>
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
  );
};

export default Navbar;
