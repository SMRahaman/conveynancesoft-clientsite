import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import useUserHook from "../../Hook/useUserHook";
import { updateProfile } from "firebase/auth";
import { axiosPublic } from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";

const UserEdit = () => {
  const { user } = useContext(AuthContext);
  const [userData, refetch] = useUserHook();
  const specificUser = userData.find(
    (users) => users?.userEmail === user?.email
  );
  const userEditHandler = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const designation = form.designation.value;
    const department = form.department.value;
    const companyName = form.companyName.value;
    if (user) {
      updateProfile(user, {
        displayName: name,
      });
      axiosPublic
        .put(`/users/${specificUser?._id}`, {
          userName: name,
          userDesignation: designation,
          userDepartment: department,
          useCompanyName: companyName,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount === 1) {
            Swal.fire({
              title: "Congratulation",
              text: `${name} your edit successfully`,
              icon: "success",
            });
          }
          refetch();
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div>
      <div className="min-h-screen my-5">
        <div className="px-5">
          <div>
            <h2 className="text-2xl mb-4">User Edit</h2>
          </div>
          <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
            <form onSubmit={userEditHandler} className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1  gap-5 ">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="form-control max-w-md w-full">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={specificUser?.userName}
                      placeholder="Name"
                      name="name"
                      className="input input-bordered text-black"
                      required
                    />
                  </div>
                  <div className="form-control max-w-md w-full">
                    <label className="label">
                      <span className="label-text">Designation</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={specificUser?.userDesignation}
                      placeholder="Designation"
                      name="designation"
                      className="input input-bordered text-black"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1  gap-5 ">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="form-control max-w-md w-full">
                    <label className="label">
                      <span className="label-text">Department</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={specificUser?.userDepartment}
                      placeholder="Department"
                      name="department"
                      className="input input-bordered text-black"
                      required
                    />
                  </div>
                  <div className="form-control max-w-md w-full">
                    <label className="label">
                      <span className="label-text">Company Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={specificUser?.useCompanyName}
                      placeholder="Company Name"
                      name="companyName"
                      className="input input-bordered text-black"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1  gap-5  ">
                <div className="form-control max-w-md w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    disabled
                    defaultValue={user?.email}
                    name="email"
                    placeholder="email"
                    className="input input-bordered text-black"
                    required
                  />
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">User Edit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
