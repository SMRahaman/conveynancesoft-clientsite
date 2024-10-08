import React, { useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../context/AuthContextProvider";
const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const nowDateAndTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  return (
    <div className="grow p-8 h-screen">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div>
        <div className="my-12">
          <p className="text-center">Hi ! {user?.displayName}</p>
          <h3 className="text-3xl uppercase font-bold text-center mt-5 mb-5">
            Welcome to Conveynance Bill Management System
          </h3>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">
              Today: {nowDateAndTime}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
