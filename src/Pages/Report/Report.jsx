import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { axiosPublic } from "../../Hook/useAxiosPublic";
import PrintLayout from "../PrintLayout/PrintLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { reportContext } from "../../context/ReportFilterContextProvider";
import Swal from "sweetalert2";

const Report = () => {
  const { user } = useContext(AuthContext);
  const { setFilterData, filterData } = useContext(reportContext);
  console.log(filterData);
  const [selectStartDate, setSeletStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");
  const now = new Date().toDateString();
  const navigate = useNavigate();
  const initialValue = 0;
  const sumWithInitial = filterData?.reduce(
    (accumulator, currentValue) => parseInt(accumulator + currentValue.Amount),
    initialValue
  );
  const filterdConveynanceBill = (e) => {
    e.preventDefault();
    axiosPublic
      .get(
        `/filterd-conveynance-bill?start=${selectStartDate}&end=${selectEndDate}&email=${user?.email}`
      )
      .then((res) => {
        if (res.data.length === 0) {
          alert("Data not found");
          return;
        } else {
          setFilterData(res.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const redirectHandler = () => {
    axiosPublic
      .post("/history", {
        userName: user?.displayName,
        userEmail: user?.email,
        startDate: selectStartDate,
        endDate: selectEndDate,
        withdrawDate: now,
        totalAmout: sumWithInitial,
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Congratulation!",
            text: "Save your data history purpose",
            icon: "success",
          });
        }
      });
    navigate("/conveynance-print-layout");
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Report</h2>
      <form onSubmit={filterdConveynanceBill}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mb-5 ">
          <div className="flex flex-col gap-2">
            <span className="text-white">Start</span>
            <input
              type="date"
              name="start"
              onChange={(e) => setSeletStartDate(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">End</span>
            <input
              type="date"
              name="end"
              onChange={(e) => setSelectEndDate(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg text-black"
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary text-lg w-1/2 mt-8">
            Search
          </button>
        </div>
      </form>
      <div>
        {filterData?.length > 0 && (
          <div>
            <PrintLayout></PrintLayout>
            <div className="text-right">
              <button onClick={redirectHandler} className="btn btn-success">
                Go to Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
