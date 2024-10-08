import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { axiosPublic } from "../../Hook/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
const Register = () => {
  const { register } = useContext(AuthContext);
  const registerHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const designation = form.designation.value;
    const department = form.department.value;
    const companyName = form.companyName.value;
    const email = form.email.value;
    const password = form.password.value;
    register(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if (user) {
          updateProfile(user, {
            displayName: name,
          });
          axiosPublic
            .post("/user", {
              userEmail: email,
              userName: name,
              userDesignation: designation,
              userDepartment: department,
              useCompanyName: companyName,
              userRole: "user",
              userPermission: "pending",
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Congratulation",
                  text: `${name} your registration successfully`,
                  icon: "success",
                });
              }
            });
        }
        form.reset();
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <div className=" min-h-screen bg-base-200 py-20 ">
        <div className="hero-content flex-col lg:flex-row-reverse px-8">
          <div className="card shrink-0 w-[370px]  md:w-[400px] shadow-2xl bg-base-100">
            <form onSubmit={registerHandler} className="card-body">
              <div>
                <h3 className="text-2xl uppercase font-bold text-center">
                  Registration
                </h3>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Designation</span>
                </label>
                <input
                  type="text"
                  placeholder="Designation"
                  name="designation"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Department</span>
                </label>
                <input
                  type="text"
                  placeholder="Department"
                  name="department"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Company Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  name="companyName"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Registration</button>
              </div>
              <div className="mt-3">
                <p className="text-xs text-right">
                  Already have a account?
                  <NavLink className="text-blue-700" to="/login">
                    Login here
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
