import React, { useContext } from "react";
import useUserHook from "../../Hook/useUserHook";
import { AuthContext } from "../../context/AuthContextProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, refetch] = useUserHook();
  const specificUser = userData.find(
    (users) => users?.userEmail === user?.email
  );
  return (
    <div className="h-screen">
      <div>
        <h2 className="text-2xl mb-4 p-5">User Profile</h2>
      </div>
      <div className="w-[300px] mx-auto">
        <p className="border border-white px-2">
          Name: {specificUser?.userName}
        </p>
        <p className="border border-white px-2">
          Designation: {specificUser?.userDesignation}
        </p>
        <p className="border border-white px-2">
          Department: {specificUser?.userDepartment}
        </p>
        <p className="border border-white px-2">
          Company Name: {specificUser?.useCompanyName}
        </p>
        <p className="border border-white px-2">
          Email Address: {specificUser?.userEmail}
        </p>
        <p className="border border-white px-2">
          userRole: {specificUser?.userRole}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
