import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import useUserHook from "../../Hook/useUserHook";
import { Loader } from "@mantine/core";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [userData] = useUserHook();
  const navigate = useNavigate();
  const loginHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const specificUser = userData?.find((users) => users?.userEmail === email);
    login(email, password)
      .then((result) => {
        const user = result.user;
        if (user && specificUser?.userPermission === "accepted") {
          navigate("/");
        } else {
          alert("Your request not accpet. please contact your administration");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-[400px] max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={loginHandler} className="card-body">
              <div>
                <h3 className="text-2xl uppercase font-bold text-center">
                  Login
                </h3>
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="mt-3">
                <p className="text-xs text-right">
                  Don’t have an account yet?
                  <NavLink className="text-blue-700" to="/register">
                    Registration here
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

export default Login;
