import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { BallTriangle } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
const ProtectedRout = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  if (loader) {
    return (
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }
  if (user) {
    return children;
  }

  return (
    <div>
      <Navigate to="/login"></Navigate>
    </div>
  );
};

export default ProtectedRout;
